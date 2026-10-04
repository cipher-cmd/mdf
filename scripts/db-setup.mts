/**
 * Creates / upgrades every mdf_* table and fills in the starting content.
 * Safe to run any number of times. Only ever touches tables that start with `mdf_`,
 * because the same Neon database is shared with other projects.
 *
 *   npm run db:setup                    create/upgrade tables, add missing starter content
 *   npm run db:setup -- --reset-content replace departments, products and articles with the starter set
 */
import { neon } from '@neondatabase/serverless'
import fs from 'node:fs'
import { categories } from '../lib/data/categories.ts'
import { products } from '../lib/data/products.ts'
import { blogPosts } from '../lib/data/blog.ts'

const envUrl = fs.existsSync('.env') ? fs.readFileSync('.env', 'utf-8').match(/^DATABASE_URL=(.+)$/m)?.[1]?.trim() : undefined
const url = process.env.DATABASE_URL || envUrl
if (!url) {
  console.error('DATABASE_URL is not set (environment or .env).')
  process.exit(1)
}
const sql = neon(url)
const reset = process.argv.includes('--reset-content')

async function schema() {
  await sql`CREATE TABLE IF NOT EXISTS mdf_site_copy (
    key VARCHAR(100) PRIMARY KEY,
    section VARCHAR(50) NOT NULL DEFAULT 'general',
    label VARCHAR(100) NOT NULL DEFAULT '',
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
  )`

  await sql`CREATE TABLE IF NOT EXISTS mdf_categories (
    id VARCHAR(50) PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    short VARCHAR(50),
    tagline VARCHAR(150),
    items VARCHAR(150),
    video VARCHAR(255),
    poster VARCHAR(255),
    image VARCHAR(255),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now()
  )`
  await sql`ALTER TABLE mdf_categories ADD COLUMN IF NOT EXISTS short VARCHAR(50)`
  await sql`ALTER TABLE mdf_categories ADD COLUMN IF NOT EXISTS image VARCHAR(255)`
  await sql`ALTER TABLE mdf_categories ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now()`

  await sql`CREATE TABLE IF NOT EXISTS mdf_products (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(200),
    name VARCHAR(200) NOT NULL,
    brand VARCHAR(100) NOT NULL DEFAULT '',
    category VARCHAR(50) REFERENCES mdf_categories(id) ON DELETE SET NULL,
    description TEXT,
    specs JSONB DEFAULT '[]'::jsonb,
    image VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    in_stock BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  )`
  await sql`ALTER TABLE mdf_products ADD COLUMN IF NOT EXISTS slug VARCHAR(200)`
  await sql`ALTER TABLE mdf_products ADD COLUMN IF NOT EXISTS is_visible BOOLEAN NOT NULL DEFAULT TRUE`
  await sql`ALTER TABLE mdf_products ADD COLUMN IF NOT EXISTS whatsapp_text TEXT`
  await sql`CREATE INDEX IF NOT EXISTS idx_mdf_products_category ON mdf_products(category, sort_order)`

  await sql`CREATE TABLE IF NOT EXISTS mdf_blog_posts (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(200) UNIQUE NOT NULL,
    title VARCHAR(250) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image VARCHAR(255),
    category VARCHAR(50) NOT NULL,
    read_time INT,
    status VARCHAR(20) DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    is_featured BOOLEAN DEFAULT FALSE,
    meta_title VARCHAR(250),
    meta_description TEXT,
    ai_generated BOOLEAN DEFAULT FALSE,
    source_urls JSONB DEFAULT '[]'::jsonb,
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  )`
  await sql`ALTER TABLE mdf_blog_posts ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE`
  await sql`ALTER TABLE mdf_blog_posts ADD COLUMN IF NOT EXISTS topic VARCHAR(200)`
  await sql`ALTER TABLE mdf_blog_posts ALTER COLUMN status SET DEFAULT 'draft'`
  await sql`CREATE INDEX IF NOT EXISTS idx_mdf_blog_posts_live ON mdf_blog_posts(status, published_at DESC)`

  // News stories already turned into articles, so the writer never repeats one
  await sql`CREATE TABLE IF NOT EXISTS mdf_blog_sources (
    id VARCHAR(100) PRIMARY KEY,
    query VARCHAR(250),
    title VARCHAR(300),
    url TEXT UNIQUE NOT NULL,
    snippet TEXT,
    published_date TIMESTAMPTZ,
    used_in_post_id VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT now()
  )`

  // Subjects the admin wants articles about ("football", "school gyms"…)
  await sql`CREATE TABLE IF NOT EXISTS mdf_blog_topics (
    id VARCHAR(40) PRIMARY KEY DEFAULT md5(random()::text || clock_timestamp()::text),
    keyword VARCHAR(160) NOT NULL,
    notes TEXT DEFAULT '',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    times_used INT NOT NULL DEFAULT 0,
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
  )`
  await sql`ALTER TABLE mdf_blog_topics ADD COLUMN IF NOT EXISTS cover_image VARCHAR(255)`
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_mdf_blog_topics_keyword ON mdf_blog_topics(lower(keyword))`

  // One row per writer run. run_day is unique, so at most one automatic article per day
  // even if the scheduler fires twice; failed runs clear run_day so a retry is allowed.
  await sql`CREATE TABLE IF NOT EXISTS mdf_blog_runs (
    id VARCHAR(40) PRIMARY KEY DEFAULT md5(random()::text || clock_timestamp()::text),
    run_day DATE UNIQUE,
    trigger VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    message TEXT,
    topic VARCHAR(200),
    post_id VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT now()
  )`
  await sql`CREATE INDEX IF NOT EXISTS idx_mdf_blog_runs_created ON mdf_blog_runs(created_at DESC)`

  // Uploaded pictures, already shrunk to WebP in the browser
  await sql`CREATE TABLE IF NOT EXISTS mdf_media (
    id VARCHAR(40) PRIMARY KEY,
    name VARCHAR(200),
    mime VARCHAR(50) NOT NULL,
    data BYTEA NOT NULL,
    bytes INT NOT NULL,
    width INT,
    height INT,
    created_at TIMESTAMPTZ DEFAULT now()
  )`

  await sql`CREATE TABLE IF NOT EXISTS mdf_admin_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
  )`
}

async function starterContent() {
  if (reset) {
    console.log('  resetting departments, products and articles to the starter set')
    await sql`DELETE FROM mdf_blog_sources`
    await sql`DELETE FROM mdf_blog_posts`
    await sql`DELETE FROM mdf_products`
    await sql`DELETE FROM mdf_categories`
    // Old free-form keys from the first admin draft; the site now ships its own defaults
    await sql`DELETE FROM mdf_site_copy WHERE key IN ('home_hero', 'home_stats', 'global_contact', 'global_seo')`
    await sql`DELETE FROM mdf_admin_settings WHERE key IN ('auto_publish', 'groq_model', 'cron_schedule', 'daily_max_posts', 'notification_email', 'kashmir_focus_keywords')`
  }

  for (const [i, c] of categories.entries()) {
    await sql`INSERT INTO mdf_categories (id, label, short, tagline, items, video, poster, image, sort_order, is_active)
      VALUES (${c.id}, ${c.label}, ${c.short}, ${c.tagline}, ${c.items}, ${c.video}, ${c.poster}, ${c.image}, ${i + 1}, ${c.enabled})
      ON CONFLICT (id) DO NOTHING`
  }

  // Starter products only go into departments that have none yet, so nothing is duplicated
  const stocked = new Set((await sql`SELECT DISTINCT category FROM mdf_products`).map(r => r.category))
  for (const [i, p] of products.entries()) {
    if (stocked.has(p.category)) continue
    await sql`INSERT INTO mdf_products (id, slug, name, brand, category, description, specs, image, is_featured, in_stock, sort_order, whatsapp_text)
      VALUES (${p.id}, ${p.slug}, ${p.name}, ${p.brand}, ${p.category}, ${p.description}, ${JSON.stringify(p.highlights)}::jsonb,
              ${p.image}, ${p.featured}, true, ${i + 1}, ${p.whatsappText ?? null})
      ON CONFLICT (id) DO NOTHING`
  }

  for (const b of blogPosts) {
    await sql`INSERT INTO mdf_blog_posts (id, slug, title, excerpt, content, cover_image, category, status, published_at, is_featured, ai_generated, created_at, updated_at)
      VALUES (${'post-' + b.slug.slice(0, 80)}, ${b.slug}, ${b.title}, ${b.excerpt}, ${b.content}, ${b.coverImage}, ${b.category},
              'published', ${b.publishedAt + 'T09:00:00+05:30'}, ${b.featured}, false, ${b.publishedAt + 'T09:00:00+05:30'}, ${b.publishedAt + 'T09:00:00+05:30'})
      ON CONFLICT (slug) DO NOTHING`
  }

  const topics = [
    ['Cricket in Kashmir', 'School and club cricket, JKCA tournaments, Kashmir willow'],
    ['Football in Kashmir', 'Local leagues, academies and young players'],
    ['Winter sports in Gulmarg', 'Khelo India Winter Games, skiing, snowboarding'],
    ['School sports and physical education', 'Equipping schools, sports days, PE programmes'],
    ['Gym and fitness', 'Home and institutional gyms, training tips'],
    ['Music education', 'Instruments for schools, music rooms, local musicians'],
    ['Athletics and marathons', 'Running events, track and field across J&K'],
    ['Badminton and indoor sports', 'Indoor courts, badminton, table tennis'],
  ]
  for (const [keyword, notes] of topics) {
    await sql`INSERT INTO mdf_blog_topics (keyword, notes) VALUES (${keyword}, ${notes}) ON CONFLICT DO NOTHING`
  }
}

async function main() {
  console.log('Setting up mdf_* tables…')
  await schema()
  await starterContent()
  const counts = await sql`
    SELECT (SELECT count(*) FROM mdf_categories) AS departments,
           (SELECT count(*) FROM mdf_products) AS products,
           (SELECT count(*) FROM mdf_blog_posts) AS articles,
           (SELECT count(*) FROM mdf_blog_topics) AS topics,
           (SELECT count(*) FROM mdf_media) AS pictures,
           pg_size_pretty(pg_database_size(current_database())) AS database_size`
  console.log('Done:', counts[0])
}

main().catch(err => {
  console.error('Setup failed:', err)
  process.exit(1)
})
