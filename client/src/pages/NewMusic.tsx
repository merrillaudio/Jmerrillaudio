// =============================================================
// NEW MUSIC PAGE — Cinematic Noir design
// Submits to Google Forms (entry IDs extracted from the live form)
// which automatically writes to the connected Google Sheet.
// Fields: Band Name, Album Name, Genre, Link, Favorite Song, Comments
// =============================================================

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';

const MIXING_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663456461424/4qzxnvx2PVnBfC9gVSypoW/IMG_6765_8246ce73.jpeg';

// Google Form submission endpoint (no-cors POST)
const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLScHX4ULPMurU4qaEvfIYNkQpht3eN_EiQNJ2DROGFXZenWOhw/formResponse';

// Entry IDs extracted from the live Google Form
const ENTRY = {
  bandName:     'entry.1744970824',
  albumName:    'entry.1950447321',
  genre:        'entry.141793884',
  link:         'entry.394393594',
  favoriteSong: 'entry.474472520',
  comments:     'entry.635029394',
};

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

const genres = [
  'Pop', 'Rock', 'Hip-Hop / Rap', 'R&B / Soul', 'Electronic / EDM',
  'Jazz', 'Classical', 'Country', 'Folk / Indie', 'Metal', 'Latin', 'Other',
];

export default function NewMusic() {
  const formRef = useFadeIn();
  const boardRef = useFadeIn();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const targets = el.querySelectorAll('.fade-up');
    targets.forEach((t, i) => {
      setTimeout(() => t.classList.add('visible'), 300 + i * 130);
    });
  }, []);

  const [form, setForm] = useState({
    bandName: '',
    albumName: '',
    genre: '',
    favoriteSong: '',
    link: '',
    comments: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.bandName.trim()) newErrors.bandName = 'Band / artist name is required';
    if (!form.genre.trim()) newErrors.genre = 'Please select a genre';
    if (!form.favoriteSong.trim()) newErrors.favoriteSong = 'Favorite song is required';
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setSubmitError('');

    try {
      // Build a URL-encoded body matching Google Forms field names
      const body = new URLSearchParams({
        [ENTRY.bandName]:     form.bandName,
        [ENTRY.albumName]:    form.albumName,
        [ENTRY.genre]:        form.genre,
        [ENTRY.link]:         form.link,
        [ENTRY.favoriteSong]: form.favoriteSong,
        [ENTRY.comments]:     form.comments,
      });

      // Google Forms requires no-cors; we won't get a response body back,
      // but the submission is recorded in the connected Google Sheet.
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      setLoading(false);
      setSubmitted(true);
    } catch {
      setLoading(false);
      setSubmitError('Something went wrong. Please try again.');
    }
  };

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden flex items-end">
        <img
          src={MIXING_IMG}
          alt="New music community"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, oklch(0.09 0.002 60) 0%, oklch(0.09 0.002 60 / 0.6) 50%, transparent 100%)' }}
        />
        <div className="container relative z-10 pb-14" ref={heroRef}>
          <p className="section-label mb-4 fade-up">Community</p>
          <h1
            className="text-white fade-up"
            style={{
              fontFamily: 'var(--font-display-family)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            New
            <br />
            <em style={{ fontStyle: 'italic', color: 'oklch(0.68 0.09 65)' }}>Music</em>
          </h1>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-16 md:py-20">
        <div className="container max-w-2xl">
          <span className="gold-line" />
          <p className="section-label mb-4">Share Your Sound</p>
          <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body-family)' }}>
            We love discovering new music. Share what you're listening to, what you're working on, or what inspires you. Our community is built on the shared love of sound — and we want to hear from you.
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="pb-24 md:pb-32" ref={formRef}>
        <div className="container">
          <div className="max-w-2xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <CheckCircle className="text-[oklch(0.68_0.09_65)] mb-5" size={44} strokeWidth={1} />
                <h2
                  className="text-white mb-4"
                  style={{
                    fontFamily: 'var(--font-display-family)',
                    fontSize: '2.5rem',
                    fontWeight: 300,
                  }}
                >
                  Thanks for Sharing
                </h2>
                <p className="text-white/80 text-sm max-w-sm mb-8" style={{ fontFamily: 'var(--font-body-family)' }}>
                  Your submission has been received and will appear in the community board below shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ bandName: '', albumName: '', genre: '', favoriteSong: '', link: '', comments: '' });
                  }}
                  className="text-[oklch(0.68_0.09_65)] text-xs tracking-widest uppercase hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-body-family)' }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="fade-up">
                  <h2
                    className="text-white mb-2"
                    style={{
                      fontFamily: 'var(--font-display-family)',
                      fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                      fontWeight: 300,
                    }}
                  >
                    Submit Your Music
                  </h2>
                  <p className="text-white/75 text-sm mb-8" style={{ fontFamily: 'var(--font-body-family)' }}>
                    Fields marked with * are required.
                  </p>
                </div>

                {/* Band Name */}
                <div className="fade-up delay-100">
                  <label htmlFor="bandName" className="block text-[10px] font-medium tracking-widest uppercase text-white/70 mb-2" style={{ fontFamily: 'var(--font-body-family)' }}>
                    Band / Artist Name *
                  </label>
                  <input id="bandName" name="bandName" type="text" value={form.bandName} onChange={handleChange} placeholder="Your band or artist name" className="studio-input" aria-required="true" />
                  {errors.bandName && <p className="text-red-400/80 text-xs mt-1" style={{ fontFamily: 'var(--font-body-family)' }}>{errors.bandName}</p>}
                </div>

                {/* Album Name */}
                <div className="fade-up delay-150">
                  <label htmlFor="albumName" className="block text-[10px] font-medium tracking-widest uppercase text-white/70 mb-2" style={{ fontFamily: 'var(--font-body-family)' }}>
                    Album Name
                  </label>
                  <input id="albumName" name="albumName" type="text" value={form.albumName} onChange={handleChange} placeholder="Album or EP title" className="studio-input" />
                </div>

                {/* Genre */}
                <div className="fade-up delay-200">
                  <label htmlFor="genre" className="block text-[10px] font-medium tracking-widest uppercase text-white/70 mb-2" style={{ fontFamily: 'var(--font-body-family)' }}>
                    Genre *
                  </label>
                  <select id="genre" name="genre" value={form.genre} onChange={handleChange} className="studio-input" aria-required="true" style={{ appearance: 'none' }}>
                    <option value="" disabled>Select a genre</option>
                    {genres.map((g) => (
                      <option key={g} value={g} style={{ background: 'oklch(0.12 0.003 60)' }}>{g}</option>
                    ))}
                  </select>
                  {errors.genre && <p className="text-red-400/80 text-xs mt-1" style={{ fontFamily: 'var(--font-body-family)' }}>{errors.genre}</p>}
                </div>

                {/* Favorite Song */}
                <div className="fade-up delay-250">
                  <label htmlFor="favoriteSong" className="block text-[10px] font-medium tracking-widest uppercase text-white/70 mb-2" style={{ fontFamily: 'var(--font-body-family)' }}>
                    Favorite Song *
                  </label>
                  <input id="favoriteSong" name="favoriteSong" type="text" value={form.favoriteSong} onChange={handleChange} placeholder="Your favorite track from this artist" className="studio-input" aria-required="true" />
                  {errors.favoriteSong && <p className="text-red-400/80 text-xs mt-1" style={{ fontFamily: 'var(--font-body-family)' }}>{errors.favoriteSong}</p>}
                </div>

                {/* Link */}
                <div className="fade-up delay-300">
                  <label htmlFor="link" className="block text-[10px] font-medium tracking-widest uppercase text-white/70 mb-2" style={{ fontFamily: 'var(--font-body-family)' }}>
                    Link (Optional)
                  </label>
                  <input id="link" name="link" type="url" value={form.link} onChange={handleChange} placeholder="Spotify, SoundCloud, YouTube, etc." className="studio-input" />
                </div>

                {/* Comments */}
                <div className="fade-up delay-350">
                  <label htmlFor="comments" className="block text-[10px] font-medium tracking-widest uppercase text-white/70 mb-2" style={{ fontFamily: 'var(--font-body-family)' }}>
                    Other Comments
                  </label>
                  <textarea id="comments" name="comments" rows={4} value={form.comments} onChange={handleChange} placeholder="Tell us what makes this music special..." className="studio-input resize-none" />
                </div>

                {submitError && (
                  <p className="text-red-400/80 text-sm" style={{ fontFamily: 'var(--font-body-family)' }}>{submitError}</p>
                )}

                <div className="fade-up delay-400">
                  <button type="submit" disabled={loading} className="btn-gold-solid disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Submitting...' : 'Submit Music'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY BOARD ── */}
      <section
        className="py-20 md:py-28"
        style={{ borderTop: '1px solid oklch(1 0 0 / 0.07)' }}
        ref={boardRef}
      >
        <div className="container">
          <div className="mb-12 fade-up">
            <span className="gold-line" />
            <p className="section-label mb-2">Community Board</p>
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-display-family)',
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                fontWeight: 300,
              }}
            >
              What We're Listening To
            </h2>
            <p className="text-white/65 text-sm mt-3" style={{ fontFamily: 'var(--font-body-family)' }}>
              Submissions from the community — updated in real time.
            </p>
          </div>

          <div className="fade-up delay-200" style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid oklch(1 0 0 / 0.1)' }}>
            <iframe
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQuYYZ5H1PBLivgT_xMxVvXjXCDASDdzOh3VQ8QuQc6MTCY_EoHq8WQCKY1ksfb8EDa9W8xVAcCtXph/pubhtml?gid=1132122249&single=true&widget=true&headers=false"
              width="100%"
              height="600"
              style={{ display: 'block', border: 'none' }}
              title="Community Music Submissions"
            />
          </div>

          <p className="text-white/45 text-xs mt-4 text-center" style={{ fontFamily: 'var(--font-body-family)' }}>
            New submissions may take a minute or two to appear.
          </p>
        </div>
      </section>
    </Layout>
  );
}
