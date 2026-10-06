# Site restaurant — base Ed Creative Studio

Site vitrine statique pour restaurant, bilingue (français / anglais), léger pour
les petits réseaux. Première déclinaison : **Tropical Resto-bar** (Vaudreuil,
Cap-Haïtien).

Aucune dépendance, aucun framework. Un petit script Node génère les pages HTML à
partir d'un seul fichier de contenu.

## Structure

```
src/content.mjs      ← TOUT le contenu : infos, horaires, textes FR/EN, carte, thème
src/assets/style.css ← mise en page (utilise uniquement les variables du thème)
src/assets/app.js    ← statut ouvert/fermé, onglets de la carte, formulaire WhatsApp, galerie
src/assets/fonts/    ← polices auto-hébergées (aucune requête vers Google)
src/images/          ← photos (WebP, 900 px de large max, 30 à 120 Ko)
src/icons/           ← favicon et icônes d'écran d'accueil
build.mjs            ← génère dist/ (une page par langue + page 404)
netlify.toml         ← Netlify lance `node build.mjs` et publie dist/
```

Ce qui est publié en ligne, c'est uniquement `dist/`. Ce README et le dossier
`docs/` ne sont pas accessibles depuis le site.

## Travailler en local

```bash
node build.mjs                          # génère dist/
python -m http.server 4321 -d dist      # puis ouvrir http://localhost:4321
```

Relancer `node build.mjs` après chaque modification.

## Mettre en ligne

Le dépôt GitHub est relié à Netlify : chaque push sur `main` met le site à jour
automatiquement. Une Pull Request crée une adresse de prévisualisation sans
toucher au site en ligne.

## Modifier le contenu courant

Tout se fait dans `src/content.mjs` :

- **Un prix ou un plat** : section `menu`. Chaque plat est une ligne
  `{ name: { fr, en }, desc: { fr, en }, price: 1000, star: true }`.
  `desc` et `star` (coup de cœur) sont facultatifs. Pour une fourchette de prix,
  utiliser `priceLabel: "2 500 – 4 000 G"` au lieu de `price`.
- **Les horaires** : `site.hours` (0 = dimanche). Le badge « Ouvert / Fermé »,
  le tableau des horaires et la vérification du formulaire suivent
  automatiquement.
- **Le numéro WhatsApp** : `site.whatsapp` (format international sans « + »).

## Adapter à un nouveau restaurant

Voir [`docs/NOUVEAU-RESTAURANT.md`](docs/NOUVEAU-RESTAURANT.md).

## Sujets mis de côté

Voir [`docs/A-REPRENDRE.md`](docs/A-REPRENDRE.md) (SEO, nom de domaine, espace
admin).
