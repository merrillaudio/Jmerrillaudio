// =============================================================
// STUDIO PAGE — Cinematic Noir design
// Hero: nature/mountain studio image
// Description, image carousel, tech specs, 360° placeholder
// =============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Cpu, Volume2, Sliders } from 'lucide-react';
import Layout from '@/components/Layout';

const PANO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/GS__0286_5506d151.webp';

const BASE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW';

const HERO_STUDIO = `${BASE}/Studio%201_d016fb42.JPG`;

const galleryImages = [
  { src: `${BASE}/Studio%201_d016fb42.JPG`, alt: 'The Hut Recording Studios — Studio 1' },
  { src: `${BASE}/Studio%202_d06cdb11.JPG`, alt: 'The Hut Recording Studios — Studio 2' },
  { src: `${BASE}/Studio%203_e03634ce.JPG`, alt: 'The Hut Recording Studios — Studio 3' },
  { src: `${BASE}/Studio%204_5ab3c1ae.jpeg`, alt: 'The Hut Recording Studios — Studio 4' },
  { src: `${BASE}/Studio%205_6d0ace17.jpeg`, alt: 'The Hut Recording Studios — Studio 5' },
  { src: `${BASE}/Studio%206_9c4233e8.jpeg`, alt: 'The Hut Recording Studios — Studio 6' },
  { src: `${BASE}/Rack_f62241d2.jpeg`, alt: 'The Hut Recording Studios — Rack gear' },
  { src: `${BASE}/IMG_2137_829ce544.jpeg`, alt: 'The Hut Recording Studios — studio session' },
  { src: `${BASE}/IMG_2653_b9dee1b5.jpeg`, alt: 'The Hut Recording Studios — studio interior' },
  { src: `${BASE}/IMG_3602_d13ddabf.jpeg`, alt: 'The Hut Recording Studios — studio setup' },
  { src: `${BASE}/IMG_7438_ac5f6c63.jpeg`, alt: 'The Hut Recording Studios — studio view' },
  { src: `${BASE}/IMG_7805_acc92c20.jpeg`, alt: 'The Hut Recording Studios — studio equipment' },
  { src: `${BASE}/Mammoth_0b239f5d.jpeg`, alt: 'The Hut Recording Studios — Mammoth' },
];

const techSpecs = [
  {
    icon: <Volume2 size={20} strokeWidth={1.5} />,
    title: 'Dolby Atmos',
    description: 'Full Dolby Atmos capable mixing room with immersive speaker array for spatial audio delivery.',
  },
  {
    icon: <Cpu size={20} strokeWidth={1.5} />,
    title: 'Class-A Interfaces',
    description: 'Premium Class-A interfaces and converters for transparent, high-fidelity signal path from source to master.',
  },
  {
    icon: <Sliders size={20} strokeWidth={1.5} />,
    title: 'Burl Audio Mothership',
    description: 'Burl Audio Mothership (16 in / 16 out) — industry-leading AD/DA conversion for uncompromised analog warmth.',
  },
  {
    icon: <MapPin size={20} strokeWidth={1.5} />,
    title: 'Outboard Gear',
    description: 'Extensive collection of outboard compressors, EQs, and processors for analog character and depth.',
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function PanoramaViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || viewerRef.current) return;

    const initViewer = () => {
      const pnlm = (window as any).pannellum;
      if (!pnlm || !containerRef.current) return;
      viewerRef.current = pnlm.viewer(containerRef.current, {
        type: 'equirectangular',
        panorama: PANO_URL,
        autoLoad: true,
        autoRotate: -2,
        compass: false,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        mouseZoom: true,
        hfov: 100,
        pitch: 0,
        yaw: 0,
        minHfov: 50,
        maxHfov: 120,
      });
    };

    // If pannellum is already loaded on window, init immediately
    if ((window as any).pannellum) {
      initViewer();
    } else {
      // Load pannellum script from CDN then init
      const existing = document.getElementById('pannellum-script');
      if (existing) {
        existing.addEventListener('load', initViewer);
      } else {
        const script = document.createElement('script');
        script.id = 'pannellum-script';
        script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
        script.onload = initViewer;
        document.head.appendChild(script);
      }
    }

    return () => {
      if (viewerRef.current) {
        try { viewerRef.current.destroy(); } catch {}
        viewerRef.current = null;
      }
    };
  }, []);

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mb-10">
          <span className="gold-line" />
          <p className="section-label mb-4">Virtual Tour</p>
          <h2
            className="text-white mb-2"
            style={{
              fontFamily: 'var(--font-display-family)',
              fontSize: 'clamp(1.75rem, 3vw, 3rem)',
              fontWeight: 300,
            }}
          >
            360° Studio Experience
          </h2>
          <p className="text-white/80 text-sm" style={{ fontFamily: 'var(--font-body-family)' }}>
            Drag to explore every corner of The Hut. Use scroll to zoom in and out.
          </p>
        </div>

        <div
          className="relative overflow-hidden border border-white/10"
          style={{ height: '520px', background: 'oklch(0.07 0.002 60)' }}
        >
          <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>

        <p className="mt-4 text-white/60 text-xs text-center" style={{ fontFamily: 'var(--font-body-family)', letterSpacing: '0.1em' }}>
          CLICK &amp; DRAG TO LOOK AROUND · SCROLL TO ZOOM
        </p>
      </div>
    </section>
  );
}

export default function Studio() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const descRef = useFadeIn();
  const specsRef = useFadeIn();
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroContentRef.current;
    if (!el) return;
    const targets = el.querySelectorAll('.fade-up');
    targets.forEach((t, i) => {
      setTimeout(() => t.classList.add('visible'), 300 + i * 130);
    });
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-end">
        <img
          src={HERO_STUDIO}
          alt="The Hut Recording Studios — studio"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, oklch(0.09 0.002 60) 0%, oklch(0.09 0.002 60 / 0.5) 50%, transparent 100%)' }}
        />
        <div className="container relative z-10 pb-16" ref={heroContentRef}>
          <p className="section-label mb-4 fade-up">The Studio</p>
          <h1
            className="text-white fade-up"
            style={{
              fontFamily: 'var(--font-display-family)',
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              transitionDelay: '100ms',
            }}
          >
            The Hut
            <br />
            <em style={{ fontStyle: 'italic', color: 'oklch(0.68 0.09 65)' }}>Recording Studios</em>
          </h1>
        </div>
      </section>

      {/* ── DESCRIPTION ── */}
      <section className="py-20 md:py-28" ref={descRef}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="gold-line" />
              <p className="section-label mb-4 fade-up">The Environment</p>
              <h2
                className="text-white mb-6 fade-up delay-100"
                style={{
                  fontFamily: 'var(--font-display-family)',
                  fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                }}
              >
                Where Creativity
                <br />Finds Its Voice
              </h2>
              <div className="space-y-4 fade-up delay-200">
                <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body-family)' }}>
                  Nestled in a remote, nature-rich environment, The Hut Recording Studios was purpose-built to inspire. Surrounded by mountains and wilderness, the studio offers the creative isolation that allows artists to fully immerse themselves in their work.
                </p>
                <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body-family)' }}>
                  Designed by a world-class acoustician, every surface, angle, and material has been chosen to deliver an acoustic environment of exceptional clarity and character. The result is a space where sound is not just recorded — it is sculpted.
                </p>
                <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body-family)' }}>
                  The combination of natural inspiration and technical excellence makes The Hut a destination for artists seeking both creative freedom and uncompromising quality.
                </p>
              </div>
            </div>
            <div className="relative fade-up delay-300">
              <img
                src={HERO_STUDIO}
                alt="Studio interior — mixing console"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              <div
                className="absolute -bottom-4 -left-4 w-24 h-24 border border-[oklch(0.68_0.09_65)/0.3]"
                style={{ borderColor: 'oklch(0.68 0.09 65 / 0.3)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY CAROUSEL ── */}
      <section className="py-4 pb-24">
        <div className="container mb-10">
          <span className="gold-line" />
          <p className="section-label mb-2">Gallery</p>
          <h2
            className="text-white"
            style={{
              fontFamily: 'var(--font-display-family)',
              fontSize: 'clamp(1.75rem, 3vw, 3rem)',
              fontWeight: 300,
            }}
          >
            The Space
          </h2>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main slide */}
          <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden" style={{ background: 'oklch(0.07 0.002 60)' }}>
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === activeSlide ? 1 : 0 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, oklch(0.09 0.002 60 / 0.4) 0%, transparent 50%)' }}
                />
              </div>
            ))}

            {/* Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white border border-white/20 hover:border-white/50 transition-all duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white border border-white/20 hover:border-white/50 transition-all duration-300"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            {/* Slide counter */}
            <div className="absolute bottom-4 right-6 z-10">
              <p className="text-white/75 text-xs" style={{ fontFamily: 'var(--font-body-family)', letterSpacing: '0.1em' }}>
                {String(activeSlide + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className="transition-all duration-300"
                style={{
                  width: i === activeSlide ? '24px' : '6px',
                  height: '2px',
                  background: i === activeSlide ? 'oklch(0.68 0.09 65)' : 'oklch(1 0 0 / 0.2)',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH SPECS ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'oklch(0.11 0.002 60)' }}
        ref={specsRef}
      >
        <div className="container">
          <div className="mb-14 fade-up">
            <span className="gold-line" />
            <p className="section-label mb-4">Technical Specifications</p>
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-display-family)',
                fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                fontWeight: 300,
              }}
            >
              World-Class Equipment
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techSpecs.map((spec, i) => (
              <div
                key={i}
                className="p-6 border border-white/6 hover:border-[oklch(0.68_0.09_65)/0.3] transition-all duration-400 fade-up group"
                style={{
                  background: 'oklch(0.13 0.003 60)',
                  transitionDelay: `${i * 100}ms`,
                  borderColor: 'oklch(1 0 0 / 0.06)',
                }}
              >
                <div className="text-[oklch(0.68_0.09_65)] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {spec.icon}
                </div>
                <h3
                  className="text-white mb-3"
                  style={{
                    fontFamily: 'var(--font-display-family)',
                    fontSize: '1.2rem',
                    fontWeight: 400,
                  }}
                >
                  {spec.title}
                </h3>
                <p className="text-white/75 text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body-family)' }}>
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 360° INTERACTIVE VIEWER ── */}
      <PanoramaViewer />
    </Layout>
  );
}
