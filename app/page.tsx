import dynamic from 'next/dynamic'
import { Hero }          from '@/components/home/Hero'
import { TrustStrip }    from '@/components/home/TrustStrip'
import { Categories }    from '@/components/home/Categories'
import { About }         from '@/components/home/About'

const BrandPartners = dynamic(() => import('@/components/home/BrandPartners').then(mod => mod.BrandPartners), { ssr: true })
const WhoWeServe = dynamic(() => import('@/components/home/WhoWeServe').then(mod => mod.WhoWeServe), { ssr: true })
const Process = dynamic(() => import('@/components/home/Process').then(mod => mod.Process), { ssr: true })
const Clients = dynamic(() => import('@/components/home/Clients').then(mod => mod.Clients), { ssr: true })
const Testimonials = dynamic(() => import('@/components/home/Testimonials').then(mod => mod.Testimonials), { ssr: true })
const CtaBand = dynamic(() => import('@/components/home/CtaBand').then(mod => mod.CtaBand), { ssr: true })
const Contact = dynamic(() => import('@/components/home/Contact').then(mod => mod.Contact), { ssr: true })

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
