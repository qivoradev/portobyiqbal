import { useState, useCallback, useRef, useEffect } from 'react';
import { Check, Copy, Send, Loader2, AlertCircle } from 'lucide-react';
import type { PortfolioContent, Language } from '../data/content';
import { FadeUp } from '../components/ScrollAnimations';

interface ContactProps {
  content: PortfolioContent;
  lang?: Language;
}

export function Contact({ content, lang: _lang = 'in' }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const { contact } = content;
  const formContent = contact.form;

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Status and Validation
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

  // 30s resend timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = contact.email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [contact.email]);

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = formContent.nameError;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = formContent.emailError;
    }

    if (!subject.trim()) {
      newErrors.subject = formContent.subjectError;
    }

    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = formContent.messageError;
    }

    setErrors(newErrors);

    // Focus first invalid field
    if (newErrors.name) {
      nameInputRef.current?.focus();
    } else if (newErrors.email) {
      emailInputRef.current?.focus();
    } else if (newErrors.subject) {
      subjectInputRef.current?.focus();
    } else if (newErrors.message) {
      messageInputRef.current?.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);
    setFallbackNote(null);

    if (!validate()) return;

    const formData = new FormData(e.currentTarget);
    const isBot = Boolean(formData.get('botcheck'));

    // Honeypot check: if bot filled botcheck, pretend it succeeded
    if (isBot) {
      setIsSuccess(true);
      setResendCooldown(30);
      return;
    }

    const apiKey =
      import.meta.env.VITE_WEB3FORMS_KEY ||
      (typeof window !== 'undefined' ? (window as any).__TEST_WEB3FORMS_KEY__ : undefined);

    // If key not configured, fallback to mailto
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
          email: email,
          message: message,
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

  return (
    <section
      id="contact"
      className="relative w-full py-12 sm:py-16 lg:py-20 pb-28 sm:pb-24 scroll-mt-[88px]"
    >
      <div className="site-container">
        {/* Large Tactile 2-Column Bento Card */}
        <FadeUp>
          <div className="bg-white rounded-[28px] lg:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-black/8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.02)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column (Desktop Span 5): Eyebrow → Headline → Sentence → Email Pill → Social Icons */}
              <div className="lg:col-span-5 flex flex-col text-left">
                {/* Eyebrow INSIDE card */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#EF4444] shadow-xs shrink-0" />
                  <span className="text-[12.5px] font-semibold tracking-[0.08em] text-[#6b6b6b] uppercase">
                    {contact.sectionLabel}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-bold text-[#111111] leading-[1.1] tracking-[-0.035em] mb-3">
                  {contact.heading}
                </h2>

                {/* Short sentence */}
                <p className="text-[14.5px] sm:text-[15.5px] text-[#555555] leading-relaxed mb-6">
                  {contact.subheading}
                </p>

                {/* Email Pill with Copy button */}
                <div className="w-full flex items-center justify-between p-1.5 pl-4 sm:pl-5 rounded-full bg-[#F4F4F4] border border-black/10 shadow-inner mb-6">
                  <span className="text-[13px] sm:text-[14px] font-medium text-black truncate select-all pr-2 text-left">
                    {contact.email}
                  </span>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="shrink-0 flex items-center justify-center gap-1.5 px-4 h-10 min-h-[40px] rounded-full bg-[#111111] text-white text-[12.5px] font-medium shadow-xs hover:bg-black/85 active:scale-95 transition-all cursor-pointer"
                    aria-label={copied ? contact.copiedButton : contact.copyButton}
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-[#10B981] shrink-0" />
                        <span className="hidden xs:inline">{contact.copiedButton}</span>
                        <span className="xs:hidden">✓</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="shrink-0" />
                        <span className="hidden xs:inline">{contact.copyButton}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 3 Round 48px Icon Buttons: WhatsApp, LinkedIn, GitHub (No Phone Number text/label) */}
                <div className="flex items-center gap-3">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/6285726168917"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                    className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center bg-white border border-black/15 shadow-xs hover:border-black/35 hover:bg-[#F9F9F9] active:scale-95 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 2c-5.508 0-9.984 4.477-9.984 9.984 0 1.761.458 3.479 1.332 4.996L2 22l5.163-1.353c1.464.798 3.119 1.218 4.868 1.218 5.508 0 9.984-4.477 9.984-9.984 0-5.507-4.476-9.984-9.984-9.984zm0 18.257c-1.517 0-3.003-.408-4.306-1.182l-.309-.184-3.203.84.855-3.123-.203-.323c-.848-1.35-1.296-2.915-1.296-4.485 0-4.551 3.704-8.255 8.256-8.255 4.552 0 8.256 3.704 8.256 8.255 0 4.551-3.704 8.257-8.256 8.257zm4.526-6.183c-.248-.124-1.467-.724-1.694-.807-.228-.083-.393-.124-.559.124-.165.249-.641.807-.786.972-.145.166-.29.187-.538.062-.249-.124-1.049-.387-1.998-1.233-.738-.658-1.237-1.472-1.382-1.72-.145-.248-.016-.383.109-.506.112-.111.249-.29.373-.435.124-.145.166-.248.249-.414.083-.166.041-.311-.021-.435-.062-.124-.559-1.347-.766-1.846-.201-.486-.406-.419-.559-.427l-.476-.008c-.166 0-.435.062-.663.311-.228.249-.87 0.85-.87 2.073 0 1.223.891 2.404 1.015 2.57.124.166 1.752 2.675 4.246 3.751.593.256 1.057.41 1.418.524.596.19 1.138.163 1.567.099.478-.072 1.467-.6 1.674-1.18.207-.58.207-1.077.145-1.18-.062-.104-.228-.166-.476-.29z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/iqbal-dwi-fathonah-56ba2a3b0"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center bg-white border border-black/15 shadow-xs hover:border-black/35 hover:bg-[#F9F9F9] active:scale-95 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.3a1.5 1.5 0 0 0-1.5 1.5c0 .83.67 1.5 1.5 1.5a1.5 1.5 0 0 0 1.5-1.5c0-.83-.67-1.5-1.5-1.5z" />
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/qivoradev"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                    className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center bg-white border border-black/15 shadow-xs hover:border-black/35 hover:bg-[#F9F9F9] active:scale-95 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#24292F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Column (Desktop Span 7): Message Form or Success Confirmation */}
              <div className="lg:col-span-7 w-full text-left">
                {isSuccess ? (
                  /* Success Confirmation Card */
                  <div
                    aria-live="polite"
                    className="p-8 sm:p-10 rounded-[24px] bg-[#FAFAFA] border border-black/10 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shadow-xs">
                      <Check size={28} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-[22px] sm:text-[24px] font-bold text-[#111111] tracking-tight">
                      {formContent.successTitle}
                    </h3>
                    <p className="text-[14.5px] sm:text-[15.5px] text-[#555555] max-w-[420px] leading-relaxed">
                      {formContent.successMessage}
                    </p>
                    <button
                      type="button"
                      disabled={resendCooldown > 0}
                      onClick={handleResetForm}
                      className="mt-2 min-h-[44px] px-6 rounded-full bg-[#111111] text-white text-[13.5px] font-medium hover:bg-black/85 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                    >
                      {resendCooldown > 0
                        ? `${formContent.sendAnotherButton} (${resendCooldown}s)`
                        : formContent.sendAnotherButton}
                    </button>
                  </div>
                ) : (
                  /* Contact Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-4.5">
                    {/* Honeypot field (hidden from genuine users) */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      value="1"
                      className="hidden"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Fallback Notice */}
                    {fallbackNote && (
                      <div className="p-3 rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[13px] flex items-center gap-2">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>{fallbackNote}</span>
                      </div>
                    )}

                    {/* API Error Message */}
                    {apiError && (
                      <div className="p-3.5 rounded-xl bg-[#FEE2E2] border border-[#EF4444]/30 text-[#991B1B] text-[13px] flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle size={16} className="shrink-0 text-[#EF4444]" />
                          <span>{apiError}</span>
                        </div>
                        <a
                          href={`mailto:${contact.email}`}
                          className="font-semibold underline shrink-0 hover:text-black"
                        >
                          {formContent.emailDirectly}
                        </a>
                      </div>
                    )}

                    {/* Name & Email side-by-side on desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-[13px] font-semibold text-[#333333] mb-1.5"
                        >
                          {formContent.nameLabel} <span className="text-[#EF4444]">*</span>
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
                          className={`w-full h-12 min-h-[48px] px-3.5 rounded-xl bg-[#FAFAFA] border ${
                            errors.name ? 'border-[#EF4444]' : 'border-black/15'
                          } text-[16px] text-[#111111] placeholder:text-[#888888] focus:bg-white focus:border-black focus:outline-hidden focus:ring-1 focus:ring-black transition-all`}
                        />
                        {errors.name && (
                          <p className="text-[12px] text-[#EF4444] mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-[13px] font-semibold text-[#333333] mb-1.5"
                        >
                          {formContent.emailLabel} <span className="text-[#EF4444]">*</span>
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
                          className={`w-full h-12 min-h-[48px] px-3.5 rounded-xl bg-[#FAFAFA] border ${
                            errors.email ? 'border-[#EF4444]' : 'border-black/15'
                          } text-[16px] text-[#111111] placeholder:text-[#888888] focus:bg-white focus:border-black focus:outline-hidden focus:ring-1 focus:ring-black transition-all`}
                        />
                        {errors.email && (
                          <p className="text-[12px] text-[#EF4444] mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-[13px] font-semibold text-[#333333] mb-1.5"
                      >
                        {formContent.subjectLabel} <span className="text-[#EF4444]">*</span>
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
                        className={`w-full h-12 min-h-[48px] px-3.5 rounded-xl bg-[#FAFAFA] border ${
                          errors.subject ? 'border-[#EF4444]' : 'border-black/15'
                        } text-[16px] text-[#111111] placeholder:text-[#888888] focus:bg-white focus:border-black focus:outline-hidden focus:ring-1 focus:ring-black transition-all`}
                      />
                      {errors.subject && (
                        <p className="text-[12px] text-[#EF4444] mt-1">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-[13px] font-semibold text-[#333333] mb-1.5"
                      >
                        {formContent.messageLabel} <span className="text-[#EF4444]">*</span>
                      </label>
                      <textarea
                        ref={messageInputRef}
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                        }}
                        placeholder={formContent.messagePlaceholder}
                        className={`w-full p-3.5 rounded-xl bg-[#FAFAFA] border ${
                          errors.message ? 'border-[#EF4444]' : 'border-black/15'
                        } text-[16px] text-[#111111] placeholder:text-[#888888] focus:bg-white focus:border-black focus:outline-hidden focus:ring-1 focus:ring-black transition-all resize-y min-h-[120px]`}
                      />
                      {errors.message && (
                        <p className="text-[12px] text-[#EF4444] mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-[52px] min-h-[52px] rounded-full bg-[#111111] text-white text-[14.5px] sm:text-[15px] font-semibold hover:bg-black/85 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin text-white" />
                          <span>{formContent.sendingButton}</span>
                        </>
                      ) : (
                        <>
                          <span>{formContent.sendButton}</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Minimal Footer */}
        <footer className="mt-12 sm:mt-14 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] sm:text-[13px] text-[#777777]">
          <div>{contact.footerCopy}</div>
          <div>{contact.footerLocation}</div>
        </footer>
      </div>
    </section>
  );
}
