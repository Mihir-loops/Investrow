import { useState } from "react";
import type { FormEvent } from "react";
import { company } from "../data/site";
import { Icon } from "./Icon";

type Fields = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Fields, string>>;

const initial: Fields = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
};

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "composed">("idle");

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus("idle");
  };

  const validate = () => {
    const next: Errors = {};
    if (fields.name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    const digits = fields.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      next.phone = "Enter a phone number with 10–15 digits.";
    }
    if (fields.subject.trim().length < 3) {
      next.subject = "Please add a short subject.";
    }
    if (fields.message.trim().length < 10) {
      next.message = "Please tell us a little more (at least 10 characters).";
    }
    if (!fields.consent) {
      next.consent = "Please confirm before continuing.";
    }
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    const body = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone}`,
      "",
      fields.message,
      "",
      "— Sent from the Investrow website contact form (demo).",
    ].join("\n");

    const mailto = `mailto:${company.email}?subject=${encodeURIComponent(
      fields.subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus("composed");
    window.location.href = mailto;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__notice">
        <Icon name="info" size={18} />
        <p>
          <strong>This form is a front-end demo.</strong> It does not send or
          store your details on a server. Submitting opens your email app with
          the message prefilled, so you can review it before sending. Please do
          not include passwords, OTPs, PAN or account numbers.
        </p>
      </div>

      {status === "composed" && (
        <div className="form-status form-status--success" role="status">
          <Icon name="circleCheck" size={20} />
          <div>
            <strong>Your email app should open now.</strong>
            <p>
              Nothing has been sent automatically. If your email app did not
              open, write to{" "}
              <a href={`mailto:${company.email}`}>{company.email}</a> or call{" "}
              <a href="tel:+919102050555">{company.phones[0]}</a>.
            </p>
          </div>
        </div>
      )}

      <div className="form-grid">
        <div className={`form-field ${errors.name ? "has-error" : ""}`}>
          <label htmlFor="contact-name">Full name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "error-name" : undefined}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
          />
          {errors.name && <p className="form-error" id="error-name">{errors.name}</p>}
        </div>

        <div className={`form-field ${errors.email ? "has-error" : ""}`}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
          />
          {errors.email && <p className="form-error" id="error-email">{errors.email}</p>}
        </div>

        <div className={`form-field ${errors.phone ? "has-error" : ""}`}>
          <label htmlFor="contact-phone">Phone</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "error-phone" : undefined}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+91 00000 00000"
          />
          {errors.phone && <p className="form-error" id="error-phone">{errors.phone}</p>}
        </div>

        <div className={`form-field ${errors.subject ? "has-error" : ""}`}>
          <label htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={fields.subject}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "error-subject" : undefined}
            onChange={(event) => update("subject", event.target.value)}
            placeholder="What would you like to discuss?"
          />
          {errors.subject && <p className="form-error" id="error-subject">{errors.subject}</p>}
        </div>

        <div className={`form-field form-field--full ${errors.message ? "has-error" : ""}`}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={fields.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : undefined}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Tell us about the goal or question you have in mind."
          />
          {errors.message && <p className="form-error" id="error-message">{errors.message}</p>}
        </div>
      </div>

      <div className={`form-consent ${errors.consent ? "has-error" : ""}`}>
        <label htmlFor="contact-consent">
          <input
            id="contact-consent"
            type="checkbox"
            checked={fields.consent}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "error-consent" : undefined}
            onChange={(event) => update("consent", event.target.checked)}
          />
          <span>
            I understand this opens my email app and that Investrow will receive
            the message only if I choose to send it.
          </span>
        </label>
        {errors.consent && <p className="form-error" id="error-consent">{errors.consent}</p>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn--primary">
          <span>Compose email</span>
          <Icon name="arrowUpRight" size={17} />
        </button>
        <p>We will never ask you for your password or OTP.</p>
      </div>
    </form>
  );
}
