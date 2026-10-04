'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from '@phosphor-icons/react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { FilterBar } from '@/components/ui/FilterBar'
import { EASE } from '@/lib/animation'
import { scrollToId } from '@/lib/scroll'
import { blogCategories, blogPosts, categoryLabel, readTime, type BlogPost } from '@/lib/data/blog'
import { PostCard, PostMeta } from './PostCard'
import { useCopy } from '@/providers/SiteProvider'
import { lines } from '@/lib/content/copy'

const isCategory = (id: string) => blogCategories.some(c => c.id === id)

/**
 * The URL hash carries the active topic (/blog#guides) so the hero strip can drive
 * the filter and a topic view can be shared as a link.
 */
export function selectBlogCategory(id: string) {
  scrollToId('articles') // rewrites the hash to #articles, so set ours after
  history.replaceState(null, '', id === 'all' ? location.pathname : `#${id}`)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

export function BlogExplorer({ initialPosts }: { initialPosts?: BlogPost[] }) {
  const posts = initialPosts ?? blogPosts
  const copy = useCopy('blog_page')
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const newestFirst = useMemo(
    () => [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [posts]
  )
  const featured = useMemo(
    () => newestFirst.find(p => p.featured) ?? newestFirst[0],
    [newestFirst]
  )

  const filters = useMemo(
    () => [
      { id: 'all', label: 'All', short: 'All', count: posts.length },
      ...blogCategories.map(c => ({ ...c, count: posts.filter(p => p.category === c.id).length })),
    ],
    [posts]
  )

  useEffect(() => {
    const sync = () => {
      const id = location.hash.slice(1)
      setActive(isCategory(id) ? id : 'all')
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const select = (id: string) => {
    history.replaceState(null, '', id === 'all' ? location.pathname : `#${id}`)
    setActive(id)
  }

  const showFeatured = active === 'all' && !query.trim()

  // ponytail: no pagination — add it once the admin panel pushes past ~12 posts
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return newestFirst
      .filter(p => !(showFeatured && p.slug === featured?.slug))
      .filter(p => active === 'all' || p.category === active)
      .filter(p => !q || `${p.title} ${p.excerpt} ${categoryLabel(p.category)}`.toLowerCase().includes(q))
  }, [newestFirst, featured, active, query, showFeatured])

  return (
    <section id="articles" className="relative w-full bg-[#FAF8F5] pt-6 sm:pt-10 pb-16 sm:pb-24">
      {/* Misty range watermark behind the heading */}
      <div className="absolute inset-x-0 top-0 h-[460px] pointer-events-none select-none bg-feather opacity-80" aria-hidden>
        <Image src="/BG/blogBg.png" alt="" fill className="object-cover object-left-top" sizes="100vw" />
      </div>

      <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 lg:gap-10 mb-6 sm:mb-8">
          <div>
            <p className="mb-2 text-[11px] tracking-[0.2em] font-semibold text-[#8B6B23] uppercase">— {copy.section_eyebrow}</p>
            <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold text-[#141414] leading-[1.04] font-serif-heading">
              {lines(copy.section_heading).map((l, i) => <span key={i}>{i > 0 && <><br className="hidden sm:block" />{' '}</>}{l}</span>)}
            </h2>
          </div>
          <p className="text-[#6B6359] text-[14.5px] lg:text-[14px] lg:text-right max-w-[460px] leading-relaxed">
            {copy.section_text}
          </p>
        </AnimatedSection>
      </div>

      <FilterBar filters={filters} active={active} onSelect={select} query={query} onQuery={setQuery} placeholder="Search articles" />

      <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10">
        <p className="mt-5 sm:mt-7 mb-6 sm:mb-8 text-[12.5px] text-[#6B6359]" aria-live="polite">
          {visible.length + (showFeatured ? 1 : 0)} {visible.length + (showFeatured ? 1 : 0) === 1 ? 'article' : 'articles'}
          {active !== 'all' && <> in <span className="text-[#141414] font-semibold">{categoryLabel(active)}</span></>}
        </p>

        {/* Featured story — only on the unfiltered view */}
        <AnimatePresence initial={false}>
          {showFeatured && featured && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-5 lg:gap-12 items-center pb-12 sm:pb-16 mb-10 sm:mb-14 border-b border-[#E8E2D6]"
              >
                <div className="relative aspect-[16/10] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#EFE8DB] shadow-[0_30px_60px_-30px_rgba(40,28,10,0.55)]">
                  <Image
                    src={featured.coverImage}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 760px"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#141414]/80 backdrop-blur text-[10.5px] font-semibold tracking-[0.18em] uppercase text-[#E9CF94]">
                    Featured
                  </span>
                </div>
                <div>
                  <PostMeta post={featured} />
                  <h3 className="mt-2 text-[30px] sm:text-[40px] lg:text-[46px] font-bold text-[#141414] leading-[1.02] font-serif-heading transition-colors group-hover:text-[#6E5418]">
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-[15px] text-[#554E46] leading-[1.7] max-w-[520px]">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2.5 pl-5 pr-1.5 min-h-[46px] rounded-full bg-[#141414] text-white text-[13.5px] font-semibold transition-colors group-hover:bg-[#2A241B]">
                    Read article · {readTime(featured)} min
                    <span className="w-8 h-8 rounded-full bg-[#CCA552] text-[#1E170A] flex items-center justify-center">
                      <ArrowUpRight size={13} weight="bold" className="transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </span>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {visible.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 sm:gap-y-14">
            <AnimatePresence mode="popLayout">
              {visible.map((post, i) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3), ease: EASE }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          !showFeatured && (
            <div className="py-20 text-center max-w-[420px] mx-auto">
              <p className="text-[26px] font-bold text-[#141414] font-serif-heading">No articles found.</p>
              <p className="mt-2 text-[14px] text-[#6B6359] leading-relaxed">Try another topic or a different search.</p>
              <button
                onClick={() => { select('all'); setQuery('') }}
                className="mt-6 inline-flex items-center gap-1.5 min-h-[44px] px-5 rounded-full border border-[#DDD3C0] text-[13px] font-semibold text-[#141414] hover:border-[#CCA552] transition-colors"
              >
                <X size={13} weight="bold" /> Clear filters
              </button>
            </div>
          )
        )}
      </div>
    </section>
  )
}
