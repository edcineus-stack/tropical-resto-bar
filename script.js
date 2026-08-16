// ============================================================
// Tropical Resto-bar — script principal (site public)
// Vanilla JS, sans dépendance, pour rester très léger.
// ============================================================

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Menu mobile ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Rendu du menu depuis menu-data.js ---------- */
const catsEl = document.getElementById("menuCats");
const fmt = new Intl.NumberFormat("fr-FR");

MENU.forEach((cat, i) => {
  const details = document.createElement("details");
  details.className = "menu-cat";
  if (i === 0) details.open = true;

  const summary = document.createElement("summary");
  summary.className = "menu-cat-btn";
  summary.innerHTML = `<span>${cat.cat}</span><span class="chev">+</span>`;
  details.appendChild(summary);

  const body = document.createElement("div");
  body.className = "menu-cat-body";

  if (cat.sub) {
    const sub = document.createElement("p");
    sub.className = "menu-cat-sub";
    sub.textContent = cat.sub;
    body.appendChild(sub);
  }

  cat.items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "menu-item";
    row.innerHTML = `
      <div>
        <div class="menu-item-name">${item.star ? '<span class="star">★</span>' : ""}${item.name}</div>
        ${item.desc ? `<div class="menu-item-desc">${item.desc}</div>` : ""}
      </div>
      <div class="menu-item-price">${fmt.format(item.price)} G</div>
    `;
    body.appendChild(row);
  });

  details.appendChild(body);
  catsEl.appendChild(details);
});

/* ---------- Visibilité de la section réservation ---------- */
async function getReservationsVisible() {
  if (!SITE_CONFIG.supabaseUrl || !SITE_CONFIG.supabaseAnonKey) {
    // Pas encore configuré : la réservation reste visible par défaut.
    return true;
  }
  try {
    const res = await fetch(
      `${SITE_CONFIG.supabaseUrl}/rest/v1/site_settings?select=reservations_visible&id=eq.1`,
      {
        headers: {
          apikey: SITE_CONFIG.supabaseAnonKey,
          Authorization: `Bearer ${SITE_CONFIG.supabaseAnonKey}`,
        },
      }
    );
    if (!res.ok) return true;
    const rows = await res.json();
    if (!rows.length) return true;
    return rows[0].reservations_visible !== false;
  } catch (e) {
    // Réseau indisponible : on n'empêche pas les clients de réserver.
    return true;
  }
}

(async function applyReservationVisibility() {
  const visible = await getReservationsVisible();
  const openBox = document.getElementById("resaOpen");
  const closedBox = document.getElementById("resaClosed");
  const navResa = document.getElementById("navResa");
  const heroResaBtn = document.getElementById("heroResaBtn");

  if (visible) {
    openBox.hidden = false;
    closedBox.hidden = true;
  } else {
    openBox.hidden = true;
    closedBox.hidden = false;
    if (navResa) navResa.style.display = "none";
    if (heroResaBtn) heroResaBtn.style.display = "none";
  }
})();

/* ---------- Formulaire de réservation ---------- */
const resaForm = document.getElementById("resaForm");
const statusEl = document.getElementById("resaStatus");

function buildMessage() {
  const d = new FormData(resaForm);
  const lines = [
    "Nouvelle demande de réservation — Tropical Resto-bar",
    `Nom : ${d.get("nom")}`,
    `Téléphone : ${d.get("tel")}`,
    `Type : ${d.get("type")}`,
    `Date : ${d.get("date")}`,
    `Heure : ${d.get("heure")}`,
    `Personnes : ${d.get("personnes")}`,
  ];
  if (d.get("message")) lines.push(`Message : ${d.get("message")}`);
  return lines.join("\n");
}

function showStatus(msg, ok) {
  statusEl.textContent = msg;
  statusEl.className = "res-status show " + (ok ? "ok" : "err");
}

document.getElementById("resaWhatsapp").addEventListener("click", () => {
  if (!resaForm.reportValidity()) return;
  const text = encodeURIComponent(buildMessage());
  const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`;
  window.open(url, "_blank", "noopener");
  showStatus("WhatsApp s'ouvre avec votre demande pré-remplie — il ne reste qu'à l'envoyer.", true);
});

document.getElementById("resaEmail").addEventListener("click", async () => {
  if (!resaForm.reportValidity()) return;

  if (!SITE_CONFIG.formspreeEndpoint) {
    // Pas d'email configuré : on retombe sur un mailto.
    const subject = encodeURIComponent("Réservation — Tropical Resto-bar");
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    return;
  }

  const data = new FormData(resaForm);
  data.append("_subject", "Nouvelle réservation — Tropical Resto-bar");

  try {
    const res = await fetch(SITE_CONFIG.formspreeEndpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });
    if (res.ok) {
      showStatus("Votre demande a été envoyée par email. Nous revenons vers vous rapidement.", true);
      resaForm.reset();
    } else {
      showStatus("L'envoi par email a échoué — merci d'essayer via WhatsApp ou de nous appeler.", false);
    }
  } catch (e) {
    showStatus("Réseau indisponible — merci d'essayer via WhatsApp ou de nous appeler.", false);
  }
});

resaForm.addEventListener("submit", (e) => e.preventDefault());
