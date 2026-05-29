import dynamic from 'next/dynamic'
import { Hero }          from '@/components/home/Hero'
import { TrustStrip }   from '@/components/home/TrustStrip'
import { Categories }   from '@/components/home/Categories'
import { About }        from '@/components/home/About'
import { BrandPartners } from '@/components/home/BrandPartners'
import { WhoWeServe }   from '@/components/home/WhoWeServe'
import { Process }      from '@/components/home/Process'
import { Clients }      from '@/components/home/Clients'

// Below-fold client-heavy components — split JS chunks, still SSR content
const CtaBand      = dynamic(() => import('@/components/home/CtaBand').then(m => m.CtaBand))
const Contact      = dynamic(() => import('@/components/home/Contact').then(m => m.Contact))

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Categories />
      <About />
      <BrandPartners />
      <WhoWeServe />
      <Process />
      <Clients />
      <CtaBand />
      <Contact />
    </>
  )
}
