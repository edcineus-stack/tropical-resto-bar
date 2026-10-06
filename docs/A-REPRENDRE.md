# Sujets mis de côté (octobre 2026)

Décidés hors périmètre pour l'instant. À reprendre quand un restaurant prend le
site et qu'un nom de domaine est choisi.

## SEO (attend un nom de domaine)

- Nom de domaine personnalisé (ex. `tropicalrestobar.ht` ou `.com`) branché sur
  Netlify.
- `robots.txt` et `sitemap.xml` (avec les deux langues).
- Balises `canonical` et `hreflang` avec l'URL complète (aujourd'hui en
  relatif).
- Image de partage Open Graph / Twitter (1200 × 630) et balises `og:*`.
- Données structurées Schema.org `Restaurant` : adresse, téléphone, horaires
  (`openingHoursSpecification`), carte (`hasMenu`), fourchette de prix. Tout est
  déjà dans `src/content.mjs`, il suffit de générer le JSON-LD dans `build.mjs`.
- Fiche Google Business Profile à relier au site.
- Mot-clé local dans les titres (« restaurant Cap-Haïtien »).

Point déjà réglé : la carte est maintenant écrite directement dans le HTML
(lisible par Google), plus générée en JavaScript.

## Espace admin (attend une place sur Supabase)

L'ancienne page `admin.html` a été retirée : Supabase n'avait jamais été
configuré, et le mot de passe par défaut était visible dans le README public.

Idée de reprise : un petit espace où le restaurant modifie lui-même la carte,
les prix, les horaires et ouvre/ferme les réservations. Options :

- Supabase (nécessite un projet libre sur le compte gratuit) avec
  authentification réelle, pas un mot de passe dans le code ;
- ou Netlify CMS / Decap CMS branché sur le dépôt GitHub (pas de base de
  données, modifie directement `src/content.mjs`).

## Envoi des réservations par email

Retiré : le bouton ouvrait un email vide sans destinataire. Si un client veut
recevoir les réservations par email en plus de WhatsApp : Netlify Forms (à
activer dans le tableau de bord Netlify) ou Formspree.

## Points à faire confirmer par le client

- Le troisième numéro affiché auparavant (+509 43 06 2357) a été retiré : il
  différait d'un chiffre du numéro WhatsApp utilisé jusque-là (+509 43 06 2358).
- Les rubriques « Petit-déjeuner » et « Boissons » de la carte n'ont pas pu être
  comparées au menu papier (pas de photo de ces pages).
