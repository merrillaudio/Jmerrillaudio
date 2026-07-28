// =============================================================
// DESIGN: Cinematic Noir — Minimal footer with gold accents
// Email, social icons, copyright, thin separator
// =============================================================

import { Link } from 'wouter';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const SpotifyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14.5c2.5-1 5.5-1 8 0"/>
    <path d="M7 11c3-1.5 7-1.5 10 0"/>
    <path d="M9 17.5c2-0.8 4-0.8 6 0"/>
  </svg>
);

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Studio', href: '/studio' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'New Music', href: '/new-music' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'oklch(0.07 0.002 60)' }}>
      <div className="separator" />
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <p className="text-white font-semibold tracking-widest uppercase text-xs mb-1"
                style={{ fontFamily: 'var(--font-body-family)', letterSpacing: '0.25em' }}>
                The Hut
              </p>
              <p className="text-[oklch(0.68_0.09_65)] tracking-wider uppercase text-[10px] font-light"
                style={{ fontFamily: 'var(--font-body-family)', letterSpacing: '0.3em' }}>
                Recording Studios
              </p>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs" style={{ fontFamily: 'var(--font-body-family)' }}>
              Full-service audio production, mixing, mastering, and Dolby Atmos. Serving artists and major networks since 2006.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label mb-5">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-body-family)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label mb-5">Get In Touch</p>
            <a
              href="mailto:merrillaudio@me.com"
              className="text-white/85 hover:text-[oklch(0.68_0.09_65)] text-sm transition-colors duration-300 block mb-3"
              style={{ fontFamily: 'var(--font-body-family)' }}
            >
              merrillaudio@me.com
            </a>
            <p className="text-white/65 text-sm mb-6" style={{ fontFamily: 'var(--font-body-family)' }}>
              California, USA
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-white/65 hover:text-[oklch(0.68_0.09_65)] transition-colors duration-300" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="text-white/65 hover:text-[oklch(0.68_0.09_65)] transition-colors duration-300" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer"
                className="text-white/65 hover:text-[oklch(0.68_0.09_65)] transition-colors duration-300" aria-label="Spotify">
                <SpotifyIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="separator mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/55 text-xs" style={{ fontFamily: 'var(--font-body-family)', letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} The Hut Recording Studios. All rights reserved.
          </p>
          <p className="text-white/45 text-xs" style={{ fontFamily: 'var(--font-body-family)' }}>
            Founded 2006 · California, USA
          </p>
        </div>
      </div>
    </footer>
  );
}
