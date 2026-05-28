import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { blogPosts } from '@/lib/data/blog'

export const metadata: Metadata = {
  title: 'Blog — Sports & Procurement Insights',
  description: 'Tips, guides and insights on sports equipment procurement, GeM portal, gymnasium setup, and sports culture in J&K.',
}

const categoryLabel: Record<string, string> = {
  sports: 'Sports', fitness: 'Fitness', awards: 'Awards',
  'gem-guides': 'GeM Guides', news: 'News',
}

export default function BlogPage() {
  const [hero, ...rest] = blogPosts

  return (
    <main className="bg-[#050505] min-h-screen pt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">

        <div className="mb-12">
          <p className="overline-gold mb-5">From The Field</p>
          <h1 className="text-[48px] md:text-[64px] font-medium text-white leading-[1.0]"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Sports &amp; Procurement<br />Insights<span className="text-[#C89B5E]">.</span>
          </h1>
        </div>

        {/* Hero post */}
        <Link href={`/blog/${hero.slug}`} className="group block mb-12">
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-[#111]">
            <Image src={hero.coverImage} alt={hero.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="100vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded bg-[#FF6B00]/90 text-white mb-3 inline-block">{categoryLabel[hero.category]}</span>
              <h2 className="text-[28px] md:text-[40px] font-medium text-white leading-snug mb-2 max-w-[700px]"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}>{hero.title}</h2>
              <div className="flex items-center gap-2 text-[12px] text-white/50">
                <Clock size={12} /><span>{hero.readTime} min read</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="bg-[#0f0f0f] border border-white/[0.06] group-hover:border-[#C89B5E]/25 rounded-xl overflow-hidden transition-colors duration-300 flex gap-0 flex-col">
                <div className="relative w-full aspect-[16/7] overflow-hidden bg-[#111]">
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded bg-[#FF6B00]/90 text-white">{categoryLabel[post.category]}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/30 mb-3"><Clock size={11} /><span>{post.readTime} min read</span></div>
                  <h3 className="text-[20px] font-medium text-white group-hover:text-[#C89B5E] transition-colors mb-2"
                    style={{ fontFamily: 'var(--font-cormorant), serif' }}>{post.title}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-[11px] font-bold uppercase text-white/30 group-hover:text-[#C89B5E] transition-colors">
                    Read Article <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
