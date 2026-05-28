'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { blogPosts } from '@/lib/data/blog'
import { FEATURES } from '@/lib/config/features'

const categoryLabel: Record<string, string> = {
  sports:     'Sports',
  fitness:    'Fitness',
  awards:     'Awards',
  'gem-guides': 'GeM Guides',
  news:       'News',
}

export function BlogPreview() {
  if (!FEATURES.blogEnabled) return null

  const posts = blogPosts.filter(p => p.featured).slice(0, 3)

  return (
    <section id="blog" className="bg-[#0f0f0f] py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="overline-gold mb-5">From The Field</p>
            <h2
              className="text-[36px] md:text-[48px] font-medium text-white leading-[1.05]"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Sports &amp; Procurement<br />
              Insights<span className="text-[#C89B5E]">.</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-[12px] font-bold tracking-[0.12em] uppercase text-white/40 hover:text-[#C89B5E] transition-colors flex items-center gap-2 shrink-0"
          >
            View All Articles <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="bg-[#111] border border-white/[0.06] group-hover:border-[#C89B5E]/25 rounded-xl overflow-hidden transition-colors duration-300">
                  {/* Cover */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0a0a0a]">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded bg-[#FF6B00]/90 text-white">
                        {categoryLabel[post.category]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-[11px] text-white/30 mb-3">
                      <Clock size={11} />
                      <span>{post.readTime} min read</span>
                    </div>
                    <h3
                      className="text-[17px] font-medium text-white leading-snug mb-2 group-hover:text-[#C89B5E] transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-cormorant), serif' }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-[12px] text-white/40 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-1 text-[11px] font-bold tracking-[0.08em] uppercase text-white/30 group-hover:text-[#C89B5E] transition-colors duration-200">
                      Read Article <ArrowUpRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
