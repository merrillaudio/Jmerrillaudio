// =============================================================
// STUDIO SERVICES PAGE — Cinematic Noir design
// Grid of 4 services: Mixing, Mastering, Production Music, Atmos
// Each with image, title, description, hover overlay
// =============================================================

import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

const MIXING_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/Mixing_7dfc0050.JPG';
const MASTERING_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/Mastering_5b2e5a4e.webp';
const ATMOS_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/GP__0287_4152e13d.JPG';
const HERO_STUDIO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/Main%20Background%20EDIT_04f640fb.jpg';
const STUDIO_NATURE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/ProductionMusic_02ce1eaf.png';

const services = [
  {
    id: '01',
    title: 'Mixing',
    image: MIXING_IMG,
    description: 'Professional mixing that balances every element of your recording into a cohesive, powerful whole. We work across all genres with meticulous attention to dynamics, space, and emotion.',
    details: ['Stereo & Stem Mixing', 'Analog & Digital Signal Chain', 'Revision Rounds Included', 'Broadcast & Streaming Ready'],
  },
  {
    id: '02',
    title: 'Mastering',
    image: MASTERING_IMG,
    description: 'The final step that prepares your music for the world. Our mastering process ensures optimal loudness, tonal balance, and translation across all playback systems and streaming platforms.',
    details: ['Streaming-Optimized Masters', 'Vinyl & CD Mastering', 'Reference Monitoring', 'Metadata & ISRC Encoding'],
  },
  {
    id: '03',
    title: 'Production Music',
    image: STUDIO_NATURE,
    description: 'Original music production from concept to completion. With 15+ years across multiple genres, we bring both technical expertise and genuine musical sensibility to every project.',
    details: ['Multi-Genre Expertise', 'Arrangement & Orchestration', 'Session Musicians Available', 'Sync Licensing Ready'],
    externalLink: 'http://www.happyyeahproductions.com',
  },
  {
    id: '04',
    title: 'Atmos Mixing',
    image: ATMOS_IMG,
    description: 'Dolby Atmos immersive audio mixing for music, film, and broadcast. Our Atmos room delivers spatial audio experiences that meet the highest streaming and theatrical standards.',
    details: ['Dolby Atmos Certified', 'Apple Music Spatial Audio', 'Netflix & Streaming Delivery', 'Theatrical & Home Formats'],
  },
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = entry.target.querySelectorAll('.fade-up');
            targets.forEach((t, i) => {
              setTimeout(() => t.classList.add('visible'), i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Services() {
  const servicesRef = useFadeIn();
  const networksRef = useFadeIn();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const targets = el.querySelectorAll('.fade-up');
    targets.forEach((t, i) => {
      setTimeout(() => t.classList.add('visible'), 300 + i * 130);
    });
  }, []);

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden flex items-end">
        <img
          src={HERO_STUDIO}
          alt="Studio services"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, oklch(0.09 0.002 60) 0%, oklch(0.09 0.002 60 / 0.55) 50%, transparent 100%)' }}
        />
        <div className="container relative z-10 pb-14" ref={heroRef}>
          <p className="section-label mb-4 fade-up">What We Offer</p>
          <h1
            className="text-white fade-up"
            style={{
              fontFamily: 'var(--font-display-family)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            Studio
            <br />
            <em style={{ fontStyle: 'italic', color: 'oklch(0.68 0.09 65)' }}>Services</em>
          </h1>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-20 md:py-28" ref={servicesRef}>
        <div className="container">
          <div className="mb-14 fade-up">
            <span className="gold-line" />
            <p className="section-label mb-4">Our Offerings</p>
            <h2
              className="text-white max-w-xl"
              style={{
                fontFamily: 'var(--font-display-family)',
                fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                fontWeight: 300,
                lineHeight: 1.15,
              }}
            >
              Precision Audio for Every Format
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div
                key={service.id}
                className="group relative overflow-hidden fade-up"
                style={{
                  background: 'oklch(0.12 0.003 60)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'oklch(0.09 0.002 60 / 0.7)', backdropFilter: 'blur(2px)' }}
                  >
                    <div className="text-center px-8">
                      <ul className="space-y-2">
                        {service.details.map((d, j) => (
                          <li
                            key={j}
                            className="text-white text-xs tracking-wider"
                            style={{ fontFamily: 'var(--font-body-family)', letterSpacing: '0.1em' }}
                          >
                            — {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Number badge */}
                  <div className="absolute top-4 left-4">
                    <span className="section-label">{service.id}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3
                    className="text-white mb-3"
                    style={{
                      fontFamily: 'var(--font-display-family)',
                      fontSize: '1.75rem',
                      fontWeight: 400,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-5" style={{ fontFamily: 'var(--font-body-family)' }}>
                    {service.description}
                  </p>
                  {(service as any).externalLink ? (
                    <a
                      href={(service as any).externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[oklch(0.68_0.09_65)] text-xs tracking-widest uppercase font-medium hover:gap-3 transition-all duration-300"
                      style={{ fontFamily: 'var(--font-body-family)' }}
                    >
                      Visit Site <ArrowRight size={12} />
                    </a>
                  ) : (
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[oklch(0.68_0.09_65)] text-xs tracking-widest uppercase font-medium hover:gap-3 transition-all duration-300"
                      style={{ fontFamily: 'var(--font-body-family)' }}
                    >
                      Inquire <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NETWORK CREDITS ── */}
      <section
        className="py-16 md:py-20"
        style={{ background: 'oklch(0.11 0.002 60)', borderTop: '1px solid oklch(1 0 0 / 0.06)' }}
        ref={networksRef}
      >
        <div className="container">
          <div className="text-center mb-10 fade-up">
            <p className="section-label mb-3">Broadcast Credits</p>
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-display-family)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                fontWeight: 300,
              }}
            >
              Trusted by Major Networks
            </h2>
          </div>
          {/* Row 1: Streaming Platforms */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 mb-8 fade-up delay-200">
            {/* Netflix */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/netflix_c00004cb.png" alt="Netflix" style={{height:'24px', filter:'brightness(0) invert(1)'}} />
            </div>
            {/* Hulu */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 90 30" height="24" xmlns="http://www.w3.org/2000/svg" fill="white">
                <text x="0" y="24" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="700" fill="white" letterSpacing="-0.5">hulu</text>
              </svg>
            </div>
            {/* HBO */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/hbo_476a10fa.png" alt="HBO" style={{height:'24px', filter:'brightness(0) invert(1)'}} />
            </div>
            {/* Apple TV+ */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/appletv_7c0bed30.png" alt="Apple TV+" style={{height:'24px', filter:'brightness(0) invert(1)'}} />
            </div>
            {/* Disney+ */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/disney_427d7cae.png" alt="Disney+" style={{height:'24px', filter:'brightness(0) invert(1)'}} />
            </div>
            {/* Peacock */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/peacock_32fc616d.png" alt="Peacock" style={{height:'24px', filter:'brightness(0) invert(1)'}} />
            </div>
            {/* AMC */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 100 34" height="28" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="28" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="30" fontWeight="900" fill="white" letterSpacing="2">AMC</text>
              </svg>
            </div>
            {/* Paramount+ */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 200 34" height="24" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="26" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="white" letterSpacing="0.5">PARAMOUNT+</text>
              </svg>
            </div>
            {/* Warner Bros */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 180 34" height="24" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="26" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="700" fill="white" letterSpacing="0.5">WARNER BROS.</text>
              </svg>
            </div>
            {/* ABC */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/abc_71e59aa4.png" alt="ABC" style={{height:'28px', filter:'brightness(0) invert(1)'}} />
            </div>
            {/* FX */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 70 34" height="28" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="28" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="32" fontWeight="900" fill="white" letterSpacing="1">FX</text>
              </svg>
            </div>
            {/* Audible */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 130 34" height="24" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="26" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="white" letterSpacing="0.5">audible</text>
              </svg>
            </div>
            {/* BBC */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 90 34" height="28" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="2" width="26" height="28" rx="2" fill="white"/>
                <rect x="32" y="2" width="26" height="28" rx="2" fill="white"/>
                <rect x="64" y="2" width="26" height="28" rx="2" fill="white"/>
                <text x="13" y="22" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="black">B</text>
                <text x="45" y="22" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="black">B</text>
                <text x="77" y="22" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="black">C</text>
              </svg>
            </div>
          </div>
          {/* Row 2: Music & Production */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 fade-up delay-300">
            {/* Amazon Studios */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 200 34" height="22" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="24" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="400" fill="white"><tspan fontWeight="700">amazon</tspan><tspan fontWeight="300"> studios</tspan></text>
              </svg>
            </div>
            {/* Universal Music */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 220 34" height="22" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="14" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="400" fill="white" letterSpacing="1">UNIVERSAL</text>
                <text x="50%" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="300" fill="white" letterSpacing="0.5">MUSIC PUBLISHING GROUP</text>
              </svg>
            </div>
            {/* Warner Chappell */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 220 34" height="22" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="14" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="13" fontWeight="900" fill="white" letterSpacing="1">WARNER CHAPPELL</text>
                <text x="50%" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="300" fill="white" letterSpacing="1">PRODUCTION MUSIC</text>
              </svg>
            </div>
            {/* BMG */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 100 44" height="32" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="36" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="40" fontWeight="900" fill="white" letterSpacing="2">BMG</text>
              </svg>
            </div>
            {/* WWE */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 100 34" height="28" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="28" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="30" fontWeight="900" fill="white" letterSpacing="1">WWE</text>
              </svg>
            </div>
            {/* Fremantle Media */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 220 34" height="22" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="24" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="18" fontWeight="900" fill="white" letterSpacing="1">FREMANTLE<tspan fontWeight="300" fontSize="16">MEDIA</tspan></text>
              </svg>
            </div>
            {/* Mushroom Production Music */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 240 34" height="22" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="14" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" fill="white" letterSpacing="0.5">mushroom</text>
                <text x="50%" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="300" fill="white" letterSpacing="0.5">production music</text>
              </svg>
            </div>
            {/* NFL Network */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/nfl_66d20969.png" alt="NFL" style={{height:'28px', filter:'brightness(0) invert(1)'}} />
            </div>
            {/* APM Music */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 160 34" height="26" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="26" fontFamily="Arial Black, sans-serif" fontSize="28" fontWeight="900" fill="white" letterSpacing="1">apm</text>
                <text x="90" y="26" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="400" fill="white">music</text>
              </svg>
            </div>
            {/* Nickelodeon */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 200 34" height="24" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="26" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="22" fontWeight="900" fill="white" letterSpacing="0.5">nickelodeon</text>
              </svg>
            </div>
            {/* ORiGiN Music */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 180 34" height="24" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="26" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="white" letterSpacing="1">ORiGiN <tspan fontWeight="300">music</tspan></text>
              </svg>
            </div>
            {/* Extreme Music */}
            <div className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-300 h-9">
              <svg viewBox="0 0 200 34" height="22" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="14" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="11" fontWeight="900" fill="white" letterSpacing="2">EXTREME</text>
                <text x="50%" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="300" fill="white" letterSpacing="2">MUSIC</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-xl">
            <span className="gold-line" />
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: 'var(--font-display-family)',
                fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                fontWeight: 300,
                lineHeight: 1.15,
              }}
            >
              Ready to Start
              <br />
              <em style={{ fontStyle: 'italic', color: 'oklch(0.68 0.09 65)' }}>Your Project?</em>
            </h2>
            <p className="text-white/40 text-sm mb-8" style={{ fontFamily: 'var(--font-body-family)' }}>
              Reach out to discuss your project, timeline, and budget. We'll find the right approach for your music.
            </p>
            <Link href="/contact" className="btn-gold inline-flex items-center gap-3">
              Get In Touch <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
