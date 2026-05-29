import dynamic from 'next/dynamic'
import { Hero }       from '@/components/home/Hero'
import { TrustStrip } from '@/components/home/TrustStrip'
import { Categories } from '@/components/home/Categories'
import { About }      from '@/components/home/About'

// Below-fold: server-render content but split JS chunks
const BrandPartners = dynamic(() => import('@/components/home/BrandPartners').then(m => m.BrandPartners))
const WhoWeServe    = dynamic(() => import('@/components/home/WhoWeServe').then(m => m.WhoWeServe))
const Process       = dynamic(() => import('@/components/home/Process').then(m => m.Process))
const Clients       = dynamic(() => import('@/components/home/Clients').then(m => m.Clients))
const Testimonials  = dynamic(() => import('@/components/home/Testimonials').then(m => m.Testimonials))
const CtaBand       = dynamic(() => import('@/components/home/CtaBand').then(m => m.CtaBand))
const Contact       = dynamic(() => import('@/components/home/Contact').then(m => m.Contact))

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
      <Testimonials />
      <CtaBand />
      <Contact />
    </>
  )
}
