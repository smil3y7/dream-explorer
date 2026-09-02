// Neopazen indikator trenutne verzije, koristen med testiranjem, da veš,
// ali gledaš najnovejši deploy ali staro predpomnjeno stran v brskalniku.
// VERCEL_GIT_COMMIT_SHA je samodejno na voljo na Vercelu med gradnjo,
// ni ga treba ročno nastavljati. Lokalno (kjer te spremenljivke ni) se
// prikaže "local".
//
// Ko stran zaključiš in tega ne rabiš več: odstrani <BuildInfo /> iz
// Footer.tsx in izbriši to datoteko - to je vse, ni drugih odvisnosti.

const BUILD_TIME = new Date().toISOString().slice(0, 16).replace("T", " ");

export function BuildInfo() {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local";
  return (
    <p className="mt-4 text-center font-mono text-[10px] text-night-line">
      build {commit} · {BUILD_TIME}
    </p>
  );
}
