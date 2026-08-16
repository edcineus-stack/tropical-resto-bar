// ============================================================
// Galerie plein écran (lightbox) — sans dépendance externe.
// Fonctionne sur toutes les grilles marquées [data-lightbox-group].
// Clic sur une photo, flèches ← → ou balayage tactile pour naviguer,
// Échap ou clic à l'extérieur pour fermer.
// ============================================================

(function () {
  const groups = document.querySelectorAll("[data-lightbox-group]");
  if (!groups.length) return;

  // Construit la structure de l'overlay une seule fois.
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Fermer">✕</button>
    <button class="lightbox-prev" aria-label="Photo précédente">‹</button>
    <img alt="">
    <button class="lightbox-next" aria-label="Photo suivante">›</button>
    <span class="lightbox-counter"></span>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector("img");
  const counterEl = overlay.querySelector(".lightbox-counter");
  let currentList = [];
  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + currentList.length) % currentList.length;
    const item = currentList[currentIndex];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    counterEl.textContent = `${currentIndex + 1} / ${currentList.length}`;
  }

  function open(list, index) {
    currentList = list;
    show(index);
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  groups.forEach((group) => {
    const imgs = Array.from(group.querySelectorAll("img"));
    const list = imgs.map((el) => ({ src: el.currentSrc || el.src, alt: el.alt }));
    imgs.forEach((el, i) => {
      el.addEventListener("click", () => open(list, i));
    });
  });

  overlay.querySelector(".lightbox-close").addEventListener("click", close);
  overlay.querySelector(".lightbox-prev").addEventListener("click", () => show(currentIndex - 1));
  overlay.querySelector(".lightbox-next").addEventListener("click", () => show(currentIndex + 1));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(currentIndex - 1);
    if (e.key === "ArrowRight") show(currentIndex + 1);
  });

  // Balayage tactile (mobile)
  let touchStartX = null;
  overlay.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].clientX; });
  overlay.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) show(currentIndex + (dx < 0 ? 1 : -1));
    touchStartX = null;
  });
})();
