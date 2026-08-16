// ============================================================
// CONFIGURATION — à modifier avec tes propres informations.
// Aucune autre partie du code n'a besoin d'être touchée.
// ============================================================
const SITE_CONFIG = {
  // Numéro WhatsApp du restaurant qui recevra les demandes de réservation.
  // Format international SANS le "+" ni espaces (ex: 50943062358).
  whatsappNumber: "50943062358",

  // Formulaire email gratuit (formspree.io). Voir README.md, étape 2,
  // pour créer le tien en 2 minutes. Laisse tel quel pour désactiver
  // l'envoi par email (seul WhatsApp fonctionnera).
  formspreeEndpoint: "", // ex: "https://formspree.io/f/abcdwxyz"

  // Connexion Supabase, utilisée UNIQUEMENT pour synchroniser
  // l'interrupteur "réservations visibles / masquées" entre tous
  // les visiteurs du site et la page admin.html.
  // Voir README.md, étape 3, pour la mise en place (gratuite).
  // Tant que c'est vide, la section réservation reste toujours visible.
  supabaseUrl: "",       // ex: "https://xxxxxxxx.supabase.co"
  supabaseAnonKey: "",   // clé "anon public" de ton projet Supabase

  // Mot de passe de la page /admin.html, converti en empreinte SHA-256.
  // Mot de passe par défaut : "tropical2026" — CHANGE-LE avant mise en ligne.
  // Pour générer une nouvelle empreinte : ouvre admin.html, section
  // "Changer le mot de passe" tout en bas de cette page, ou demande à Claude.
  adminPasswordHash: "b292e49d3067687d039387be5327a39a0cf4b0bf1f101ae24d0888a4b72fd4c5",
};
