// =============================================================
// CONTACT PAGE — Cinematic Noir design
// Contact form, email displayed, location: California, USA
// Clean layout with generous whitespace
// =============================================================

import { useEffect, useRef } from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';

const ATMOS_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/GS__0279_021e1876.JPG';

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

const contactInfo = [
  {
    icon: <Mail size={18} strokeWidth={1.5} />,
    label: 'Email',
    value: 'merrillaudio@me.com',
    href: 'mailto:merrillaudio@me.com',
  },
  {
    icon: <MapPin size={18} strokeWidth={1.5} />,
    label: 'Location',
    value: 'California, USA',
    href: null,
  },
  {
    icon: <Clock size={18} strokeWidth={1.5} />,
    label: 'Response Time',
    value: 'Within 24–48 hours',
    href: null,
  },
];

export default function Contact() {
  const mainRef = useFadeIn();
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
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden flex items-end">
        <img
          src={ATMOS_IMG}
          alt="Contact The Hut Recording Studios"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, oklch(0.09 0.002 60) 0%, oklch(0.09 0.002 60 / 0.6) 50%, transparent 100%)' }}
        />
        <div className="container relative z-10 pb-14" ref={heroRef}>
          <p className="section-label mb-4 fade-up">Reach Out</p>
          <h1
            className="text-white fade-up"
            style={{
              fontFamily: 'var(--font-display-family)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            Let's
            <br />
            <em style={{ fontStyle: 'italic', color: 'oklch(0.68 0.09 65)' }}>Connect</em>
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 md:py-28" ref={mainRef}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info — left column */}
            <div className="lg:col-span-2">
              <span className="gold-line" />
              <p className="section-label mb-4 fade-up">Contact Information</p>
              <h2
                className="text-white mb-8 fade-up delay-100"
                style={{
                  fontFamily: 'var(--font-display-family)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                }}
              >
                We'd Love to
                <br />Hear From You
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-10 fade-up delay-200" style={{ fontFamily: 'var(--font-body-family)' }}>
                Whether you're an independent artist, a label, or a network looking for broadcast-quality audio — we're here to discuss your project and find the right approach.
              </p>

              <div className="space-y-6 fade-up delay-300">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ border: '1px solid oklch(0.68 0.09 65 / 0.3)', color: 'oklch(0.68 0.09 65)' }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <p
                        className="text-[10px] font-medium tracking-widest uppercase text-white/55 mb-1"
                        style={{ fontFamily: 'var(--font-body-family)', letterSpacing: '0.15em' }}
                      >
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white/70 hover:text-[oklch(0.68_0.09_65)] text-sm font-medium transition-colors duration-300"
                          style={{ fontFamily: 'var(--font-body-family)' }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white/90 text-sm" style={{ fontFamily: 'var(--font-body-family)' }}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative separator */}
              <div className="mt-12 fade-up delay-400">
                <div className="separator mb-8" />
                <p className="text-white/65 text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body-family)' }}>
                  The Hut Recording Studios has been serving artists and networks from California since 2006. We work with clients locally and remotely — wherever great audio is needed.
                </p>
              </div>
            </div>

            {/* Form — right column */}
            <div className="lg:col-span-3 fade-up delay-200">
              <div
                className="p-8 md:p-10"
                style={{ background: 'oklch(0.11 0.002 60)', border: '1px solid oklch(1 0 0 / 0.06)' }}
              >
                <p className="section-label mb-4">Send a Message</p>
                <h3
                  className="text-white mb-8"
                  style={{
                    fontFamily: 'var(--font-display-family)',
                    fontSize: '1.75rem',
                    fontWeight: 300,
                  }}
                >
                  Start the Conversation
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
