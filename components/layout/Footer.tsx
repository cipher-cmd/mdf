import Link from 'next/link'
import Image from 'next/image'

const products = [
  { label: 'Sports Goods',  href: '/products/sports' },
  { label: 'Fitness Equipment', href: '/products/fitness' },
  { label: 'Musical Instruments', href: '/products/music' },
  { label: 'Awards & Trophies', href: '/products/awards' },
]

const company = [
  { label: 'About Us',  href: '/#about' },
  { label: 'Clients',   href: '/#clients' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Contact',   href: '/#contact' },
]

const weServe = [
  'Government Departments',
  'Educational Institutions',
  'Sports Clubs & Academies',
  'Private Organisations',
]

const WA_SVG = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-[#050505] relative">
      {/* Gold top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C89B5E]/30 to-transparent" aria-hidden />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-16 pb-12 md:pt-20 md:pb-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-8 mb-14">

          {/* ── Brand column ── */}
          <div className="col-span-2 lg:col-span-1">
            {/* Wordmark */}
            <Link href="/" className="flex items-center gap-3 group mb-6 w-fit">
              <div className="relative h-11 w-11 flex-shrink-0">
                <Image src="/images/mdfFavicon.png" alt="MDF Enterprises" fill className="object-contain" sizes="44px" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-white font-bold text-[20px]"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  MDF
                </span>
                <span className="text-[#C89B5E] text-[8px] font-bold tracking-[0.34em] uppercase mt-[2px]">
                  ENTERPRISES
                </span>
              </div>
            </Link>

            <p className="text-white/60 text-[13px] leading-[1.75] mb-7 max-w-[280px]">
              Sports. Fitness. Music. Awards. Complete supply, installation and service across J&K since 1997.
            </p>

            {/* Certifications */}
            <div className="flex items-center gap-4 mb-7">
              <div className="relative h-8 w-[56px]">
                <Image
                  src="/images/gemLogo.webp"
                  alt="GeM Registered"
                  fill
                  className="object-contain opacity-55 hover:opacity-90 transition-opacity duration-200"
                  sizes="56px"
                />
              </div>
              <div className="relative h-7 w-[60px]">
                <Image
                  src="/images/msmeLogo.webp"
                  alt="MSME Certified"
                  fill
                  className="object-contain opacity-55 hover:opacity-90 transition-opacity duration-200"
                  sizes="60px"
                />
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/917006252334?text=${encodeURIComponent('Hi MDF Enterprises, I have a query.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25d366]/10 border border-[#25d366]/20 hover:bg-[#25d366]/18 hover:border-[#25d366]/40 text-[#25d366] text-[12px] font-bold tracking-[0.06em] uppercase rounded-md transition-all duration-200"
            >
              {WA_SVG} WhatsApp Us
            </a>
          </div>

          {/* ── Products ── */}
          <div className="col-span-1">
            <h2 className="text-[9.5px] font-bold text-[#C89B5E] tracking-[0.22em] uppercase mb-5">
              Products
            </h2>
            <ul className="flex flex-col gap-3">
              {products.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-white/70 hover:text-white/90 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div className="col-span-1">
            <h2 className="text-[9.5px] font-bold text-[#C89B5E] tracking-[0.22em] uppercase mb-5">
              Company
            </h2>
            <ul className="flex flex-col gap-3 mb-8">
              {company.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-white/70 hover:text-white/90 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="text-[9.5px] font-bold text-[#C89B5E] tracking-[0.22em] uppercase mb-4">
              We Serve
            </h2>
            <ul className="flex flex-col gap-2.5">
              {weServe.map(s => (
                <li key={s} className="text-[12.5px] text-white/60">{s}</li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-[9.5px] font-bold text-[#C89B5E] tracking-[0.22em] uppercase mb-5">
              Contact
            </h2>
            <address className="not-italic text-[13px] text-white/70 leading-[1.85]">
              <p className="mb-3">
                SDA Shopping Complex,<br />
                Opp. Iqbal Park<br />
                Srinagar, J&K — 190008
              </p>
              <a
                href="tel:+917006252334"
                className="block hover:text-white transition-colors duration-200 font-medium"
              >
                +91 70062 52334
              </a>
              <a
                href="mailto:mdfenterprisesjk@gmail.com"
                className="block hover:text-white transition-colors duration-200 break-all"
              >
                mdfenterprisesjk@gmail.com
              </a>
            </address>

            {/* Business hours */}
            <div className="mt-6 pt-5 border-t border-white/[0.05]">
              <p className="text-[9.5px] font-bold text-white/50 tracking-[0.18em] uppercase mb-2">Hours</p>
              <p className="text-[12px] text-white/60">Mon – Sat · 10am – 7pm</p>
              <p className="text-[12px] text-white/60">Sunday · Closed</p>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/50">
            © {new Date().getFullYear()} MDF Enterprises, Srinagar. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-[11px] text-white/60 tracking-[0.12em] uppercase">
              Sports · Fitness · Music · Awards
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
