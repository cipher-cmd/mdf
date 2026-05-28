import { Hero }          from '@/components/home/Hero'
import { TrustStrip }    from '@/components/home/TrustStrip'
import { Categories }    from '@/components/home/Categories'
import { About }         from '@/components/home/About'
import { BrandPartners } from '@/components/home/BrandPartners'
import { WhoWeServe }    from '@/components/home/WhoWeServe'
import { Process }       from '@/components/home/Process'
import { Clients }       from '@/components/home/Clients'
import { Testimonials }  from '@/components/home/Testimonials'
import { CtaBand }       from '@/components/home/CtaBand'
import { Contact }       from '@/components/home/Contact'

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
