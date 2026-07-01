import { useState } from 'react'
import Logo from './Logo'

function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 mt-8 md:mt-10">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-8 md:py-12">

        {/* Top - logo + tagline */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-10">
          <Logo variant="auth" />
          <p className="text-chill-muted text-xs md:text-sm mt-3 max-w-md px-4">
            Nikmati berbagai film dan series terbaik dengan kualitas premium.
          </p>
        </div>

        {/* MOBILE: accordion list */}
        <div className="md:hidden divide-y divide-white/5 border-y border-white/5">
          <FooterAccordion
            title="Menu"
            links={['Beranda', 'Film', 'Series', 'Daftar Saya']}
          />
          <FooterAccordion
            title="Genre"
            links={['Action', 'Drama', 'Comedy', 'Sci-Fi']}
          />
          <FooterAccordion
            title="Bantuan"
            links={['FAQ', 'Kontak', 'Pusat Bantuan']}
          />
          <FooterAccordion
            title="Legal"
            links={['Privasi', 'Syarat & Ketentuan']}
          />
        </div>

        {/* DESKTOP: grid 4 kolom */}
        <div className="hidden md:grid grid-cols-4 gap-8 mb-10">
          <FooterCol
            title="Menu"
            links={['Beranda', 'Film', 'Series', 'Daftar Saya']}
          />
          <FooterCol
            title="Genre"
            links={['Action', 'Drama', 'Comedy', 'Sci-Fi']}
          />
          <FooterCol
            title="Bantuan"
            links={['FAQ', 'Kontak', 'Pusat Bantuan']}
          />
          <FooterCol
            title="Legal"
            links={['Privasi', 'Syarat & Ketentuan']}
          />
        </div>

        {/* Bottom - copyright */}
        <div className="text-center pt-5 md:pt-6 md:border-t md:border-white/5 text-[11px] md:text-xs text-chill-muted mt-6 md:mt-0">
          <p>© 2026 CHILL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/* Accordion item untuk mobile */
function FooterAccordion({ title, links }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between py-4 text-white text-sm font-medium"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
            open ? 'rotate-90' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {open && (
        <div className="pb-3 pl-1 flex flex-col gap-2">
          {links.map((label) => (
            <a
              key={label}
              href="#"
              className="text-chill-muted hover:text-white text-sm transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/* Grid column untuk desktop */
function FooterCol({ title, links }) {
  return (
    <div className="flex flex-col">
      <h4 className="text-white mb-3 font-semibold text-sm">{title}</h4>
      {links.map((label) => (
        <a
          key={label}
          href="#"
          className="text-chill-muted hover:text-white my-1 text-sm transition-colors"
        >
          {label}
        </a>
      ))}
    </div>
  )
}

export default Footer