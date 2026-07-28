// =============================================================
// HOME PAGE — Cinematic Noir design
// Hero: full-bleed studio image with parallax overlay
// Production Offerings: two-column card grid with YouTube lightbox
// Contact CTA: embedded contact form
// =============================================================

import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, X, Play } from 'lucide-react';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';

// Real studio photos from The Hut Recording Studios
const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/Main%20Background%20EDIT_04f640fb.jpg';
const MIXING_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/Audioproduction_60d08e9b.webp';
const MASTERING_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/on-airpromoMixing_8299d9f5.JPG';

// YouTube video IDs
const REEL_AUDIO = 'exD-PKKSCkI';
const REEL_PROMO = 'My5JF0AKepU';

// Scroll reveal hook
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
              setTimeout(() => t.classList.add('visible'), i * 130);
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

// Parallax hero hook
function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollY = window.scrollY;
        ref.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return ref;
}

// YouTube lightbox modal
function VideoModal({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'oklch(0.05 0.001 60 / 0.95)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2"
          style={{ fontFamily: 'var(--font-body-family)', fontSize: '11px', letterSpacing: '0.15em' }}
        >
          <X size={16} /> CLOSE
        </button>

        {/* 16:9 iframe wrapper */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="Reel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const offeringsRef = useFadeIn();
  const contactRef = useFadeIn();
  const heroParallax = useParallax();
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Animate hero content on load
  useEffect(() => {
    const el = heroContentRef.current;
    if (!el) return;
    const targets = el.querySelectorAll('.fade-up');
    targets.forEach((t, i) => {
      setTimeout(() => t.classList.add('visible'), 300 + i * 130);
    });
  }, []);

  return (
    <Layout>
      {/* ── VIDEO LIGHTBOX ── */}
      {activeVideo && (
        <VideoModal videoId={activeVideo} onClose={() => setActiveVideo(null)} />
      )}

      {/* ── HERO SECTION ── */}
      <section
        className="relative h-screen min-h-[600px] overflow-hidden flex items-center"
        aria-label="Hero"
      >
        {/* Parallax background image */}
        <div
          ref={heroParallax}
          className="absolute inset-0 scale-110"
          style={{ willChange: 'transform' }}
        >
          <img
            src={HERO_IMG}
            alt="Professional recording studio control room"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Cinematic gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, oklch(0.09 0.002 60 / 0.92) 0%, oklch(0.09 0.002 60 / 0.6) 50%, oklch(0.09 0.002 60 / 0.3) 100%)',
          }}
        />

        {/* Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '150px',
            opacity: 0.4,
          }}
        />

        {/* Hero content */}
        <div className="container relative z-10">
          <div className="max-w-2xl" ref={heroContentRef}>
            <h1
              className="text-white mb-6 fade-up"
              style={{
                fontFamily: 'var(--font-display-family)',
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                transitionDelay: '100ms',
              }}
            >
              For All Your
              <br />
              <em style={{ fontStyle: 'italic', color: 'oklch(0.68 0.09 65)' }}>Audio Needs</em>
            </h1>
            <p
              className="text-white/90 mb-10 fade-up"
              style={{
                fontFamily: 'var(--font-body-family)',
                fontSize: '1rem',
                letterSpacing: '0.05em',
                transitionDelay: '200ms',
              }}
            >
              Production Offerings
            </p>
            <div className="fade-up" style={{ transitionDelay: '300ms' }}>
              <Link href="/services" className="btn-gold inline-flex items-center gap-3">
                Explore Services
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, oklch(0.09 0.002 60))' }}
        />
      </section>

      {/* ── PRODUCTION OFFERINGS ── */}
      <section className="py-24 md:py-32" ref={offeringsRef}>
        <div className="container">
          <div className="mb-16 fade-up">
            <span className="gold-line" />
            <p className="section-label mb-4">What We Do</p>
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-display-family)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              Production Offerings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Audio Production */}
            <div
              className="group relative overflow-hidden fade-up delay-100"
              style={{ background: 'oklch(0.12 0.003 60)' }}
            >
              {/* Clickable image area with play overlay */}
              <div
                className="img-hover aspect-[16/10] overflow-hidden relative cursor-pointer"
                onClick={() => setActiveVideo(REEL_AUDIO)}
              >
                <img
                  src={MIXING_IMG}
                  alt="Audio production mixing console"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, oklch(0.09 0.002 60 / 0.85) 0%, transparent 60%)' }}
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-full"
                    style={{ background: 'oklch(0.68 0.09 65 / 0.9)' }}
                  >
                    <Play size={20} fill="white" className="text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="section-label mb-3">01</p>
                <h3
                  className="text-white mb-4"
                  style={{
                    fontFamily: 'var(--font-display-family)',
                    fontSize: '1.75rem',
                    fontWeight: 400,
                  }}
                >
                  Audio Production
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body-family)' }}>
                  Engineering and producing with 20+ years of experience across multiple genres. From concept to final master, we bring your vision to life with precision and artistry.
                </p>
                <button
                  onClick={() => setActiveVideo(REEL_AUDIO)}
                  className="inline-flex items-center gap-2 text-[oklch(0.68_0.09_65)] text-xs tracking-widest uppercase font-medium hover:gap-3 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-body-family)' }}
                >
                  Watch Reel <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Card 2: On-Air Promo Mixing */}
            <div
              className="group relative overflow-hidden fade-up delay-200"
              style={{ background: 'oklch(0.12 0.003 60)' }}
            >
              {/* Clickable image area with play overlay */}
              <div
                className="img-hover aspect-[16/10] overflow-hidden relative cursor-pointer"
                onClick={() => setActiveVideo(REEL_PROMO)}
              >
                <img
                  src={MASTERING_IMG}
                  alt="On-air promo mixing studio"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, oklch(0.09 0.002 60 / 0.85) 0%, transparent 60%)' }}
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-full"
                    style={{ background: 'oklch(0.68 0.09 65 / 0.9)' }}
                  >
                    <Play size={20} fill="white" className="text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="section-label mb-3">02</p>
                <h3
                  className="text-white mb-4"
                  style={{
                    fontFamily: 'var(--font-display-family)',
                    fontSize: '1.75rem',
                    fontWeight: 400,
                  }}
                >
                  On-Air Promo Mixing
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body-family)' }}>
                  Mixing for major networks including ABC, Disney, Hulu, FX, and Freeform. Broadcast-quality audio that meets the highest industry standards.
                </p>
                <button
                  onClick={() => setActiveVideo(REEL_PROMO)}
                  className="inline-flex items-center gap-2 text-[oklch(0.68_0.09_65)] text-xs tracking-widest uppercase font-medium hover:gap-3 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-body-family)' }}
                >
                  Watch Reel <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER STAT BAR ── */}
      <section
        style={{ background: 'oklch(0.12 0.003 60)', borderTop: '1px solid oklch(1 0 0 / 6%)', borderBottom: '1px solid oklch(1 0 0 / 6%)' }}
        className="py-12"
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '20+', label: 'Years Experience' },
              { value: '2005', label: 'Founded' },
              { value: 'Dolby', label: 'Atmos Mixing' },
              { value: 'CA', label: 'Mammoth Lakes' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="text-[oklch(0.68_0.09_65)] mb-1"
                  style={{
                    fontFamily: 'var(--font-display-family)',
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight: 300,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-white/80 text-xs tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body-family)', letterSpacing: '0.15em' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="py-24 md:py-32" ref={contactRef}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 fade-up">
              <span className="gold-line" />
              <p className="section-label mb-4">Start a Project</p>
              <h2
                className="text-white mb-4"
                style={{
                  fontFamily: 'var(--font-display-family)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                }}
              >
                Let's Create Something
                <br />
                <em style={{ fontStyle: 'italic', color: 'oklch(0.68 0.09 65)' }}>Extraordinary</em>
              </h2>
              <p className="text-white/90 text-sm" style={{ fontFamily: 'var(--font-body-family)' }}>
                Whether you're an artist, label, or network — we'd love to hear about your project.
              </p>
            </div>
            <div className="fade-up delay-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
