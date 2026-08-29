type Waypoint = {
  year: string;
  title: string;
  text: string;
};

export function Thread({ waypoints }: { waypoints: Waypoint[] }) {
  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Signature element: an organic, slightly hand-drawn thread connecting
          the waypoints — a visual echo of Sentria's "symbolic continuity",
          rendered as something personal rather than a corporate timeline. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-[11px] top-2 h-[calc(100%-1rem)] w-4"
        viewBox="0 0 16 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 8 0 C 4 15, 12 30, 8 45 S 4 75, 8 100"
          className="thread-path"
          stroke="#26304A"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <ol className="flex flex-col gap-14">
        {waypoints.map((wp) => (
          <li key={wp.year} className="relative pl-10">
            <span
              className="absolute left-0 top-1.5 h-6 w-6 rounded-full border border-moon/60 bg-night"
              aria-hidden="true"
            />
            <span className="mb-1 block font-mono text-xs tracking-wider text-moon">
              {wp.year}
            </span>
            <h3 className="mb-2 font-display text-xl text-ink">{wp.title}</h3>
            <p className="text-dust">{wp.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
