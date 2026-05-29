import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*',               allow: '/', disallow: '/admin/' },
      { userAgent: 'GPTBot',          allow: '/' },
      { userAgent: 'OAI-SearchBot',   allow: '/' },
      { userAgent: 'ChatGPT-User',    allow: '/' },
      { userAgent: 'anthropic-ai',    allow: '/' },
      { userAgent: 'ClaudeBot',       allow: '/' },
      { userAgent: 'PerplexityBot',   allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'cohere-ai',       allow: '/' },
      { userAgent: 'Amazonbot',       allow: '/' },
      { userAgent: 'Bytespider',      allow: '/' },
    ],
    sitemap: 'https://mdfenterprisesjk.in/sitemap.xml',
  }
}
