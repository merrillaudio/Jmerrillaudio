// =============================================================
// DESIGN: Cinematic Noir — Minimal contact form
// Gold-accented inputs, validation, confirmation message
// =============================================================

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    try {
      // Netlify Forms: POST url-encoded data to any path on the site, with a
      // form-name field matching the stub form in client/index.html.
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...form }).toString(),
      });
      if (!res.ok) throw new Error(`Form POST failed: ${res.status}`);
      setSubmitted(true);
    } catch {
      setErrors({ submit: 'Something went wrong sending your message. Please email us directly.' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
        <CheckCircle className="text-[oklch(0.68_0.09_65)] mb-4" size={40} strokeWidth={1} />
        <h3
          className="text-2xl text-white mb-3"
          style={{ fontFamily: 'var(--font-display-family)', fontWeight: 300 }}
        >
          Message Received
        </h3>
        <p className="text-white/80 text-sm max-w-sm" style={{ fontFamily: 'var(--font-body-family)' }}>
          Thank you for reaching out. We'll be in touch within 24–48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-[10px] font-medium tracking-widest uppercase text-white/70 mb-2"
            style={{ fontFamily: 'var(--font-body-family)' }}
          >
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="studio-input"
            aria-required="true"
          />
          {errors.name && (
            <p className="text-red-400/80 text-xs mt-1" style={{ fontFamily: 'var(--font-body-family)' }}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-[10px] font-medium tracking-widest uppercase text-white/70 mb-2"
            style={{ fontFamily: 'var(--font-body-family)' }}
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="studio-input"
            aria-required="true"
          />
          {errors.email && (
            <p className="text-red-400/80 text-xs mt-1" style={{ fontFamily: 'var(--font-body-family)' }}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="phone"
            className="block text-[10px] font-medium tracking-widest uppercase text-white/70 mb-2"
            style={{ fontFamily: 'var(--font-body-family)' }}
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 (000) 000-0000"
            className="studio-input"
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-[10px] font-medium tracking-widest uppercase text-white/70 mb-2"
            style={{ fontFamily: 'var(--font-body-family)' }}
          >
            Subject *
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            className="studio-input"
            aria-required="true"
          />
          {errors.subject && (
            <p className="text-red-400/80 text-xs mt-1" style={{ fontFamily: 'var(--font-body-family)' }}>
              {errors.subject}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-[10px] font-medium tracking-widest uppercase text-white/70 mb-2"
          style={{ fontFamily: 'var(--font-body-family)' }}
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          className="studio-input resize-none"
          aria-required="true"
        />
        {errors.message && (
          <p className="text-red-400/80 text-xs mt-1" style={{ fontFamily: 'var(--font-body-family)' }}>
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-gold-solid w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {errors.submit && (
        <p className="text-xs text-red-400 mt-3" style={{ fontFamily: 'var(--font-body-family)' }}>
          {errors.submit}
        </p>
      )}
    </form>
  );
}
