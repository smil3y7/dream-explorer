# Dream eXplorer — nova stran

Statična Next.js stran z Decap CMS urejevalnikom, i18n (SL/EN, lokalizirani meniji),
in content modelom, pripravljenim za enostavno dodajanje člankov, izdelkov in
testimonialov brez razvojnega posega.

**Stanje: vse dogovorjene strani obstajajo in so poseljene s pravo, migrirano vsebino
iz WXR izvoza** (preverjeno: `npm run build` uspešno generira vseh 83 strani).

| Stran | SL | EN | Vsebina |
|---|---|---|---|
| Domov | `/sl` | `/en` | Origin story (osnutek, za revizijo) |
| O meni | `/sl/about` | `/en/about` | Ločena vsebina po jeziku (ni več skupna) |
| Vodnik | `/sl/vodnik` + 42 podstrani | — | Migrirano iz WXR |
| Blog | `/sl/blog` + 18 objav | `/en/blog` + 4 objave | Migrirano iz WXR |
| Trgovina | `/sl/trgovina` | `/en/shop` | Prazno — čaka payment linke |
| Programi | `/sl/programi` | — | "Kmalu" + 17 testimonialov |
| Kontakt | `/sl/kontakt` | `/en/contact` | Segmentiran obrazec (trenutno `mailto:`) |
| CMS | `/admin` | | Decap CMS, vse collections |

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

## 8. Manjkajoče slike (nujno pred ugasnitvijo starega WordPressa)

33 slik iz stare vsebine (Vodnik in Blog) še vedno kaže na `dream-explorer.com`.
Poti v besedilu so že posodobljene na `/uploads/...`, dejanske datoteke pa je
treba prenesti — izberi skripto glede na svoj operacijski sistem:

**Mac/Linux:**
```bash
bash scripts/download-legacy-images.sh
```
(potrebuje `jq` — `brew install jq` / `apt install jq`)

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\download-legacy-images.ps1
```
(brez dodatnih namestitev — PowerShell je del Windows)

Obe prenesta vseh 33 slik na pravilna mesta v `public/uploads/`. **To poženi,
preden ugasneš stari WordPress** — po ugasnitvi slik ni več mogoče pridobiti.
Po prenosu samo `git add public/uploads && git commit && git push`.

## 9. Gradivo za Programe (ni objavljeno)

`scripts/programi-reference-NEOBJAVITI.md` vsebuje izvirno besedilo za
Inkubator sanj, Inkubator 101 in individualno svetovanje — ločeno na
časovno neodvisen opis (uporabno) in zastarele logistične podatke (cena,
lokacija, platforma — vse iz 2015–2018, preveri pred uporabo). To ni
del žive strani, samo referenca za kasneje.

## Kaj (še) manjka

- **Kontaktni obrazec** trenutno odpre `mailto:` — zamenjaj z Formspree/podobnim, ko boš to želel avtomatizirati, in poveži z Mailchimp listo.
- **Trgovina** — dodaj vsebino v `content/products` (knjige/e-knjige/tinkture), ko so payment linki pripravljeni.
- **Facebook/YouTube povezave** v `components/Footer.tsx` — trenutno placeholder URL-ji, zamenjaj s pravimi.
- **Origin story in About besedilo** — oboje je osnutek/prepis, prosim preveri ton in dejstva pred objavo.
- **Legal strani** (Politika zasebnosti, Pogoji, Piškotki) — še niso migrirane kot route, obstajajo v WXR izvozu (glej `dream-explorer-nacrt-prenove.md`, razdelek 8) za posodobitev in vključitev.
- **Affiliate izdelki** — arhitektura pripravljena (`product_type: affiliate` v CMS), vsebina se doda, ko preveriš stare Amazon linke.
