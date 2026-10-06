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

- **Couleurs** : `bg`, `bgRaised`, `bgSoft` (fonds), `ink`, `inkSoft` (textes),
  `accent` (une seule couleur forte, prise dans le logo), `line`.
  Le Tropical est en mode sombre « nuit tropicale ». Pour un autre restaurant,
  un thème clair fonctionne aussi : fond crème, texte presque noir, accent
  tiré du logo. Dans ce cas, remplacer `color-scheme: dark` par
  `color-scheme: light` dans `style.css` (champs du formulaire).
- **Polices** : télécharger deux nouvelles polices en `.woff2` (sous-ensemble
  latin) dans `src/assets/fonts/`, mettre à jour les `@font-face` en haut de
  `style.css`, les deux `<link rel="preload">` dans `build.mjs` et
  `theme.fonts`. Exemples d'associations : Fraunces + Inter Tight, Playfair
  Display + DM Sans, Bricolage Grotesque seule.
- **Arrondi** : `theme.radius` (0 px pour un style brut, 24 px pour un style
  doux).

## 4. Images et icônes

- Photos en WebP, 900 px de large maximum, 30 à 120 Ko.
- Régénérer le favicon et les icônes (`src/icons/`) à partir du nouveau logo :
  favicon.ico (16/32/48), favicon-32.png, apple-touch-icon.png (180),
  icon-192.png et icon-512.png.

## 5. Vérifier

```bash
node build.mjs && python -m http.server 4321 -d dist
```

Contrôler les deux langues (`/` et `/en/`), le badge ouvert/fermé, le formulaire
(date passée, heure de fermeture) et l'affichage sur téléphone.
