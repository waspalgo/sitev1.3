'use client';

import { useState, Suspense, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useKeyboard } from '@/contexts/KeyboardContext';
import GlassCard from '@/components/GlassCard';
import StepIndicator from '@/components/StepIndicator';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  country: string;
  capital: string;
  tradingLevel: string;
  expectations: string;
  riskAcknowledged: boolean;
  infoAccurate: boolean;
  newsletterConsent: boolean;
  preferredDays: string[];
  timeSlots: string[];
  contactPreference: 'call' | 'documentation' | '';
}

function AccesProPageContent() {
  const { t, language } = useLanguage();
  const { isKeyboardOpen } = useKeyboard();

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    country: '',
    capital: '',
    tradingLevel: '',
    expectations: '',
    riskAcknowledged: false,
    infoAccurate: false,
    newsletterConsent: false,
    preferredDays: [],
    timeSlots: [],
    contactPreference: 'call',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleMultiSelect = (name: string, value: string) => {
    setFormData((prev) => {
      const current = (prev[name as keyof FormData] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [name]: updated };
    });
  };

  const validateStep = (currentStep: number): { isValid: boolean; errors: Record<string, string> } => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 0) {
      if (!formData.firstName) newErrors.firstName = t('access.errors.firstName');
      if (!formData.lastName) newErrors.lastName = t('access.errors.lastName');
      if (!formData.email) {
        newErrors.email = t('access.errors.email');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('access.errors.emailInvalid');
      }
      if (!formData.whatsapp) newErrors.whatsapp = t('access.errors.whatsapp');
      if (!formData.country) newErrors.country = t('access.errors.country');
      if (!formData.capital) newErrors.capital = t('access.errors.capital');
      if (!formData.tradingLevel) newErrors.tradingLevel = t('access.errors.experience');
      if (!formData.riskAcknowledged) newErrors.riskAcknowledged = t('access.errors.risk');
      if (!formData.infoAccurate) newErrors.infoAccurate = t('access.errors.info');
    } else if (currentStep === 1) {
      if (formData.preferredDays.length < 2) {
        newErrors.preferredDays = t('access.errors.days');
      }
      if (formData.timeSlots.length === 0) {
        newErrors.timeSlots = t('access.errors.timeSlots');
      }
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    return { isValid, errors: newErrors };
  };

  const handleNext = () => {
    const validation = validateStep(step);
    if (validation.isValid) {
      setStep(step + 1);
      setErrors({});
    }
  };

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    
    if (isSubmitting) {
      return;
    }

    const validation = validateStep(step);
    
    if (!validation.isValid) {
      const errorKeys = Object.keys(validation.errors);
      if (errorKeys.length > 0) {
        const firstError = validation.errors[errorKeys[0]];
        setStatusMessage(firstError || 'Veuillez remplir tous les champs requis.');
        
        setTimeout(() => {
          const errorElement = document.querySelector(`[name="${errorKeys[0]}"]`);
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            (errorElement as HTMLElement).focus();
          }
        }, 100);
      } else {
        setStatusMessage('Veuillez remplir tous les champs requis correctement.');
      }
      
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    // Convertir capital pour l'API (format moins de 500, 500-1000, etc. -> less_500, 500_1000, etc.)
    const amountPlanned = formData.capital
      .replace('<', 'less_')
      .replace('>', 'more_')
      .replace('-', '_');

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      whatsapp_number: formData.whatsapp || undefined,
      country: formData.country || undefined,
      amount_planned: amountPlanned, // L'API va le convertir en capital_range
      experience_level: formData.tradingLevel || undefined,
      message: formData.expectations || undefined,
      risk_acknowledged: formData.riskAcknowledged,
      info_confirmed: formData.infoAccurate,
      newsletter_consent: formData.newsletterConsent,
      preferred_days: formData.preferredDays.join(', ') || undefined,
      time_slots: formData.timeSlots.join(', ') || undefined,
      contact_preference: formData.contactPreference || 'call',
      locale: language, // Ajouter la langue pour l'email automatique
    };

    try {
      const res = await fetch('/api/algorithme-pro-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        console.error('Erreur lors de la lecture de la réponse JSON:', jsonError);
        setStatusMessage(t('contact.form.error'));
        setIsSubmitting(false);
        return;
      }

      if (!res.ok || !data.ok) {
        setStatusMessage(data.error || t('contact.form.error'));
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setStatusMessage(t('contact.form.error'));
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitted]);

  // Faire défiler vers le haut quand on arrive à l'étape des disponibilités (step 1)
  useEffect(() => {
    if (step === 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  if (submitted) {
    return (
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <GlassCard glow className="p-6 sm:p-8 md:p-12 animate-scale-in">
            <div className="w-16 h-16 bg-positive/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-positive" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              {t('algorithmePro.form.successTitle')}
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              {t('algorithmePro.form.successMessage')}
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 hover:from-slate-500 hover:via-slate-400 hover:to-slate-300 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              {t('algorithmePro.form.backToHome')}
            </a>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-8 sm:mb-10 md:mb-12 text-center px-2 sm:px-0">
          {t('algorithmePro.form.title')}
        </h1>

        <StepIndicator
          currentStep={step + 1}
          totalSteps={2}
          labels={[t('access.step2.title'), t('access.step3.title')]}
        />

        {/* Step 0: Basic Information */}
        {step === 0 && (
          <GlassCard className="p-4 sm:p-6 md:p-8 animate-scale-in">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 text-center">
              {t('algorithmePro.form.accessTitle')}
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mb-6 sm:mb-8 text-center">
              {t('access.step2.description')}
            </p>
            <p className="mb-6 p-4 bg-gradient-to-r from-slate-600/20 via-slate-500/20 to-slate-400/20 border border-slate-400/30 rounded-xl text-sm text-text-secondary text-center">
              {t('algorithmePro.form.selectedAlgorithm')} <strong className="text-slate-300">WA-AMIR ST V1 PRO</strong>
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-secondary text-sm mb-2">{t('access.step2.firstName')}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-black/30 border rounded-xl text-text-primary focus:outline-none transition-colors ${
                      errors.firstName ? 'border-negative' : 'border-purple-accent/20 focus:border-purple-accent'
                    }`}
                    required
                  />
                  {errors.firstName && <p className="mt-1 text-negative text-xs">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-2">{t('access.step2.lastName')}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-black/30 border rounded-xl text-text-primary focus:outline-none transition-colors ${
                      errors.lastName ? 'border-negative' : 'border-purple-accent/20 focus:border-purple-accent'
                    }`}
                    required
                  />
                  {errors.lastName && <p className="mt-1 text-negative text-xs">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">{t('access.step2.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-xl text-text-primary focus:outline-none transition-colors ${
                    errors.email ? 'border-negative' : 'border-purple-accent/20 focus:border-purple-accent'
                  }`}
                  required
                />
                {errors.email && <p className="mt-1 text-negative text-xs">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">{t('access.step2.whatsapp')}</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="+41 79 123 45 67"
                  className={`w-full px-4 py-3 bg-black/30 border rounded-xl text-text-primary focus:outline-none transition-colors ${
                    errors.whatsapp ? 'border-negative' : 'border-purple-accent/20 focus:border-purple-accent'
                  }`}
                  required
                />
                {errors.whatsapp && <p className="mt-1 text-negative text-xs">{errors.whatsapp}</p>}
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">{t('access.step2.country')}</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-xl text-text-primary focus:outline-none transition-colors ${
                    errors.country ? 'border-negative' : 'border-purple-accent/20 focus:border-purple-accent'
                  }`}
                  required
                >
                  <option value="">{t('access.countries.select')}</option>
                  <option value="FR">{t('access.countries.france')}</option>
                  <option value="BE">{t('access.countries.belgium')}</option>
                  <option value="CH">{t('access.countries.switzerland')}</option>
                  <option value="CA">{t('access.countries.canada')}</option>
                  <option value="OTHER">{t('access.countries.other')}</option>
                </select>
                {errors.country && <p className="mt-1 text-negative text-xs">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">{t('access.step2.capital')}</label>
                <select
                  name="capital"
                  value={formData.capital}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-xl text-text-primary focus:outline-none transition-colors ${
                    errors.capital ? 'border-negative' : 'border-purple-accent/20 focus:border-purple-accent'
                  }`}
                  required
                >
                  <option value="">{t('access.capital.select')}</option>
                  <option value="<500">{t('access.capital.less500')}</option>
                  <option value="500-1000">{t('access.capital.500-1000')}</option>
                  <option value="1000-5000">{t('access.capital.1000-5000')}</option>
                  <option value="5000-10000">{t('access.capital.5000-10000')}</option>
                  <option value=">10000">{t('access.capital.more10000')}</option>
                </select>
                {errors.capital && <p className="mt-1 text-negative text-xs">{errors.capital}</p>}
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">{t('access.step2.experience')}</label>
                <select
                  name="tradingLevel"
                  value={formData.tradingLevel}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-xl text-text-primary focus:outline-none transition-colors ${
                    errors.tradingLevel ? 'border-negative' : 'border-purple-accent/20 focus:border-purple-accent'
                  }`}
                  required
                >
                  <option value="">{t('access.experience.select')}</option>
                  <option value="beginner">{t('access.experience.beginner')}</option>
                  <option value="intermediate">{t('access.experience.intermediate')}</option>
                  <option value="advanced">{t('access.experience.advanced')}</option>
                </select>
                {errors.tradingLevel && <p className="mt-1 text-negative text-xs">{errors.tradingLevel}</p>}
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">
                  {t('access.step2.expectations')}
                </label>
                <textarea
                  name="expectations"
                  value={formData.expectations}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/30 border border-purple-accent/20 rounded-xl text-text-primary focus:outline-none focus:border-purple-accent transition-colors resize-none"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="riskAcknowledged"
                      checked={formData.riskAcknowledged}
                      onChange={handleCheckboxChange}
                      className={`mt-1 w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] flex-shrink-0 rounded border-purple-accent/30 bg-black/30 text-purple-accent focus:ring-purple-accent ${
                        errors.riskAcknowledged ? 'border-negative' : ''
                      }`}
                      required
                    />
                    <span className="text-text-secondary text-sm">
                      {t('access.step2.riskAcknowledged')}
                    </span>
                  </label>
                  {errors.riskAcknowledged && <p className="mt-1 ml-8 text-negative text-xs">{errors.riskAcknowledged}</p>}
                </div>
                <div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="infoAccurate"
                      checked={formData.infoAccurate}
                      onChange={handleCheckboxChange}
                      className={`mt-1 w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] flex-shrink-0 rounded border-purple-accent/30 bg-black/30 text-purple-accent focus:ring-purple-accent ${
                        errors.infoAccurate ? 'border-negative' : ''
                      }`}
                      required
                    />
                    <span className="text-text-secondary text-sm">
                      {t('access.step2.infoAccurate')}
                    </span>
                  </label>
                  {errors.infoAccurate && <p className="mt-1 ml-8 text-negative text-xs">{errors.infoAccurate}</p>}
                </div>
                <div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="newsletterConsent"
                      checked={formData.newsletterConsent}
                      onChange={handleCheckboxChange}
                      className="mt-1 w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] flex-shrink-0 rounded border-purple-accent/30 bg-black/30 text-purple-accent focus:ring-purple-accent"
                    />
                    <span className="text-text-secondary text-sm">
                      {t('access.step2.newsletterConsent')}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="mt-8 w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 hover:from-slate-500 hover:via-slate-400 hover:to-slate-300 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              {t('access.continue')}
            </button>
          </GlassCard>
        )}

        {/* Step 1: Availability */}
        {step === 1 && (
          <GlassCard className="p-4 sm:p-6 md:p-8 animate-scale-in">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 text-center">{t('access.step3.title')}</h2>
            <p className="text-sm sm:text-base text-text-secondary mb-6 sm:mb-8 text-center">
              {t('access.step3.description')}
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-text-secondary text-sm mb-3">
                  {t('access.step3.preferredDays')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    t('access.days.monday'),
                    t('access.days.tuesday'),
                    t('access.days.wednesday'),
                    t('access.days.thursday'),
                    t('access.days.friday'),
                    t('access.days.saturday'),
                    t('access.days.sunday'),
                  ].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleMultiSelect('preferredDays', day)}
                      className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
                        formData.preferredDays.includes(day)
                          ? 'border-purple-accent bg-purple-accent/10 text-purple-accent'
                          : 'border-purple-accent/20 text-text-secondary hover:border-purple-accent/40'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                {errors.preferredDays && <p className="mt-2 text-negative text-sm">{errors.preferredDays}</p>}
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-3">
                  {t('access.step3.timeSlots')}
                </label>
                <div className="space-y-2">
                  {[
                    t('access.timeSlots.morning'),
                    t('access.timeSlots.afternoon'),
                    t('access.timeSlots.evening'),
                  ].map((slot) => (
                    <label key={slot} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.timeSlots.includes(slot)}
                        onChange={() => handleMultiSelect('timeSlots', slot)}
                        className="w-5 h-5 rounded border-purple-accent/30 bg-black/30 text-purple-accent focus:ring-purple-accent"
                      />
                      <span className="text-text-secondary">{slot}</span>
                    </label>
                  ))}
                </div>
                {errors.timeSlots && <p className="mt-2 text-negative text-sm">{errors.timeSlots}</p>}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setStep(step - 1);
                  setErrors({});
                }}
                className="flex-1 px-6 py-3 border-2 border-purple-accent/30 hover:border-purple-accent rounded-2xl text-purple-accent font-semibold transition-all duration-300 hover:scale-105"
              >
                {t('access.back')}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 hover:from-slate-500 hover:via-slate-400 hover:to-slate-300 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                aria-label={isSubmitting ? t('access.sending') : t('access.sendRequest')}
                aria-busy={isSubmitting}
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {isSubmitting ? t('access.sending') : t('access.sendRequest')}
              </button>
            </div>
            {statusMessage && (
              <div className={`mt-4 p-4 rounded-xl ${
                statusMessage.includes('succès') || statusMessage.includes('envoyée') || statusMessage.includes('success')
                  ? 'bg-positive/20 border border-positive/30 text-positive'
                  : 'bg-negative/20 border border-negative/30 text-negative'
              }`}>
                <p className="text-sm font-medium">{statusMessage}</p>
              </div>
            )}
          </GlassCard>
        )}
      </div>
    </div>
  );
}

export default function AccesProPage() {
  return (
    <Suspense fallback={
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-purple-accent/20 rounded-xl mb-8 w-3/4 mx-auto"></div>
            <div className="h-96 bg-black/30 rounded-2xl"></div>
          </div>
        </div>
      </div>
    }>
      <AccesProPageContent />
    </Suspense>
  );
}

