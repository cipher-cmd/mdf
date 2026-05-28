import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '@/lib/data/categories'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Sports goods, fitness equipment, musical instruments, custom awards & trophies. Browse our full catalogue.',
}

export default function ProductsPage() {
  return (
    <main className="bg-[#050505] min-h-screen pt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <p className="overline-gold mb-5">Our Products</p>
        <h1 className="text-[48px] md:text-[64px] font-medium text-white leading-[1.0] mb-14"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}>
          Everything You Need<span className="text-[#C89B5E]">.</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.filter(c => c.enabled).map(cat => (
            <Link key={cat.id} href={`/products/${cat.id}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-[#0f0f0f] border border-white/[0.06] group-hover:border-[#FF6B00]/30 transition-colors duration-300" style={{ height: '360px' }}>
                <Image src={cat.image} alt={cat.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF6B00] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C89B5E]/70 mb-2">{cat.tagline}</p>
                  <h2 className="text-[28px] font-medium text-white mb-3" style={{ fontFamily: 'var(--font-cormorant), serif' }}>{cat.label}</h2>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase text-white/40 group-hover:text-[#FF6B00] transition-colors">
                    Browse <ArrowUpRight size={13} />
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
