import { useState, useRef, useEffect } from 'react';
import { Check, Loader2, AlertCircle, ArrowUp } from 'lucide-react';
import type { PortfolioContent, Language } from '../data/content';
import { FadeUp } from '../components/ScrollAnimations';
import { scrollToLenis } from '../hooks/useLenis';

interface ContactProps {
  content: PortfolioContent;
  lang?: Language;
}

export function Contact({ content }: ContactProps) {
  const { contact } = content;
  const formContent = contact.form;

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Status & Validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallbackNote, setFallbackNote] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    } = {};

    if (!name.trim()) newErrors.name = formContent.nameError;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) newErrors.email = formContent.emailError;

    if (!subject.trim()) newErrors.subject = formContent.subjectError;

    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = formContent.messageError;
    }

    setErrors(newErrors);

    if (newErrors.name) nameInputRef.current?.focus();
    else if (newErrors.email) emailInputRef.current?.focus();
    else if (newErrors.subject) subjectInputRef.current?.focus();
    else if (newErrors.message) messageInputRef.current?.focus();

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);
    setFallbackNote(null);

    if (!validate()) return;

    const formData = new FormData(e.currentTarget);
    const isBot = Boolean(formData.get('botcheck'));
    if (isBot) {
      setIsSuccess(true);
      setResendCooldown(30);
      return;
    }

    const apiKey =
      import.meta.env.VITE_WEB3FORMS_KEY ||
      (typeof window !== 'undefined' ? (window as any).__TEST_WEB3FORMS_KEY__ : undefined);

    if (!apiKey) {
      setFallbackNote(formContent.fallbackNotice);
      const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
        `[Portfolio] ${subject}`
      )}&body=${encodeURIComponent(
        `From: ${name} (${email})\n\nMessage:\n${message}`
      )}`;
      window.open(mailtoUrl, '_blank');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: apiKey,
          subject: `[Portfolio] ${subject}`,
          from_name: name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success || data.status === 'success')) {
        setIsSuccess(true);
        setResendCooldown(30);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setApiError(data.message || formContent.errorMessage);
      }
    } catch {
      setApiError(formContent.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    if (resendCooldown > 0) return;
    setIsSuccess(false);
    setApiError(null);
    setFallbackNote(null);
    setErrors({});
  };

  const handleBackToTop = () => {
    scrollToLenis('#hero', 0);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#050505] text-[#FAFAFA] pt-16 pb-12 md:pt-24 md:pb-16 scroll-mt-16"
    >
      <div className="site-container">
        {/* Centered Header + 2 Status Pills */}
        <FadeUp className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-[30px] sm:text-[40px] md:text-[48px] font-bold tracking-[-0.03em] leading-[1.08] text-white">
            {contact.headline}
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] text-[#737373] leading-relaxed max-w-xl mx-auto">
            {contact.subheading}
          </p>

          {/* Status Badge: Available for Work */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-[13px] font-medium text-neutral-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#259B52] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#259B52]" />
              </span>
              <span>{contact.availablePill}</span>
            </div>
          </div>
        </FadeUp>

        {/* Centered Dark Web3Forms Contact Card */}
        <FadeUp delay={0.08}>
          <div className="max-w-2xl mx-auto bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-6 md:p-8 text-left">
            {isSuccess ? (
              <div
                aria-live="polite"
                className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#259B52]/15 text-[#4ADE80] border border-[#259B52]/30 flex items-center justify-center">
                  <Check size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-[22px] font-bold text-white tracking-tight">
                  {formContent.successTitle}
                </h3>
                <p className="text-[14.5px] text-neutral-400 max-w-md leading-relaxed">
                  {formContent.successMessage}
                </p>
                <button
                  type="button"
                  disabled={resendCooldown > 0}
                  onClick={handleResetForm}
                  className="mt-2 min-h-[44px] px-6 rounded-lg bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  {resendCooldown > 0
                    ? `${formContent.sendAnotherButton} (${resendCooldown}s)`
                    : formContent.sendAnotherButton}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Hidden Honeypot */}
                <input
                  type="checkbox"
                  name="botcheck"
                  value="1"
                  className="hidden"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {fallbackNote && (
                  <div
                    aria-live="polite"
                    className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2"
                  >
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{fallbackNote}</span>
                  </div>
                )}

                {apiError && (
                  <div
                    aria-live="polite"
                    className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle size={15} className="shrink-0 text-red-400" />
                      <span>{apiError}</span>
                    </div>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-semibold underline text-white shrink-0"
                    >
                      {formContent.emailDirectly}
                    </a>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[13px] font-medium text-neutral-300 mb-1.5"
                    >
                      {formContent.nameLabel} <span className="text-[#259B52]">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder={formContent.namePlaceholder}
                      className={`w-full h-12 px-3.5 rounded-lg bg-neutral-900 border ${
                        errors.name ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-600'
                      } text-[15px] text-white placeholder:text-neutral-500 focus:outline-hidden transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-[12px] text-red-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[13px] font-medium text-neutral-300 mb-1.5"
                    >
                      {formContent.emailLabel} <span className="text-[#259B52]">*</span>
                    </label>
                    <input
                      ref={emailInputRef}
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder={formContent.emailPlaceholder}
                      className={`w-full h-12 px-3.5 rounded-lg bg-neutral-900 border ${
                        errors.email ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-600'
                      } text-[15px] text-white placeholder:text-neutral-500 focus:outline-hidden transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-[12px] text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-[13px] font-medium text-neutral-300 mb-1.5"
                  >
                    {formContent.subjectLabel} <span className="text-[#259B52]">*</span>
                  </label>
                  <input
                    ref={subjectInputRef}
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                    }}
                    placeholder={formContent.subjectPlaceholder}
                    className={`w-full h-12 px-3.5 rounded-lg bg-neutral-900 border ${
                      errors.subject ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-600'
                    } text-[15px] text-white placeholder:text-neutral-500 focus:outline-hidden transition-colors`}
                  />
                  {errors.subject && (
                    <p className="text-[12px] text-red-400 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[13px] font-medium text-neutral-300 mb-1.5"
                  >
                    {formContent.messageLabel} <span className="text-[#259B52]">*</span>
                  </label>
                  <textarea
                    ref={messageInputRef}
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder={formContent.messagePlaceholder}
                    className={`w-full p-3.5 rounded-lg bg-neutral-900 border ${
                      errors.message ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-600'
                    } text-[15px] text-white placeholder:text-neutral-500 focus:outline-hidden transition-colors resize-y min-h-[112px]`}
                  />
                  {errors.message && (
                    <p className="text-[12px] text-red-400 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Full-Width Emerald Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 min-h-[48px] rounded-lg bg-[#259B52] hover:bg-[#1F8244] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      <span>{formContent.sendingButton}</span>
                    </>
                  ) : (
                    <span>{formContent.sendButton}</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </FadeUp>

        {/* Minimalist Footer */}
        <footer className="mt-14 md:mt-16">
          {/* Center: Connect On + 3 Monochrome Icons (WA icon only, NO phone number text) */}
          <div className="flex flex-col items-center justify-center gap-3.5">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
              {contact.connectLabel}
            </span>
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href={contact.socials.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={contact.socials.whatsapp.label}
                title={contact.socials.whatsapp.label}
                className="w-11 h-11 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 hover:text-white text-neutral-400 flex items-center justify-center transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.031 2c-5.508 0-9.984 4.477-9.984 9.984 0 1.761.458 3.479 1.332 4.996L2 22l5.163-1.353c1.464.798 3.119 1.218 4.868 1.218 5.508 0 9.984-4.477 9.984-9.984 0-5.507-4.476-9.984-9.984-9.984zm0 18.257c-1.517 0-3.003-.408-4.306-1.182l-.309-.184-3.203.84.855-3.123-.203-.323c-.848-1.35-1.296-2.915-1.296-4.485 0-4.551 3.704-8.255 8.256-8.255 4.552 0 8.256 3.704 8.256 8.255 0 4.551-3.704 8.257-8.256 8.257zm4.526-6.183c-.248-.124-1.467-.724-1.694-.807-.228-.083-.393-.124-.559.124-.165.249-.641.807-.786.972-.145.166-.29.187-.538.062-.249-.124-1.049-.387-1.998-1.233-.738-.658-1.237-1.472-1.382-1.72-.145-.248-.016-.383.109-.506.112-.111.249-.29.373-.435.124-.145.166-.248.249-.414.083-.166.041-.311-.021-.435-.062-.124-.559-1.347-.766-1.846-.201-.486-.406-.419-.559-.427l-.476-.008c-.166 0-.435.062-.663.311-.228.249-.87 0.85-.87 2.073 0 1.223.891 2.404 1.015 2.57.124.166 1.752 2.675 4.246 3.751.593.256 1.057.41 1.418.524.596.19 1.138.163 1.567.099.478-.072 1.467-.6 1.674-1.18.207-.58.207-1.077.145-1.18-.062-.104-.228-.166-.476-.29z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={contact.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={contact.socials.linkedin.label}
                title={contact.socials.linkedin.label}
                className="w-11 h-11 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 hover:text-white text-neutral-400 flex items-center justify-center transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.3a1.5 1.5 0 0 0-1.5 1.5c0 .83.67 1.5 1.5 1.5a1.5 1.5 0 0 0 1.5-1.5c0-.83-.67-1.5-1.5-1.5z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={contact.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={contact.socials.github.label}
                title={contact.socials.github.label}
                className="w-11 h-11 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 hover:text-white text-neutral-400 flex items-center justify-center transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Bar: Back to Top (Left) + Copyright & Email (Center/Right) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-900 pt-6 mt-10 text-[12.5px] sm:text-[13px] text-neutral-500">
            <button
              type="button"
              onClick={handleBackToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp size={13} />
              <span>{contact.backToTop}</span>
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-right">
              <span>{contact.footerCopy}</span>
              <span className="hidden sm:inline text-neutral-700">·</span>
              <a
                href={`mailto:${contact.email}`}
                className="text-neutral-300 hover:text-white transition-colors"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
