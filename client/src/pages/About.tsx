// =============================================================
// ABOUT PAGE — Cinematic Noir design
// Company story, founding year, full-service description
// Centered text block with portrait image
// =============================================================

import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

const HERO_STUDIO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/Main%20Background%20EDIT_04f640fb.jpg';
const MIXING_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/IMG_2789_d9852fde.webp';

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

const milestones = [
  { year: '2005', event: 'Began career as a full-service audio production engineer and mixer' },
  { year: '2010', event: 'Expanded into broadcast, TV, and film mixing — partnering with major networks including ABC, Disney, Hulu, FX, and Freeform' },
  { year: '2012', event: 'Won Grammy Award for Best Latin Jazz Album' },
  { year: '2015', event: 'Won Grammy Award for Best Engineered Album, Classical' },
  { year: '2024', event: 'Opened The Hut Recording Studio — a purpose-built creative space for recording, mixing, and Dolby Atmos production' },
  { year: '2025', event: 'Signed with ORiGiN Music Publishing, expanding into production music and sync licensing' },
];

export default function About() {
  const storyRef = useFadeIn();
  const timelineRef = useFadeIn();
  const valuesRef = useFadeIn();
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
          alt="Studio interior"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, oklch(0.09 0.002 60) 0%, oklch(0.09 0.002 60 / 0.6) 50%, transparent 100%)' }}
        />
        <div className="container relative z-10 pb-14" ref={heroRef}>
          <p className="section-label mb-4 fade-up">Our Story</p>
          <h1
            className="text-white fade-up"
            style={{
              fontFamily: 'var(--font-display-family)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            About
            <br />
            <em style={{ fontStyle: 'italic', color: 'oklch(0.68 0.09 65)' }}>Merrillaudio</em>
          </h1>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-20 md:py-28" ref={storyRef}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="gold-line" />
              <p className="section-label mb-4 fade-up">Who We Are</p>
              <h2
                className="text-white mb-8 fade-up delay-100"
                style={{
                  fontFamily: 'var(--font-display-family)',
                  fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                }}
              >
                A Full-Service Music
                <br />Production Company
              </h2>
              <div className="space-y-5 fade-up delay-200">
                <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body-family)' }}>
                  Founded in 2005, Merrill Audio has grown from a boutique production house into one of California's most respected full-service audio production companies. We work with independent artists, major labels, and television networks — bringing the same level of dedication and craft to every project.
                </p>
                <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body-family)' }}>
                  Based in Mammoth Lakes, California, we've built our reputation on a simple philosophy: great sound requires both technical mastery and genuine artistic investment. Every mix, every master, every production decision is made with the music — and the artist — at the center.
                </p>
                <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body-family)' }}>
                  Our work spans multiple genres and formats — from intimate singer-songwriter recordings to Dolby Atmos mixes for major streaming platforms, from independent albums to broadcast promos for ABC, Disney, Hulu, FX, and Freeform.
                </p>
              </div>
              <div className="mt-8 fade-up delay-300">
                <Link href="/contact" className="btn-gold inline-flex items-center gap-3">
                  Work With Us <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="fade-up delay-200">
              <div className="relative">
                <img
                  src={MIXING_IMG}
                  alt="Justin Merrill's two Grammy Awards"
                  className="w-full aspect-[4/5] object-contain"
                  style={{ background: 'oklch(0.09 0.002 60)' }}
                  loading="lazy"
                />
                {/* Decorative frame */}
                <div
                  className="absolute -top-4 -right-4 w-32 h-32 border"
                  style={{ borderColor: 'oklch(0.68 0.09 65 / 0.2)' }}
                />
                <div
                  className="absolute -bottom-4 -left-4 w-20 h-20 border"
                  style={{ borderColor: 'oklch(0.68 0.09 65 / 0.15)' }}
                />
                {/* Stat overlay */}
                <div
                  className="absolute bottom-6 left-6 p-5"
                  style={{ background: 'oklch(0.09 0.002 60 / 0.9)', backdropFilter: 'blur(8px)' }}
                >
                  <p
                    className="text-[oklch(0.68_0.09_65)] mb-1"
                    style={{
                      fontFamily: 'var(--font-display-family)',
                      fontSize: '2.5rem',
                      fontWeight: 300,
                    }}
                  >
                    20+
                  </p>
                  <p
                    className="text-white/70 text-xs tracking-widest uppercase"
                    style={{ fontFamily: 'var(--font-body-family)', letterSpacing: '0.15em' }}
                  >
                    Years of Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'oklch(0.11 0.002 60)' }}
        ref={timelineRef}
      >
        <div className="container">
          <div className="mb-14 fade-up">
            <span className="gold-line" />
            <p className="section-label mb-4">History</p>
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-display-family)',
                fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                fontWeight: 300,
              }}
            >
              Our Journey
            </h2>
          </div>

          <div className="relative max-w-2xl">
            {/* Vertical line */}
            <div
              className="absolute left-[4.5rem] top-0 bottom-0 w-px"
              style={{ background: 'oklch(1 0 0 / 0.07)' }}
            />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-8 fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-16 flex-shrink-0 text-right">
                    <span
                      className="text-[oklch(0.68_0.09_65)] text-sm font-medium"
                      style={{ fontFamily: 'var(--font-body-family)' }}
                    >
                      {m.year}
                    </span>
                  </div>
                  <div className="relative flex-1 pb-2">
                    {/* Dot */}
                    <div
                      className="absolute -left-[1.55rem] top-1.5 w-2 h-2 rounded-full"
                      style={{ background: 'oklch(0.68 0.09 65)' }}
                    />
                    <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body-family)' }}>
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-20 md:py-28" ref={valuesRef}>
        <div className="container">
          <div className="mb-14 fade-up">
            <span className="gold-line" />
            <p className="section-label mb-4">Philosophy</p>
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-display-family)',
                fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                fontWeight: 300,
              }}
            >
              What We Believe
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Craft Over Convenience',
                body: 'Every decision — from mic placement to the final master — is made with intention. We never take shortcuts when quality is at stake.',
              },
              {
                number: '02',
                title: 'Artist First',
                body: 'The artist\'s vision is the north star. Our role is to serve that vision with expertise, not to impose our own aesthetic.',
              },
              {
                number: '03',
                title: 'Timeless Sound',
                body: 'Trends come and go. We focus on recordings that will sound as powerful in twenty years as they do today.',
              },
            ].map((v, i) => (
              <div key={i} className="fade-up" style={{ transitionDelay: `${i * 120}ms` }}>
                <p className="section-label mb-4">{v.number}</p>
                <h3
                  className="text-white mb-4"
                  style={{
                    fontFamily: 'var(--font-display-family)',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                  }}
                >
                  {v.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body-family)' }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
