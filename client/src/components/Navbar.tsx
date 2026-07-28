// =============================================================
// DESIGN: Cinematic Noir — Ultra-minimal sticky navigation
// Text-only nav links, gold accent on active/hover,
// transparent → dark-blur on scroll, mobile hamburger
// =============================================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Studio', href: '/studio' },
  { label: 'About', href: '/about' },
  { label: 'Studio Services', href: '/services' },
  { label: 'New Music', href: '/new-music' },
  { label: 'Contact', href: '/contact' },
];

// Social icon SVGs
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const SpotifyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14.5c2.5-1 5.5-1 8 0"/>
    <path d="M7 11c3-1.5 7-1.5 10 0"/>
    <path d="M9 17.5c2-0.8 4-0.8 6 0"/>
  </svg>
);

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[oklch(0.09_0.002_60/0.95)] backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/merrill-audio-logo_21a97666.webp"
                alt="Merrill Audio"
                className="h-10 md:h-12 w-auto object-contain"
                style={{ maxWidth: '220px' }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] font-medium tracking-widest uppercase transition-colors duration-300 ${
                    location === link.href
                      ? 'text-[oklch(0.68_0.09_65)]'
                      : 'text-white/80 hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-body-family)', letterSpacing: '0.15em' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Icons + Mobile Toggle */}
            <div className="flex items-center gap-4">
              {/* Social icons — desktop only */}
              <div className="hidden md:flex items-center gap-3">
                <a
                  href="https://www.instagram.com/merrillaudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[oklch(0.68_0.09_65)] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/justin-merrill-a8989927/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[oklch(0.68_0.09_65)] transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://open.spotify.com/playlist/0P4w21PgJdT6qmpZddkCqa?si=df21cb35eab14a4b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[oklch(0.68_0.09_65)] transition-colors duration-300"
                  aria-label="Spotify"
                >
                  <SpotifyIcon />
                </a>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white/70 hover:text-white transition-colors p-1"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'oklch(0.09 0.002 60 / 0.98)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-2xl font-light tracking-widest uppercase transition-all duration-300 ${
                location === link.href
                  ? 'text-[oklch(0.68_0.09_65)]'
                  : 'text-white/70 hover:text-white'
              }`}
              style={{
                fontFamily: 'var(--font-display-family)',
                transitionDelay: `${i * 50}ms`,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Social icons in mobile menu */}
          <div className="flex items-center gap-6 mt-4">
            <a href="https://www.instagram.com/merrillaudio" target="_blank" rel="noopener noreferrer"
              className="text-white/70 hover:text-[oklch(0.68_0.09_65)] transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/in/justin-merrill-a8989927/" target="_blank" rel="noopener noreferrer"
              className="text-white/70 hover:text-[oklch(0.68_0.09_65)] transition-colors" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href="https://open.spotify.com/playlist/0P4w21PgJdT6qmpZddkCqa?si=df21cb35eab14a4b" target="_blank" rel="noopener noreferrer"
              className="text-white/70 hover:text-[oklch(0.68_0.09_65)] transition-colors" aria-label="Spotify">
              <SpotifyIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
