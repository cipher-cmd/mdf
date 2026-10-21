import type { MetadataRoute } from 'next'

// A crawler obeys only the most specific group that names it, so every group repeats the disallow list
const disallow = ['/admin/', '/api/']
const AI_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'anthropic-ai', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'cohere-ai', 'Amazonbot', 'Bytespider',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...AI_BOTS.map(userAgent => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: 'https://mdfenterprisesjk.in/sitemap.xml',
    host: 'https://mdfenterprisesjk.in',
  }
}
