"use client";

import { useEffect, useRef, useState } from "react";

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
  const [isTruncated, setIsTruncated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = quoteRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    }
  }, [index]);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  function prev() {
    setModalOpen(false);
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  }

  function next() {
    setModalOpen(false);
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="max-w-xl">
      <div className="flex h-72 flex-col justify-between">
        <div className="flex gap-4 border-l border-night-line pl-5">
          {current.frontmatter.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current.frontmatter.image}
              alt={current.frontmatter.name}
              className="h-14 w-14 shrink-0 rounded-full object-cover"
            />
          )}
          <div className="min-w-0">
            <p ref={quoteRef} className="mb-2 line-clamp-5 italic text-dust">
              &ldquo;{current.frontmatter.quote}&rdquo;
            </p>
            {isTruncated && (
              <button
                onClick={() => setModalOpen(true)}
                className="mb-2 block font-mono text-xs text-moon hover:underline"
              >
                Preberi več →
              </button>
            )}
            <span className="font-mono text-xs text-moon">
              {current.frontmatter.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
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

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/90 p-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="max-w-lg border border-night-line bg-night-panel p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-6 italic text-ink">
              &ldquo;{current.frontmatter.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-moon">
                {current.frontmatter.name}
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="font-mono text-xs text-dust hover:text-moon"
              >
                Zapri ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
