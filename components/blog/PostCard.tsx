import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { categoryLabel, formatDate, readTime, type BlogPost } from '@/lib/data/blog'

export function PostMeta({ post, className = '' }: { post: BlogPost; className?: string }) {
  return (
    <p className={`text-[10.5px] font-semibold tracking-[0.18em] uppercase text-[#8B6B23] ${className}`}>
      {categoryLabel(post.category)} <span className="text-[#C9B994]">·</span>{' '}
      <time dateTime={post.publishedAt} className="text-[#8B8378]">{formatDate(post.publishedAt)}</time>
    </p>
  )
}

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full focus-visible:outline-none">
      <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-[#EFE8DB] shadow-[0_18px_40px_-26px_rgba(40,28,10,0.5)] transition-shadow duration-500 group-hover:shadow-[0_26px_56px_-26px_rgba(40,28,10,0.55)] group-focus-visible:ring-4 group-focus-visible:ring-[#CCA552]/40">
        <Image
          src={post.coverImage}
          alt=""
          fill
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
      </div>
      <PostMeta post={post} className="mt-4" />
      <h3 className="mt-1.5 text-[22px] sm:text-[24px] font-bold text-[#141414] leading-[1.1] font-serif-heading transition-colors group-hover:text-[#6E5418]">
        {post.title}
      </h3>
      <p className="mt-2 text-[13.5px] text-[#6B6359] leading-relaxed line-clamp-2">{post.excerpt}</p>
      <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#141414]">
        Read article
        <span className="text-[#A9A090] font-medium">· {readTime(post)} min</span>
        <ArrowUpRight size={12} weight="bold" className="text-[#B8923F] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}
