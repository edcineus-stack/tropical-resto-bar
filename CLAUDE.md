# Projet Tropical Resto-bar — état et historique

À lire en premier en reprenant ce projet. Toujours répondre en français :
Ed ne lit pas l'anglais.

## En une phrase

Site vitrine du Tropical Resto-bar (77, Vaudreuil, Route Nationale #1,
Cap-Haïtien), fait par Ed Creative Studio pour l'oncle d'Ed. Le site sert
maintenant aussi de **base démo à adapter pour d'autres restaurants**. Un
nouveau client ne doit pas reconnaître la même base.

## Où sont les choses

| Quoi | Où |
|---|---|
| Site en ligne | https://tropical-resto-bar.netlify.app (FR) et `/en/` (EN) |
| Hébergement | Netlify, projet `tropical-resto-bar` (équipe d'Ed) |
| Code source | GitHub `edcineus-stack/tropical-resto-bar` (public), branche `main` |
| Copie locale | `OneDrive\Documents\ED CREATIVE STUDIO\Projets\Client\Tropical Resto Bar\tropical-resto-bar` |
| Photos sources (PNG) | `tropical-resto-bar\Nouvelles Photos\`, exclu de Git |
| Menu papier (photos) | `Tropical Resto Bar\New Menu\` |

Les zips et le dossier `tropical-site\` situés à côté du dépôt sont les
**anciennes versions amateur** (août 2026). Ils sont obsolètes et ne servent
plus.

## Comment ça marche

- `src/content.mjs` : tout le contenu. Infos, téléphones, WhatsApp, horaires,
  textes FR/EN, carte (menu) complète, photos et thème (palettes claire et
  sombre, polices).
- `build.mjs` : génère `dist/` sans dépendance (`node build.mjs`). Il produit
  une page par langue, une page 404, le manifest et les en-têtes `_headers`.
- `src/assets/style.css` : mise en page. Il n'utilise que des variables CSS,
  jamais de couleur en dur.
- `src/assets/app.js` : badge ouvert/fermé (heure d'Haïti), onglets de la
  carte, formulaire → WhatsApp avec vérification de la date et des horaires,
  galerie plein écran, mode clair/sombre (mémorisé dans `localStorage`).
- `netlify.toml` : Netlify lance `node build.mjs` et publie `dist/`. Le README
  et `docs/` ne sont donc pas accessibles en ligne.

Prévisualiser en local :

```bash
node build.mjs && python -m http.server 4321 -d dist
```

Mettre en ligne : chaque push sur `main` déploie automatiquement. Pour faire
valider Ed avant, passer par une Pull Request : Netlify crée une adresse
`deploy-preview-N--tropical-resto-bar.netlify.app`.

## Ce qui a été fait (octobre 2026)

**6 octobre — diagnostic puis refonte complète (PR #1, fusionnée)**
- La version en ligne était celle du 26/08 (« Modif Contact et lien Admin »).
  Le nouveau menu et les nouveaux horaires étaient déjà en ligne : vérifié
  plat par plat contre les photos du menu papier.
- Passage d'un site amateur (HTML + `menu-data.js`) à une base générée depuis
  `src/content.mjs`, bilingue FR/EN, avec la carte écrite dans le HTML.
- Nouveau design : sombre « nuit tropicale », or du logo, polices
  auto-hébergées (Instrument Serif + Manrope), carte par onglets, galerie,
  section Événements, horaires avec le jour en cours, bouton WhatsApp
  flottant, favicon et icônes tirés du logo.
- Numéro WhatsApp des réservations choisi par Ed : **+509 44 68 4449**.
  Numéro +509 43 06 2357 retiré (douteux) et mention « Numéros à confirmer »
  retirée.
- Retirés : la page admin (Supabase jamais branché, mot de passe par défaut
  public), le bouton « Envoyer par email » (sans destinataire) et le README
  servi en ligne.

**6 octobre — retours d'Ed**
- Photos retravaillées par Ed : façade en haut de page, terrasse améliorée
  dans l'intro, deuxième terrasse (terrasse couverte) visible seulement dans
  la galerie plein écran (pastille « +1 », flèche pour passer à la suivante).
  Photos en deux tailles (640 px et grande) via `srcset`.
- Un seul bouton de langue : EN sur la page française, FR sur la page
  anglaise.
- Mode clair/sombre avec un bouton soleil/lune. Sombre par défaut, logo foncé
  dédié au mode clair.

**6 octobre — mobile**
- Haut de page plus compact sur téléphone : l'adresse et le numéro sont
  visibles sans défiler (testé de l'iPhone SE à l'iPhone 14).

Ed a validé le résultat (« travail magnifique »). Tout est en ligne.

## Mis de côté volontairement — ne pas relancer sans qu'Ed le demande

Détails dans `docs/A-REPRENDRE.md`.
- **SEO** : attend un nom de domaine et un client confirmé.
- **Espace admin** (Supabase) : le compte Supabase gratuit d'Ed est plein
  (2 projets).
- **Réservations par email** : WhatsApp suffit pour l'instant.

## Points ouverts

- L'oncle ne donne plus de nouvelles depuis mi-août 2026. Le site sert donc
  surtout de démo pour démarcher d'autres restaurants.
- Les rubriques Petit-déjeuner et Boissons n'ont pas pu être vérifiées contre
  le menu papier (pas de photo de ces pages).
- Pour adapter la base à un nouveau restaurant : `docs/NOUVEAU-RESTAURANT.md`.

## Préférences d'Ed sur ce projet

- Expliquer en français simple, Ed n'est pas développeur de métier.
- Vérifier sur mobile avant chaque mise en ligne. Ed regarde le site
  surtout sur téléphone.
- Quand Ed dit « pousse et déploie », il autorise la mise en ligne directe
  sur `main`.
