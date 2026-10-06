// ============================================================
// Comportements du site public. Vanilla JS, sans dépendance.
// Les données (horaires, numéro, textes) viennent du bloc
// <script id="site-data"> généré par build.mjs.
// ============================================================
(function () {
  const D = JSON.parse(document.getElementById("site-data").textContent);
  const S = D.s;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Heure locale du restaurant ---------- */
  function nowInTz() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: D.tz, weekday: "short", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date());
    const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
    return { day, minutes: Number(p.hour) * 60 + Number(p.minute), iso: `${p.year}-${p.month}-${p.day}` };
  }
  const toMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  function fmt(hhmm) {
    if (hhmm === "24:00") return S.midnight;
    const [h, m] = hhmm.split(":").map(Number);
    if (D.lang === "en") return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h >= 12 ? "pm" : "am"}`;
    return `${h}h${m ? String(m).padStart(2, "0") : ""}`;
  }
  const slotsFor = (day) => D.hours[day] || [];

  /* ---------- Statut ouvert / fermé + jour en cours ---------- */
  (function status() {
    const { day, minutes } = nowInTz();
    const pill = $("#statusPill");
    const today = slotsFor(day);
    const current = today.find(([a, b]) => minutes >= toMin(a) && minutes < toMin(b));
    let text;
    if (current) {
      text = `${S.open} · ${S.until} ${fmt(current[1])}`;
      pill.classList.add("is-open");
    } else {
      const later = today.find(([a]) => toMin(a) > minutes);
      if (later) {
        text = `${S.closed} · ${S.opensAt} ${fmt(later[0])}`;
      } else {
        for (let i = 1; i <= 7; i++) {
          const d = (day + i) % 7;
          const s = slotsFor(d)[0];
          if (s) {
            const dayName = D.days[d].toLowerCase();
            text = `${S.closed} · ${S.opensDay} ${dayName} ${D.lang === "en" ? "at" : "à"} ${fmt(s[0])}`;
            break;
          }
        }
      }
    }
    if (text && pill) { $(".status-text", pill).textContent = text; pill.hidden = false; }
    const row = $(`#hoursList li[data-day="${day}"]`);
    if (row) row.classList.add("is-today");
  })();

  /* ---------- Mode clair / sombre ---------- */
  (function themeSwitch() {
    const btn = $("#themeToggle");
    if (!btn) return;
    const root = document.documentElement;
    const meta = $('meta[name="theme-color"]');
    function sync() {
      const light = root.dataset.theme === "light";
      btn.setAttribute("aria-label", light ? btn.dataset.labelDark : btn.dataset.labelLight);
      if (meta) meta.content = getComputedStyle(root).getPropertyValue("--bg").trim();
    }
    btn.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
      sync();
    });
    sync();
  })();

  /* ---------- En-tête ---------- */
  const header = $(".site-header");
  const toggle = $("#navToggle");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? S.menuClose : S.menuOpen);
  }
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  $$(".nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Lien de navigation actif selon la section visible.
  const navMap = new Map($$(".nav-links a").map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const link = navMap.get(en.target.id);
      if (link && en.isIntersecting) {
        navMap.forEach((l) => l.classList.remove("is-active"));
        link.classList.add("is-active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navMap.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

  /* ---------- Carte : une rubrique à la fois ---------- */
  (function menuTabs() {
    const tabsEl = $("#menuTabs");
    const board = $("#menuBoard");
    if (!tabsEl || !board) return;
    const tabs = $$('[role="tab"]', tabsEl);
    const panels = $$(".menu-cat", board);
    tabsEl.hidden = false;
    board.classList.add("is-tabbed");

    function select(i, focus) {
      tabs.forEach((t, n) => {
        const on = n === i;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[n].classList.toggle("is-active", on);
      });
      // Centre l'onglet dans sa barre sans faire défiler la page.
      const t = tabs[i];
      tabsEl.scrollTo({ left: t.offsetLeft - (tabsEl.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
      if (focus) tabs[i].focus();
    }
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => {
        select(i);
        // Ramène le haut de la rubrique sous les onglets si on était descendu.
        const top = tabsEl.getBoundingClientRect().top;
        const headerH = header.offsetHeight;
        if (top <= headerH + 1) {
          window.scrollTo({ top: board.offsetTop - headerH - tabsEl.offsetHeight - 16, behavior: "smooth" });
        }
      });
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") select((i + 1) % tabs.length, true);
        if (e.key === "ArrowLeft") select((i - 1 + tabs.length) % tabs.length, true);
      });
    });
    select(0);
  })();

  /* ---------- Formulaire de réservation → WhatsApp ---------- */
  (function booking() {
    const form = $("#bookingForm");
    if (!form) return;
    const statusEl = $("#formStatus");
    const dateEl = $("#fDate");
    const { iso } = nowInTz();
    dateEl.min = iso;

    function setError(input, msg) {
      const field = input.closest(".field");
      field.classList.toggle("has-error", Boolean(msg));
      $(".field-error", field).textContent = msg || "";
      input.setAttribute("aria-invalid", msg ? "true" : "false");
    }

    function validate() {
      let first = null;
      const fail = (el, msg) => { setError(el, msg); if (!first) first = el; };
      $$("input[required]", form).forEach((el) => setError(el, el.value.trim() ? "" : S.errRequired));
      $$("input[required]", form).forEach((el) => { if (!el.value.trim() && !first) first = el; });

      const date = dateEl.value;
      const timeEl = $("#fTime");
      if (date && date < iso) fail(dateEl, S.errPast);
      if (date && timeEl.value && date >= iso) {
        const [y, m, d] = date.split("-").map(Number);
        const day = new Date(y, m - 1, d).getDay();
        const slots = slotsFor(day);
        const t = toMin(timeEl.value);
        if (!slots.length) fail(dateEl, S.errClosedDay);
        else if (!slots.some(([a, b]) => t >= toMin(a) && t < toMin(b))) {
          fail(timeEl, `${S.errClosed} ${slots.map(([a, b]) => `${fmt(a)} – ${fmt(b)}`).join(", ")}.`);
        }
      }
      if (first) first.focus();
      return !first;
    }

    $$("input, select, textarea", form).forEach((el) =>
      el.addEventListener("input", () => { if (el.closest(".field").classList.contains("has-error")) setError(el, ""); })
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      statusEl.textContent = "";
      if (!validate()) return;
      const f = new FormData(form);
      const L = S.labels;
      const lines = [
        S.msgTitle,
        `${L.name} : ${f.get("name")}`,
        `${L.phone} : ${f.get("phone")}`,
        `${L.type} : ${f.get("type")}`,
        `${L.date} : ${f.get("date")}`,
        `${L.time} : ${f.get("time")}`,
        `${L.guests} : ${f.get("guests")}`,
      ];
      if (f.get("notes")) lines.push(`${L.notes} : ${f.get("notes")}`);
      const url = `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank", "noopener");
      statusEl.textContent = S.sent;
    });
  })();

  /* ---------- Bouton WhatsApp flottant : masqué sur le formulaire ---------- */
  (function floatBtn() {
    const btn = $(".wa-float");
    const booking = $("#reserver");
    if (!btn || !booking) return;
    new IntersectionObserver(([en]) => btn.classList.toggle("is-hidden", en.isIntersecting), { threshold: 0.15 }).observe(booking);
  })();

  /* ---------- Apparition au défilement ---------- */
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); revealer.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach((el) => revealer.observe(el));

  /* ---------- Galerie plein écran ---------- */
  (function lightbox() {
    const groups = $$("[data-lightbox-group]");
    if (!groups.length) return;
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="${D.lang === "en" ? "Close" : "Fermer"}">✕</button>
      <button type="button" class="lightbox-prev" aria-label="${D.lang === "en" ? "Previous photo" : "Photo précédente"}">‹</button>
      <button type="button" class="lightbox-next" aria-label="${D.lang === "en" ? "Next photo" : "Photo suivante"}">›</button>
      <span class="lightbox-counter"></span>`;
    // Image créée à part : son src n'est posé qu'à l'ouverture.
    const imgEl = document.createElement("img");
    overlay.insertBefore(imgEl, $(".lightbox-next", overlay));
    document.body.appendChild(overlay);
    const counter = $(".lightbox-counter", overlay);
    let list = [], index = 0, lastFocus = null;

    function show(i) {
      index = (i + list.length) % list.length;
      imgEl.src = list[index].src;
      imgEl.alt = list[index].alt;
      counter.textContent = `${index + 1} / ${list.length}`;
      const multi = list.length > 1;
      $(".lightbox-prev", overlay).hidden = !multi;
      $(".lightbox-next", overlay).hidden = !multi;
      counter.hidden = !multi;
    }
    function open(l, i) {
      lastFocus = document.activeElement;
      list = l; show(i);
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
      $(".lightbox-close", overlay).focus();
    }
    function close() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    groups.forEach((g) => {
      const imgs = $$("img", g);
      // Les images [data-lightbox-only] n'apparaissent qu'en plein écran.
      const l = imgs.map((el) => ({ src: el.dataset.full || el.currentSrc || el.src, alt: el.alt }));
      imgs.forEach((el, i) => {
        if (el.hasAttribute("data-lightbox-only")) return;
        el.tabIndex = 0;
        el.addEventListener("click", () => open(l, i));
        el.addEventListener("keydown", (e) => { if (e.key === "Enter") open(l, i); });
      });
    });
    $(".lightbox-close", overlay).addEventListener("click", close);
    $(".lightbox-prev", overlay).addEventListener("click", () => show(index - 1));
    $(".lightbox-next", overlay).addEventListener("click", () => show(index + 1));
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
    let x0 = null;
    overlay.addEventListener("touchstart", (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    overlay.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  })();
})();
