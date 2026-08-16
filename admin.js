// ============================================================
// Tropical Resto-bar — logique de la page /admin.html
// ============================================================

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const loginCard = document.getElementById("loginCard");
const panelCard = document.getElementById("panelCard");
const loginMsg = document.getElementById("loginMsg");
const configWarning = document.getElementById("configWarning");

if (!SITE_CONFIG.supabaseUrl || !SITE_CONFIG.supabaseAnonKey) {
  configWarning.hidden = false;
}

document.getElementById("loginBtn").addEventListener("click", async () => {
  const pwd = document.getElementById("pwd").value;
  const hash = await sha256(pwd);
  if (hash === SITE_CONFIG.adminPasswordHash) {
    loginCard.hidden = true;
    panelCard.hidden = false;
    loadToggleState();
  } else {
    loginMsg.textContent = "Mot de passe incorrect.";
  }
});

document.getElementById("pwd").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("loginBtn").click();
});

function sbHeaders(extra) {
  return {
    apikey: SITE_CONFIG.supabaseAnonKey,
    Authorization: `Bearer ${SITE_CONFIG.supabaseAnonKey}`,
    "Content-Type": "application/json",
    ...(extra || {}),
  };
}

async function loadToggleState() {
  const toggle = document.getElementById("resaToggle");
  if (!SITE_CONFIG.supabaseUrl) {
    toggle.checked = true;
    toggle.disabled = true;
    return;
  }
  try {
    const res = await fetch(
      `${SITE_CONFIG.supabaseUrl}/rest/v1/site_settings?select=reservations_visible&id=eq.1`,
      { headers: sbHeaders() }
    );
    const rows = await res.json();
    toggle.checked = rows.length ? rows[0].reservations_visible !== false : true;
  } catch (e) {
    setMsg("Impossible de charger l'état actuel (réseau ?).", false);
  }
}

function setMsg(text, ok) {
  const el = document.getElementById("adminMsg");
  el.textContent = text;
  el.className = ok ? "ok" : "err";
}

document.getElementById("resaToggle").addEventListener("change", async (e) => {
  if (!SITE_CONFIG.supabaseUrl) return;
  const value = e.target.checked;
  try {
    const res = await fetch(
      `${SITE_CONFIG.supabaseUrl}/rest/v1/site_settings?id=eq.1`,
      {
        method: "PATCH",
        headers: sbHeaders({ Prefer: "return=minimal" }),
        body: JSON.stringify({ reservations_visible: value }),
      }
    );
    if (res.ok) {
      setMsg(value ? "Réservations visibles sur le site." : "Réservations masquées sur le site.", true);
    } else {
      setMsg("Échec de l'enregistrement — vérifie la configuration Supabase.", false);
      e.target.checked = !value;
    }
  } catch (err) {
    setMsg("Réseau indisponible, réessaie.", false);
    e.target.checked = !value;
  }
});
