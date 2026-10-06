# Adapter la base à un nouveau restaurant

Objectif : un nouveau client ne doit pas reconnaître le site du Tropical. Il faut
changer le contenu, mais aussi l'identité visuelle.

## 1. Copier la base

Créer un nouveau dépôt à partir de celui-ci (ou copier le dossier sans `.git`),
puis un nouveau site Netlify relié à ce dépôt.

## 2. Contenu (`src/content.mjs`)

Remplacer dans l'ordre :

1. `site` : nom, logo, numéro WhatsApp, téléphones, adresse, lien Google Maps,
   réseaux sociaux, horaires, fuseau horaire (`timezone`).
2. `copy` : tous les textes de la page, en français et en anglais. Les trois
   « chiffres clés » de la section d'intro (`copy.intro.facts`) sont à réécrire
   pour chaque restaurant.
3. `menu` : la carte complète.
4. Les listes d'images (`copy.hero.image`, `copy.intro.images`,
   `copy.gallery.images`, `copy.events.image`) avec leurs dimensions réelles.

Une section dont le restaurant n'a pas besoin (par exemple « Événements ») se
retire dans `build.mjs` (bloc `<section class="events">`) et dans la liste
`navItems`.

## 3. Identité visuelle (`theme` en bas de `src/content.mjs`)

C'est ce qui rend le site méconnaissable :

- **Couleurs** : deux palettes, `theme.dark` et `theme.light` (fonds `bg`,
  `bgRaised`, `bgSoft` ; textes `ink`, `inkSoft` ; une seule couleur forte
  `accent`, prise dans le logo ; filets `line`). Le visiteur passe de l'une à
  l'autre avec le bouton soleil/lune ; `theme.defaultMode` choisit celle
  affichée à la première visite. Prévoir deux logos : `site.logo.src` (mode
  sombre) et `site.logo.srcLight` (mode clair).
- **Polices** : télécharger deux nouvelles polices en `.woff2` (sous-ensemble
  latin) dans `src/assets/fonts/`, mettre à jour les `@font-face` en haut de
  `style.css`, les deux `<link rel="preload">` dans `build.mjs` et
  `theme.fonts`. Exemples d'associations : Fraunces + Inter Tight, Playfair
  Display + DM Sans, Bricolage Grotesque seule.
- **Arrondi** : `theme.radius` (0 px pour un style brut, 24 px pour un style
  doux).

## 4. Images et icônes

- Photos en WebP. Pour les grandes photos (haut de page, intro), prévoir
  deux tailles et les déclarer dans `srcset` : une de 640 px pour les
  téléphones, une de 1 100 à 1 400 px pour les ordinateurs.
- Une photo peut cacher des photos supplémentaires (`more: [...]`) : elles ne
  s'affichent pas sur la page, seulement dans la galerie plein écran quand on
  clique dessus (pastille « +1 » sur la photo).
- Régénérer le favicon et les icônes (`src/icons/`) à partir du nouveau logo :
  favicon.ico (16/32/48), favicon-32.png, apple-touch-icon.png (180),
  icon-192.png et icon-512.png.

## 5. Vérifier

```bash
node build.mjs && python -m http.server 4321 -d dist
```

Contrôler les deux langues (`/` et `/en/`), le badge ouvert/fermé, le formulaire
(date passée, heure de fermeture) et l'affichage sur téléphone.
