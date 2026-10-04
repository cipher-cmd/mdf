'use client'

import { PageHero, StripItem } from '@/components/ui/PageHero'
import { blogCategories, blogPosts } from '@/lib/data/blog'
import { selectBlogCategory } from './BlogExplorer'

const count = (id: string) => blogPosts.filter(p => p.category === id).length

export function BlogHero() {
  return (
    <PageHero
      crumb="Blog"
      eyebrow="Insights. Stories. Impact."
      title="Our Blog"
      intro="Buying guides, procurement know-how and stories from the world of sport, fitness and music — written from Srinagar for players, schools and institutions."
      video="/BG/blogHero.mp4"
      poster="/BG/blogHeroPoster.webp"
      cta={{ label: 'Read the latest', target: 'articles' }}
      badge="Practical advice since 1997"
      stripLabel="Blog topics"
    >
      {blogCategories.map((c, i) => (
        <StripItem
          key={c.id}
          index={i}
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
