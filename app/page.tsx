import dynamic from 'next/dynamic'
import { Hero }          from '@/components/home/Hero'
import { Categories }    from '@/components/home/Categories'
import { About }         from '@/components/home/About'
import { BrandPartners } from '@/components/home/BrandPartners'
import { WhoWeServe }    from '@/components/home/WhoWeServe'
import { Process }       from '@/components/home/Process'
import { Clients }       from '@/components/home/Clients'
import { Showroom }      from '@/components/home/Showroom'

const CtaBand = dynamic(() => import('@/components/home/CtaBand').then(m => m.CtaBand))

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#141414] overflow-x-clip selection:bg-[#C59B27] selection:text-white">
      {/* 1. Hero with Dal lake canvas & overlapping floating stats */}
      <Hero />

      {/* 2. Categories & Featured Products Carousel */}
      <Categories />

      {/* 3. About MDF Enterprises & Founder Syed Mumtaz spotlight */}
      <About />

      {/* 4. Our Trusted Brands (12 brand logos) */}
      <BrandPartners />

      {/* 5. Who We Serve (4 audience cards) */}
      <WhoWeServe />

      {/* 6. How We Work (4-step process) */}
      <Process />

      {/* 7. Trusted by Institutions & Departments (9 seals) */}
      <Clients />

      {/* 8. Visit Our Srinagar Showroom */}
      <Showroom />

      {/* 9. Panoramic finale: contact + quick quote (id="contact") */}
      <CtaBand />
    </main>
  )
}
