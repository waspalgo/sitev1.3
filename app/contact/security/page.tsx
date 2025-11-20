'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import GlassCard from '@/components/GlassCard';
import ScrollReveal from '@/components/ScrollReveal';
import BackgroundLights from '@/components/BackgroundLights';
import PrimaryButton from '@/components/PrimaryButton';
import Link from 'next/link';
import { useState } from 'react';

export default function SecurityContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const payload = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const res = await fetch('/api/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

<<<<<<< HEAD
      if (!res.ok || !data.ok) {
=======
      if (!res.ok) {
>>>>>>> 82a9afff82211ec552c4e205dc33ff711accf459
        console.error('Erreur API /api/security:', data);
        setStatusMessage(data.error || t('contact.form.error'));
        return;
      }

      setStatusMessage(t('contact.form.success'));
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setStatusMessage(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
      <BackgroundLights 
        variant="default" 
        uniqueId="contact-security"
        positions={{
          orb1: { top: '25%', left: '25%' },
          orb2: { bottom: '25%', right: '25%' },
          orb3: { top: '50%', right: '40%' },
        }}
        sizes={{ orb1: 450, orb2: 380, orb3: 320 }}
      />

      <section className="section-padding px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-purple-accent hover:text-purple-secondary transition-colors mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('contact.security.button')}
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {t('contact.security.title')}
            </h1>
            <p className="text-text-muted mb-8">
              {t('contact.security.description')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <GlassCard variant="feature">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-purple-accent/20 text-text-primary placeholder-text-muted focus:outline-none focus:border-purple-accent/50 transition-colors"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-purple-accent/20 text-text-primary placeholder-text-muted focus:outline-none focus:border-purple-accent/50 transition-colors"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-purple-accent/20 text-text-primary placeholder-text-muted focus:outline-none focus:border-purple-accent/50 transition-colors"
                    placeholder={t('contact.form.subjectPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-purple-accent/20 text-text-primary placeholder-text-muted focus:outline-none focus:border-purple-accent/50 transition-colors resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>

                <div className="flex gap-4">
                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    {t('contact.form.send')}
                  </PrimaryButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-purple-accent/30 hover:border-purple-accent/50 hover:bg-purple-primary/20 transition-all duration-300 text-purple-accent font-medium"
                  >
                    {t('contact.form.cancel')}
                  </Link>
                </div>
                {statusMessage && (
                  <p className="mt-4 text-sm text-text-secondary">
                    {statusMessage}
                  </p>
                )}
              </form>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}


