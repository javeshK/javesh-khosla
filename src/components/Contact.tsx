import { FormEvent, useState } from "react";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import { links, profile } from "../data/site";

type FormStatus = "idle" | "sending" | "success" | "error";

function isFormSubmitOk(payload: unknown, httpOk: boolean) {
  if (!httpOk || !payload || typeof payload !== "object") return false;
  const success = (payload as { success?: boolean | string }).success;
  return success === true || success === "true";
}

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "").trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    const recipient = links.email.trim();
    if (!recipient) {
      setStatus("error");
      setErrorMessage("This form is not configured yet. Please reach out on GitHub or LinkedIn.");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            _replyto: email,
            _subject: subject || `Message from ${name}`,
            message,
            _captcha: "false",
            _template: "table",
          }),
        },
      );

      const payload: unknown = await response.json().catch(() => null);
      if (!isFormSubmitOk(payload, response.ok)) {
        throw new Error("send failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("The message could not be sent. Please try again shortly.");
    }
  }

  return (
    <section id="contact" className="section contact">
      <p className="section-index">06</p>
      <div className="section-body">
        <h2>Contact</h2>
        <p className="section-lead">{profile.contactIntro}</p>
        <div className="contact-links">
          <a className="btn btn-primary" href={links.github} target="_blank" rel="noreferrer">
            <GitHubIcon />
            GitHub
          </a>
          <a className="btn btn-ghost" href={links.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon />
            LinkedIn
          </a>
          {links.email ? (
            <a className="btn btn-ghost" href={`mailto:${links.email}`}>
              Email
            </a>
          ) : null}
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <div className="contact-field sr-only" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" required disabled={status === "sending"} />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email">Your email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              disabled={status === "sending"}
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-subject">
              Subject <span className="field-optional">(optional)</span>
            </label>
            <input id="contact-subject" name="subject" type="text" autoComplete="off" disabled={status === "sending"} />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              disabled={status === "sending"}
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          <div className="contact-status" role="status" aria-live="polite">
            {status === "success" ? <p>Message sent. Thank you — I’ll get back to you.</p> : null}
            {status === "error" ? <p className="contact-error">{errorMessage}</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}
