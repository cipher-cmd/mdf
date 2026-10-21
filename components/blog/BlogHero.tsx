'use client'

import { PageHero, StripItem } from '@/components/ui/PageHero'
import { blogCategories, type BlogPost } from '@/lib/data/blog'
import { useCopy } from '@/providers/SiteProvider'
import { selectBlogCategory } from './BlogExplorer'

export function BlogHero({ posts }: { posts: BlogPost[] }) {
  const copy = useCopy('blog_page')
  const count = (id: string) => posts.filter(p => p.category === id).length
  return (
    <PageHero
      crumb="Blog"
      title={copy.title}
      intro={copy.intro}
      video="/BG/blogHero.mp4"
      poster="/BG/blogHeroPoster.webp"
      cta={{ label: copy.button, target: 'articles' }}
      badge={copy.badge}
      stripLabel="Blog topics"
    >
      {blogCategories.map(c => (
        <StripItem
          key={c.id}
          short={c.short}
          label={c.label}
          sub={`${count(c.id)} ${count(c.id) === 1 ? 'article' : 'articles'}`}
          href={`#${c.id}`}
          onClick={e => { e.preventDefault(); selectBlogCategory(c.id) }}
        />
      ))}
    </PageHero>
  )
}
