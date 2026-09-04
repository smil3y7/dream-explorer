"use client";

import { useState } from "react";

type Testimonial = {
  slug: string;
  frontmatter: any;
};

export function TestimonialSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) return null;

  function prev() {
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="max-w-xl">
      <div className="grid">
        {testimonials.map((t, i) => (
          <div
            key={t.slug}
            aria-hidden={i !== index}
            className={`col-start-1 row-start-1 flex gap-4 border-l border-night-line pl-5 transition-opacity ${
              i === index ? "opacity-100" : "invisible opacity-0"
            }`}
          >
            {t.frontmatter.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={t.frontmatter.image}
                alt={t.frontmatter.name}
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
            )}
            <div>
              <p className="mb-3 italic text-dust">
                &ldquo;{t.frontmatter.quote}&rdquo;
              </p>
              <span className="font-mono text-xs text-moon">
                {t.frontmatter.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={prev}
          aria-label="Prejšnji"
          className="flex h-8 w-8 items-center justify-center border border-night-line text-dust transition-colors hover:border-moon/60 hover:text-moon"
        >
          ←
        </button>
        <span className="font-mono text-xs text-dust">
          {index + 1} / {testimonials.length}
        </span>
        <button
          onClick={next}
          aria-label="Naslednji"
          className="flex h-8 w-8 items-center justify-center border border-night-line text-dust transition-colors hover:border-moon/60 hover:text-moon"
        >
          →
        </button>
      </div>
    </div>
  );
}
