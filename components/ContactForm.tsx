"use client";

import { useState } from "react";
import type { Lang } from "@/lib/content";

const COPY: Record<
  Lang,
  {
    title: string;
    topicLabel: string;
    topicProduct: string;
    topicProgram: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    note: string;
  }
> = {
  sl: {
    title: "Kontakt",
    topicLabel: "Glede česa pišeš?",
    topicProduct: "Vprašanje o izdelkih",
    topicProgram: "Zanima me Inkubator / svetovanje",
    name: "Ime",
    email: "E-pošta",
    message: "Sporočilo",
    submit: "Pošlji",
    note: "Obrazec trenutno pošilja neposredno na e-pošto — CMS/mailing lista integracija sledi.",
  },
  en: {
    title: "Contact",
    topicLabel: "What is this about?",
    topicProduct: "Product question",
    topicProgram: "Interested in the Incubator / consulting",
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send",
    note: "This form currently opens your email client — full integration follows once the mailing list is reconnected.",
  },
};

export function ContactForm({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const [topic, setTopic] = useState<"product" | "program">("product");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[${topic === "product" ? copy.topicProduct : copy.topicProgram}] ${name}`
    );
    const body = encodeURIComponent(`${message}\n\n${copy.email}: ${email}`);
    // TODO: zamenjaj s pravim naslovom, ko je infrastruktura postavljena.
    window.location.href = `mailto:info@dream-explorer.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-5">
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 font-mono text-xs uppercase tracking-wider text-moon">
          {copy.topicLabel}
        </legend>
        <label className="flex items-center gap-2 text-dust">
          <input
            type="radio"
            name="topic"
            checked={topic === "product"}
            onChange={() => setTopic("product")}
          />
          {copy.topicProduct}
        </label>
        <label className="flex items-center gap-2 text-dust">
          <input
            type="radio"
            name="topic"
            checked={topic === "program"}
            onChange={() => setTopic("program")}
          />
          {copy.topicProgram}
        </label>
      </fieldset>

      <label className="flex flex-col gap-1 text-sm text-dust">
        {copy.name}
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-night-line bg-night-panel px-3 py-2 text-ink"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-dust">
        {copy.email}
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-night-line bg-night-panel px-3 py-2 text-ink"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-dust">
        {copy.message}
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-night-line bg-night-panel px-3 py-2 text-ink"
        />
      </label>

      <button
        type="submit"
        className="border border-moon/60 px-6 py-3 font-mono text-sm uppercase tracking-wider text-moon transition-colors hover:bg-moon hover:text-night"
      >
        {copy.submit}
      </button>

      <p className="text-xs text-dust">{copy.note}</p>
    </form>
  );
}
