# Site Tropical Resto-bar

Site statique, ultra léger (pas de framework), pensé pour bien passer même
avec un mauvais réseau. À héberger gratuitement (Netlify, Vercel, GitHub
Pages...) — aucun serveur nécessaire pour l'essentiel du site.

## Fichiers

- `index.html` — la page du site (accueil, menu, galerie, adresse, réservation)
- `admin.html` + `admin.js` — page privée pour afficher/masquer la réservation
- `style.css` — tous les styles
- `menu-data.js` — le contenu du menu (facile à modifier, pas de HTML à toucher)
- `config.js` — **le seul fichier à modifier** pour brancher WhatsApp, l'email et l'admin
- `script.js` — logique du site public
- `images/` — photos compressées

## 1. Mettre en ligne (gratuit)

Le plus simple : [Netlify Drop](https://app.netlify.com/drop) — glisser-déposer
le dossier entier du site, et il est en ligne en quelques secondes avec une
adresse `https://xxxx.netlify.app`. Un nom de domaine (ex: `tropical-ht.com`)
peut être branché dessus plus tard, gratuitement aussi.

## 2. Activer l'envoi par email (Formspree, gratuit)

1. Aller sur [formspree.io](https://formspree.io), créer un compte gratuit.
2. Créer un formulaire, copier l'URL du type `https://formspree.io/f/abcdwxyz`.
3. Dans `config.js`, coller cette URL dans `formspreeEndpoint`.

Sans cette étape, le bouton "Envoyer par email" ouvrira simplement l'app
mail du visiteur avec le message pré-rempli — ça fonctionne aussi, juste
moins automatique.

## 3. Activer l'interrupteur réservation (Supabase, gratuit)

Cet interrupteur doit être visible par **tous** les visiteurs du site (pas
juste sur ton téléphone), il a donc besoin d'un petit espace de stockage
partagé. Tu utilises déjà Supabase pour TiMache — même principe ici, en
beaucoup plus simple.

1. Sur [supabase.com](https://supabase.com), créer un nouveau projet (gratuit).
2. Dans l'éditeur SQL du projet, exécuter :

```sql
create table site_settings (
  id int primary key,
  reservations_visible boolean not null default true
);
insert into site_settings (id, reservations_visible) values (1, true);

alter table site_settings enable row level security;

create policy "public read" on site_settings
  for select using (true);

create policy "public update" on site_settings
  for update using (true);
```

   Note : cette table ne contient qu'un seul interrupteur, rien de sensible —
   la rendre modifiable publiquement via la clé anonyme est un compromis
   acceptable pour ce cas précis. Si tu veux la sécuriser davantage plus
   tard, on peut passer par une Supabase Edge Function protégée par mot de
   passe côté serveur.

3. Dans *Project Settings → API*, copier l'**URL du projet** et la clé
   **anon public**.
4. Coller les deux dans `config.js` (`supabaseUrl` et `supabaseAnonKey`).

Tant que ces deux champs sont vides, la section réservation reste toujours
affichée par défaut.

## 4. Se connecter à l'admin

Aller sur `tonsite.com/admin.html`. Mot de passe par défaut : `tropical2026`
— **à changer avant la mise en ligne**.

Pour changer le mot de passe : demande à Claude de calculer l'empreinte
SHA-256 de ton nouveau mot de passe, et remplace `adminPasswordHash` dans
`config.js`. (Le mot de passe n'est jamais écrit "en clair" dans le code,
seulement son empreinte.)

## 5. Modifier le menu ou les prix

Tout se passe dans `menu-data.js` : chaque plat est une ligne
`{ name: "...", desc: "...", price: 1000 }`. Le `desc` et le `star: true`
(coup de cœur ⭐) sont optionnels.

## 6. Remplacer/ajouter des photos

Ajoute les fichiers dans `images/`, en `.webp` de préférence et pas plus de
900px de large (poids visé : 30 à 100 Ko par photo) pour rester léger sur
petit réseau. Puis référence-les dans `index.html`.

## Pourquoi ces choix techniques

- **Pas de police externe** téléchargée (Google Fonts, etc.) : le style
  utilise les polices déjà présentes sur le téléphone du visiteur, donc zéro
  requête réseau en plus pour l'affichage du texte.
- **Images compressées en WebP**, chargées en `lazy` (seule la photo
  d'accueil se charge tout de suite, le reste seulement au scroll).
- **Pas de framework JS** (React, etc.) — juste du JavaScript simple,
  quelques Ko en tout.
- Le menu vient d'un fichier de données, pas de scans du menu papier —
  beaucoup plus rapide à charger et copiable/collable par les clients.
