import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { blogPosts } from '@/lib/data/blog'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) notFound()

  const related = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 2)

  const categoryLabel: Record<string, string> = {
    sports: 'Sports', fitness: 'Fitness', awards: 'Awards',
    'gem-guides': 'GeM Guides', news: 'News',
  }

  return (
    <main className="bg-[#050505] min-h-screen pt-24">

      {/* Hero */}
      <div className="relative w-full" style={{ height: '50vh', minHeight: '360px' }}>
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-[800px] mx-auto px-6 pb-10">
          <span className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded bg-[#FF6B00]/90 text-white mb-4 inline-block">
            {categoryLabel[post.category]}
          </span>
          <h1 className="text-[32px] md:text-[48px] font-medium text-white leading-snug"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}>{post.title}</h1>
          <div className="flex items-center gap-3 text-[12px] text-white/40 mt-3">
            <Clock size={12} /><span>{post.readTime} min read</span>
            <span>·</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase text-white/40 hover:text-[#C89B5E] transition-colors mb-10">
          <ArrowLeft size={13} /> Back to Blog
        </Link>

        <div
          className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/[0.06]">
            <h3 className="text-[20px] font-medium text-white mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map(r => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group block bg-[#0f0f0f] border border-white/[0.06] hover:border-[#C89B5E]/25 rounded-xl p-5 transition-colors duration-300">
                  <p className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-[0.12em] mb-2">{categoryLabel[r.category]}</p>
                  <h4 className="text-[16px] font-medium text-white group-hover:text-[#C89B5E] transition-colors" style={{ fontFamily: 'var(--font-cormorant), serif' }}>{r.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
