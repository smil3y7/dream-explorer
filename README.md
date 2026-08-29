# Dream eXplorer — nova stran

Statična Next.js stran z Decap CMS urejevalnikom, i18n (SL/EN, lokalizirani meniji),
in content modelom, pripravljenim za enostavno dodajanje člankov, izdelkov in
testimonialov brez razvojnega posega.

Trenutno vsebuje: Origin story (SL+EN) in About (skupna vsebina). Vodnik, Blog,
Trgovina in Programi so pripravljeni v content modelu in CMS konfiguraciji, a še
brez migrirane vsebine — glej `dream-explorer-nacrt-prenove.md` za popoln popis.

## 1. Lokalni zagon (preverjanje, da vse deluje)

```bash
npm install
npm run dev
```

Odpri http://localhost:3000 — preusmeri te na `/sl`.

## 2. Postavitev na GitHub

```bash
git init
git add .
git commit -m "Začetni temelj: origin story + about + CMS"
git remote add origin https://github.com/TVOJE-UPORABNISKO-IME/dream-explorer-site.git
git push -u origin main
```

## 3. Poveži z Vercelom

1. Na [vercel.com](https://vercel.com) → "Add New Project" → izberi ta repozitorij.
2. Framework Preset: Next.js (zazna samodejno).
3. Deploy — dobiš začasno `*.vercel.app` domeno, kasneje dodaš pravo domeno v
   Project Settings → Domains.

## 4. GitHub OAuth App (za prijavo v CMS)

1. GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**.
2. Homepage URL: `https://tvoja-domena.com`
3. Authorization callback URL: `https://tvoja-domena.com/api/auth/callback`
4. Ustvari aplikacijo → dobiš **Client ID** in (klikni "Generate a new client secret") **Client Secret**.

## 5. Okoljske spremenljivke v Vercelu

Project Settings → Environment Variables, dodaj:

| Ime | Vrednost |
|---|---|
| `GITHUB_CLIENT_ID` | iz koraka 4 |
| `GITHUB_CLIENT_SECRET` | iz koraka 4 |

Po dodajanju spremenljivk ponovno požene deploy (Redeploy), da jih Vercel prevzame.

## 6. Popravi config.yml

V `public/admin/config.yml` zamenjaj:
- `repo:` → dejansko ime tvojega repozitorija (`uporabnik/dream-explorer-site`)
- `base_url:` → dejanska domena, ko je nastavljena

## 7. Prijava v CMS

Obišči `https://tvoja-domena.com/admin` → "Login with GitHub" → potrdiš dostop →
znajdeš se v urejevalniku z vsemi collections (Origin Story, About, Vodnik, Blog,
Trgovina, Testimonials).

## Kaj (še) manjka za popolno migracijo

Glej razdelek 11 v `dream-explorer-nacrt-prenove.md`:
- Migracija Vodnika (44 strani) in izbranih Blog objav iz WXR izvoza v `content/guide` in `content/post`
- Dejanska About vsebina (trenutno osnutek/placeholder)
- Trgovina — dodajanje knjig/e-knjig/tinktur v `content/products`, ko so payment linki pripravljeni
- Testimonials — prenos 17 obstoječih iz WXR izvoza v `content/testimonials`
- Prave Facebook/YouTube povezave v `components/Footer.tsx` (trenutno placeholder URL-ji)
- Strani Vodnik/Blog/Trgovina/Programi/Kontakt (trenutno samo Home in About obstajata kot dejanske route-e)
