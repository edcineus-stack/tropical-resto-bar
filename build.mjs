// ============================================================
// Génère le site statique dans dist/ à partir de src/content.mjs.
// Aucune dépendance : `node build.mjs`.
// Une page par langue : / (fr) et /en/ (en).
// ============================================================
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { site, copy, menu, theme } from "./src/content.mjs";

const OUT = "dist";
const DEFAULT_LANG = site.languages[0];

// ---------- Helpers ----------
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Texte traduit. `raw` garde le HTML (titres avec <em>, <br>).
const t = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v[DEFAULT_LANG] : v);
const tx = (v, lang) => esc(t(v, lang));
const raw = (v, lang) => t(v, lang);

const pathFor = (lang) => (lang === DEFAULT_LANG ? "/" : `/${lang}/`);
const fmtPrice = (n) => new Intl.NumberFormat("fr-FR").format(n).replace(/\u202f|\u00a0/g, " ");

function fmtTime(hhmm, lang) {
  if (hhmm === "24:00") return t(copy.status.midnight, lang);
  const [h, m] = hhmm.split(":").map(Number);
  if (lang === "en") {
    const suffix = h >= 12 ? "pm" : "am";
    const h12 = h % 12 || 12;
    return `${h12}${m ? ":" + String(m).padStart(2, "0") : ""} ${suffix}`;
  }
  return `${h}h${m ? String(m).padStart(2, "0") : ""}`;
}

// `sizes` : largeur affichée, pour que le navigateur choisisse la bonne taille.
// `data-full` : version grande, utilisée par la galerie plein écran.
const img = (i, lang, attrs = "", sizes = "100vw") => {
  const set = i.srcset ? ` srcset="${i.srcset.map(([src, w]) => `/${src} ${w}w`).join(", ")}" sizes="${sizes}"` : "";
  return `<img src="/${i.src}"${set} data-full="/${i.src}" alt="${tx(i.alt, lang)}" width="${i.width}" height="${i.height}" ${attrs}>`;
};

// Logo : une version par mode (clair / sombre), le CSS affiche la bonne.
const logo = (attrs = "", alt = "") =>
  `<img src="/${site.logo.src}" alt="${alt}" width="${site.logo.width}" height="${site.logo.height}" class="logo-for-dark" ${attrs}>` +
  (site.logo.srcLight ? `<img src="/${site.logo.srcLight}" alt="${alt}" width="${site.logo.width}" height="${site.logo.height}" class="logo-for-light" ${attrs}>` : "");

const waLink = (text) => `https://wa.me/${site.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;

// Icônes (traits, 1.6px) — dessinées à la main, pas de bibliothèque.
const icon = {
  whatsapp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5h3.2l1.6 4.3-2.1 1.4a11 11 0 0 0 7.1 7.1l1.4-2.1 4.3 1.6V19a1.9 1.9 0 0 1-2 1.9A16.6 16.6 0 0 1 3.1 5.5 1.9 1.9 0 0 1 5 3.5Z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>`,
  insta: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6-4.5-4.2 6.1-.7Z"/></svg>`,
};

// ---------- Blocs ----------
function hoursRows(lang) {
  // Lundi en premier, dimanche en dernier.
  return [1, 2, 3, 4, 5, 6, 0]
    .map((d) => {
      const slots = site.hours[d] || [];
      const value = slots.length
        ? slots.map(([a, b]) => `${fmtTime(a, lang)} – ${fmtTime(b, lang)}`).join(", ")
        : tx(copy.info.closedDay, lang);
      return `<li data-day="${d}"><span>${esc(copy.days[lang][d])}<em class="today-tag">${tx(copy.info.today, lang)}</em></span><span>${value}</span></li>`;
    })
    .join("");
}

function menuHtml(lang) {
  const tabs = menu
    .map((c, i) => `<button type="button" role="tab" class="chip" id="tab-${i}" aria-controls="cat-${i}" aria-selected="${i === 0}">${tx(c.cat, lang)}</button>`)
    .join("");
  const cats = menu
    .map((c, i) => {
      const items = c.items
        .map((it) => {
          const price = it.priceLabel ? esc(it.priceLabel) : `${fmtPrice(it.price)} ${site.currency}`;
          return `<li class="dish${it.star ? " is-star" : ""}">
            <div class="dish-line"><span class="dish-name">${it.star ? `<span class="star" title="${tx(copy.menu.legend, lang)}">${icon.star}</span>` : ""}${tx(it.name, lang)}</span><span class="dish-dots" aria-hidden="true"></span><span class="dish-price">${price}</span></div>
            ${it.desc ? `<p class="dish-desc">${tx(it.desc, lang)}</p>` : ""}
          </li>`;
        })
        .join("");
      return `<div class="menu-cat" id="cat-${i}" role="tabpanel" aria-labelledby="tab-${i}">
        <h3>${tx(c.cat, lang)}</h3>
        ${c.sub ? `<p class="menu-sub">${tx(c.sub, lang)}</p>` : ""}
        <ul class="dishes">${items}</ul>
      </div>`;
    })
    .join("");
  return { tabs, cats };
}

// N'affiche que l'autre langue : EN sur la page française, FR sur la page anglaise.
function langSwitch(lang) {
  return site.languages
    .filter((l) => l !== lang)
    .map((l) => `<a class="icon-btn lang-btn" href="${pathFor(l)}" hreflang="${l}" lang="${l}" aria-label="${tx(copy.nav.otherLang, l)}">${l.toUpperCase()}</a>`)
    .join("");
}

function themeToggle(lang) {
  return `<button type="button" class="icon-btn theme-toggle" id="themeToggle" data-label-light="${tx(copy.nav.toLight, lang)}" data-label-dark="${tx(copy.nav.toDark, lang)}" aria-label="${tx(copy.nav.toLight, lang)}">
    <span class="theme-icon-sun">${icon.sun}</span><span class="theme-icon-moon">${icon.moon}</span>
  </button>`;
}

const cssVars = (colors) =>
  Object.entries(colors).map(([k, v]) => `--${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}:${v}`).join(";");

function head(lang, title, description) {
  const alternates = site.languages.map((l) => `<link rel="alternate" hreflang="${l}" href="${pathFor(l)}">`).join("");
  const def = theme.defaultMode;
  const other = def === "dark" ? "light" : "dark";
  return `<!DOCTYPE html>
<html lang="${lang}" data-theme="${def}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="${theme[def].bg}">
${alternates}
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/icons/favicon-32.png" type="image/png">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/instrument-serif-italic.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/manrope.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/style.css">
<script>(function(d){d.classList.add("js");try{var m=localStorage.getItem("theme");if(m==="light"||m==="dark")d.dataset.theme=m}catch(e){}})(document.documentElement)</script>
<style>:root{--font-display:${theme.fonts.display};--font-body:${theme.fonts.body};--radius:${theme.radius}}
:root,[data-theme="${def}"]{${cssVars(theme[def])};--scheme:${def}}
[data-theme="${other}"]{${cssVars(theme[other])};--scheme:${other}}</style>
</head>`;
}

// ---------- Page principale ----------
function page(lang) {
  const c = copy;
  const { tabs, cats } = menuHtml(lang);
  const mainPhone = site.phones[0];
  const data = {
    lang,
    tz: site.timezone,
    hours: site.hours,
    whatsapp: site.whatsapp,
    days: c.days[lang],
    s: {
      open: t(c.status.open, lang),
      closed: t(c.status.closed, lang),
      until: t(c.status.until, lang),
      opensAt: t(c.status.opensAt, lang),
      opensDay: t(c.status.opensDay, lang),
      midnight: t(c.status.midnight, lang),
      sent: t(c.booking.sent, lang),
      errRequired: t(c.booking.errRequired, lang),
      errPast: t(c.booking.errPast, lang),
      errClosed: t(c.booking.errClosed, lang),
      errClosedDay: t(c.booking.errClosedDay, lang),
      msgTitle: t(c.booking.msgTitle, lang),
      labels: {
        name: t(c.booking.name, lang),
        phone: t(c.booking.phone, lang),
        type: t(c.booking.type, lang),
        date: t(c.booking.date, lang),
        time: t(c.booking.time, lang),
        guests: t(c.booking.guests, lang),
        notes: t(c.booking.notes, lang),
      },
      menuOpen: t(c.nav.open, lang),
      menuClose: t(c.nav.close, lang),
    },
  };

  const navItems = [
    ["#carte", c.nav.menu],
    ["#galerie", c.nav.gallery],
    ["#evenements", c.nav.events],
    ["#infos", c.nav.info],
  ]
    .map(([href, label]) => `<li><a href="${href}">${tx(label, lang)}</a></li>`)
    .join("");

  return `${head(lang, t(c.meta.title, lang), t(c.meta.description, lang))}
<body>
<a class="skip-link" href="#contenu">${tx(c.nav.skip, lang)}</a>

<header class="site-header" id="top">
  <div class="wrap header-inner">
    <a class="brand" href="${pathFor(lang)}" aria-label="${esc(site.fullName)}">
      ${logo()}
    </a>
    <nav class="nav" aria-label="Navigation">
      <ul class="nav-links" id="navLinks">${navItems}</ul>
    </nav>
    <div class="header-actions">
      ${langSwitch(lang)}
      ${themeToggle(lang)}
      <a class="btn btn-accent btn-sm header-cta" href="#reserver">${tx(c.nav.book, lang)}</a>
      <button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="navLinks" aria-label="${tx(c.nav.open, lang)}"><span></span><span></span></button>
    </div>
  </div>
</header>

<main id="contenu">

  <section class="hero">
    <div class="hero-media">
      ${img(c.hero.image, lang, 'class="hero-img" loading="eager" fetchpriority="high" decoding="async"', "(min-width: 960px) 48vw, 100vw")}
    </div>
    <div class="wrap hero-inner">
      <p class="status-pill" id="statusPill" hidden><span class="dot"></span><span class="status-text"></span></p>
      <p class="eyebrow">${tx(c.hero.eyebrow, lang)}</p>
      <h1>${raw(c.hero.title, lang)}</h1>
      <p class="hero-text">${tx(c.hero.text, lang)}</p>
      <div class="hero-ctas">
        <a class="btn btn-accent" href="#reserver">${tx(c.hero.ctaBook, lang)}</a>
        <a class="btn btn-ghost" href="#carte">${tx(c.hero.ctaMenu, lang)} ${icon.arrow}</a>
      </div>
    </div>
    <div class="hero-strip">
      <div class="wrap hero-strip-inner">
        <a href="${site.address.mapsUrl}" target="_blank" rel="noopener">${icon.pin}<span>${esc(site.address.short)}</span></a>
        <a href="tel:${mainPhone.tel}">${icon.phone}<span>${esc(mainPhone.label)}</span></a>
      </div>
    </div>
  </section>

  <section class="intro" aria-labelledby="intro-title">
    <div class="wrap intro-grid">
      <div class="intro-copy reveal">
        <p class="eyebrow">${tx(c.intro.eyebrow, lang)}</p>
        <h2 id="intro-title">${tx(c.intro.title, lang)}</h2>
        <p class="lede">${tx(c.intro.text, lang)}</p>
        <dl class="facts">
          ${c.intro.facts.map((f) => `<div><dt>${esc(f.value)}</dt><dd>${tx(f.label, lang)}</dd></div>`).join("")}
        </dl>
      </div>
      <div class="intro-media reveal" data-lightbox-group="intro">
        ${c.intro.images
          .map((i, n) => {
            const more = (i.more || []).map((m) => img(m, lang, 'loading="lazy" decoding="async" hidden data-lightbox-only')).join("");
            const hint = i.more ? `<span class="more-hint" aria-hidden="true">+${i.more.length}</span>` : "";
            return `<figure class="intro-fig intro-fig-${n + 1}">${img(i, lang, 'loading="lazy" decoding="async"', "(min-width: 900px) 40vw, 90vw")}${more}${hint}</figure>`;
          })
          .join("")}
      </div>
    </div>
  </section>

  <section class="menu" id="carte" aria-labelledby="menu-title">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">${tx(c.menu.eyebrow, lang)}</p>
        <h2 id="menu-title">${tx(c.menu.title, lang)}</h2>
        <p class="lede">${tx(c.menu.text, lang)} <span class="legend"><span class="star">${icon.star}</span> ${tx(c.menu.legend, lang)}</span></p>
      </div>
      <div class="menu-tabs" role="tablist" aria-label="${tx(c.menu.eyebrow, lang)}" id="menuTabs" hidden>${tabs}</div>
      <div class="menu-board" id="menuBoard">${cats}</div>
    </div>
  </section>

  <section class="gallery" id="galerie" aria-labelledby="gallery-title">
    <div class="wrap">
      <div class="section-head section-head-left reveal">
        <p class="eyebrow">${tx(c.gallery.eyebrow, lang)}</p>
        <h2 id="gallery-title">${tx(c.gallery.title, lang)}</h2>
      </div>
    </div>
    <div class="gallery-track" data-lightbox-group="plats">
      ${c.gallery.images.map((i) => `<figure>${img(i, lang, 'loading="lazy" decoding="async"')}</figure>`).join("")}
    </div>
  </section>

  <section class="events" id="evenements" aria-labelledby="events-title">
    <div class="wrap events-grid">
      <figure class="events-media reveal" data-lightbox-group="events">${img(c.events.image, lang, 'loading="lazy" decoding="async"')}</figure>
      <div class="events-copy reveal">
        <p class="eyebrow">${tx(c.events.eyebrow, lang)}</p>
        <h2 id="events-title">${tx(c.events.title, lang)}</h2>
        <p class="lede">${tx(c.events.text, lang)}</p>
        <a class="btn btn-accent" href="${waLink(t(c.events.whatsappText, lang))}" target="_blank" rel="noopener">${icon.whatsapp} ${tx(c.events.cta, lang)}</a>
      </div>
    </div>
  </section>

  <section class="info" id="infos" aria-labelledby="info-title">
    <div class="wrap">
      <div class="section-head section-head-left reveal">
        <p class="eyebrow">${tx(c.info.eyebrow, lang)}</p>
        <h2 id="info-title">${tx(c.info.title, lang)}</h2>
      </div>
      <div class="info-grid">
        <div class="info-block info-hours reveal">
          <h3>${icon.clock} ${tx(c.info.hours, lang)}</h3>
          <ul class="hours" id="hoursList">${hoursRows(lang)}</ul>
        </div>
        <div class="info-side">
          <div class="info-block reveal">
            <h3>${icon.pin} ${tx(c.info.address, lang)}</h3>
            <p>${site.address.lines.map(esc).join("<br>")}</p>
            <a class="link-arrow" href="${site.address.mapsUrl}" target="_blank" rel="noopener">${tx(c.info.maps, lang)} ${icon.arrow}</a>
          </div>
          <div class="info-block reveal">
            <h3>${icon.phone} ${tx(c.info.phone, lang)}</h3>
            ${site.phones.map((p) => `<p><a href="tel:${p.tel}">${esc(p.label)}</a></p>`).join("")}
          </div>
          <div class="info-block reveal">
            <h3>${icon.insta} ${tx(c.info.follow, lang)}</h3>
            <p>${tx(c.info.followText, lang)}</p>
            ${site.socials.map((s) => `<a class="link-arrow" href="${s.url}" target="_blank" rel="noopener">${esc(s.handle)} ${icon.arrow}</a>`).join("")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="booking" id="reserver" aria-labelledby="booking-title">
    <div class="wrap booking-grid">
      <div class="booking-copy reveal">
        <p class="eyebrow">${tx(c.booking.eyebrow, lang)}</p>
        <h2 id="booking-title">${tx(c.booking.title, lang)}</h2>
        <p class="lede">${tx(c.booking.text, lang)}</p>
        <p class="booking-call">${tx(c.booking.call, lang)} <a href="tel:${mainPhone.tel}">${esc(mainPhone.label)}</a></p>
      </div>
      <form class="booking-form reveal" id="bookingForm" novalidate>
        <div class="field field-full">
          <label for="fName">${tx(c.booking.name, lang)}</label>
          <input id="fName" name="name" type="text" required autocomplete="name">
          <p class="field-error" aria-live="polite"></p>
        </div>
        <div class="field">
          <label for="fPhone">${tx(c.booking.phone, lang)}</label>
          <input id="fPhone" name="phone" type="tel" required autocomplete="tel" inputmode="tel" placeholder="+509">
          <p class="field-error" aria-live="polite"></p>
        </div>
        <div class="field">
          <label for="fType">${tx(c.booking.type, lang)}</label>
          <select id="fType" name="type">
            ${c.booking.types.map((o) => `<option>${tx(o.value, lang)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label for="fDate">${tx(c.booking.date, lang)}</label>
          <input id="fDate" name="date" type="date" required>
          <p class="field-error" aria-live="polite"></p>
        </div>
        <div class="field">
          <label for="fTime">${tx(c.booking.time, lang)}</label>
          <input id="fTime" name="time" type="time" required step="900">
          <p class="field-error" aria-live="polite"></p>
        </div>
        <div class="field">
          <label for="fGuests">${tx(c.booking.guests, lang)}</label>
          <input id="fGuests" name="guests" type="number" min="1" max="200" value="2" required inputmode="numeric">
          <p class="field-error" aria-live="polite"></p>
        </div>
        <div class="field field-full">
          <label for="fNotes">${tx(c.booking.notes, lang)}</label>
          <textarea id="fNotes" name="notes" rows="3" placeholder="${tx(c.booking.notesPlaceholder, lang)}"></textarea>
        </div>
        <div class="field-full form-actions">
          <button type="submit" class="btn btn-accent btn-block">${icon.whatsapp} ${tx(c.booking.submit, lang)}</button>
          <p class="form-status" id="formStatus" role="status"></p>
          <p class="form-note">${tx(c.booking.note, lang)}</p>
        </div>
      </form>
    </div>
  </section>

</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <span class="footer-logo">${logo('loading="lazy"', esc(site.fullName))}</span>
    <p>${esc(site.address.short)} · <a href="tel:${mainPhone.tel}">${esc(mainPhone.label)}</a></p>
    <p class="footer-meta">© <span id="year">${new Date().getFullYear()}</span> ${esc(site.fullName)} · ${tx(c.footer.credit, lang)} <a href="${site.credit.url}" target="_blank" rel="noopener">${esc(site.credit.name)}</a></p>
  </div>
</footer>

<a class="wa-float" href="${waLink()}" target="_blank" rel="noopener" aria-label="${tx(c.floating, lang)}">${icon.whatsapp}</a>

<script id="site-data" type="application/json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>
<script src="/assets/app.js" defer></script>
</body>
</html>
`;
}

function notFound() {
  const lang = DEFAULT_LANG;
  const alt = site.languages.find((l) => l !== lang);
  return `${head(lang, `${t(copy.notFound.title, lang)} — ${site.fullName}`, t(copy.meta.description, lang))}
<body class="page-404">
<main class="nf wrap">
  <span class="nf-logo">${logo("", esc(site.fullName))}</span>
  <p class="eyebrow">404</p>
  <h1>${tx(copy.notFound.title, lang)}</h1>
  <p class="lede">${tx(copy.notFound.text, lang)}${alt ? `<br><span lang="${alt}">${tx(copy.notFound.text, alt)}</span>` : ""}</p>
  <div class="hero-ctas">
    <a class="btn btn-accent" href="${pathFor(lang)}">${tx(copy.notFound.back, lang)}</a>
    ${alt ? `<a class="btn btn-ghost" href="${pathFor(alt)}" lang="${alt}">${tx(copy.notFound.back, alt)}</a>` : ""}
  </div>
</main>
</body>
</html>
`;
}

// ---------- Écriture ----------
// Vide dist/ sans supprimer le dossier (un serveur local peut l'utiliser).
mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(OUT)) rmSync(`${OUT}/${f}`, { recursive: true, force: true });
cpSync("src/assets", `${OUT}/assets`, { recursive: true });
cpSync("src/images", `${OUT}/images`, { recursive: true });
cpSync("src/icons", `${OUT}/icons`, { recursive: true });
cpSync("src/icons/favicon.ico", `${OUT}/favicon.ico`);

for (const lang of site.languages) {
  const dir = lang === DEFAULT_LANG ? OUT : `${OUT}/${lang}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, page(lang));
}
writeFileSync(`${OUT}/404.html`, notFound());

writeFileSync(
  `${OUT}/site.webmanifest`,
  JSON.stringify(
    {
      name: site.fullName,
      short_name: site.name,
      start_url: "/",
      display: "browser",
      background_color: theme[theme.defaultMode].bg,
      theme_color: theme[theme.defaultMode].bg,
      icons: [
        { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2
  )
);

writeFileSync(
  `${OUT}/_headers`,
  `/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/images/*
  Cache-Control: public, max-age=604800
/icons/*
  Cache-Control: public, max-age=604800
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
`
);

console.log(`Site généré dans ${OUT}/ (${site.languages.join(", ")})`);
