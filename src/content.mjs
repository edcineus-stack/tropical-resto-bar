// ============================================================
// CONTENU DU SITE — le seul fichier à adapter pour un nouveau restaurant.
// Textes bilingues : { fr: "...", en: "..." }. Une chaîne simple vaut
// pour les deux langues (noms propres, plats intraduisibles...).
// Le thème (couleurs, polices) est en bas du fichier.
// ============================================================

export const site = {
  name: "Tropical",
  fullName: "Tropical Resto-bar",
  tagline: { fr: "Resto-bar · Vaudreuil, Cap-Haïtien", en: "Restaurant & bar · Vaudreuil, Cap-Haïtien" },
  // `src` : logo pour le mode sombre, `srcLight` : logo pour le mode clair.
  logo: { src: "images/logo-gold.webp", srcLight: "images/logo-ink.webp", width: 392, height: 254, alt: "Tropical Resto-bar" },
  timezone: "America/Port-au-Prince",
  currency: "G",
  languages: ["fr", "en"],

  // Numéro WhatsApp qui reçoit les réservations (format international sans "+").
  whatsapp: "50944684449",
  phones: [
    { label: "+509 44 68 4449", tel: "+50944684449" },
    { label: "+509 56 81 9218", tel: "+50956819218" },
  ],
  address: {
    lines: ["77, Vaudreuil", "Route Nationale #1", "Cap-Haïtien, Haïti"],
    short: "77, Vaudreuil, Route Nationale #1",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tropical+Resto-bar+Vaudreuil+Route+Nationale+1+Cap-Haitien+Haiti",
  },
  socials: [
    { name: "Instagram", handle: "@tropicalrestohaiti", url: "https://www.instagram.com/tropicalrestohaiti/" },
  ],

  // Horaires : 0 = dimanche ... 6 = samedi. "24:00" = minuit.
  // Un jour sans créneau = fermé.
  hours: {
    0: [["15:00", "24:00"]],
    1: [["08:30", "23:00"]],
    2: [["08:30", "23:00"]],
    3: [["08:30", "23:00"]],
    4: [["08:30", "23:00"]],
    5: [["08:30", "24:00"]],
    6: [["08:30", "24:00"]],
  },

  credit: { name: "Ed Creative Studio", url: "https://wa.me/33766249742" },
};

// ---------- Textes de la page ----------
export const copy = {
  meta: {
    title: { fr: "Tropical Resto-bar — Vaudreuil, Cap-Haïtien", en: "Tropical Resto-bar — Vaudreuil, Cap-Haïtien" },
    description: {
      fr: "Tropical Resto-bar à Vaudreuil : cuisine haïtienne et internationale, terrasse ombragée, cocktails maison. Carte, horaires et réservation sur WhatsApp.",
      en: "Tropical Resto-bar in Vaudreuil, Cap-Haïtien: Haitian and international food, a shaded terrace and house cocktails. Menu, opening hours and WhatsApp booking.",
    },
  },
  nav: {
    menu: { fr: "La carte", en: "Menu" },
    gallery: { fr: "Galerie", en: "Gallery" },
    events: { fr: "Événements", en: "Events" },
    info: { fr: "Infos", en: "Visit" },
    book: { fr: "Réserver", en: "Book a table" },
    open: { fr: "Ouvrir le menu", en: "Open menu" },
    close: { fr: "Fermer le menu", en: "Close menu" },
    skip: { fr: "Aller au contenu", en: "Skip to content" },
    toLight: { fr: "Passer en mode clair", en: "Switch to light mode" },
    toDark: { fr: "Passer en mode sombre", en: "Switch to dark mode" },
    otherLang: { fr: "Version française", en: "English version" },
  },
  hero: {
    eyebrow: { fr: "Resto-bar à Vaudreuil", en: "Restaurant & bar in Vaudreuil" },
    title: { fr: "Un coin de tropiques,<br><em>à Vaudreuil.</em>", en: "A little piece of the tropics,<br><em>in Vaudreuil.</em>" },
    text: {
      fr: "Cuisine haïtienne et internationale, cocktails maison et une terrasse ombragée où l'on prend son temps.",
      en: "Haitian and international cooking, house cocktails and a shaded terrace made for slow afternoons.",
    },
    ctaMenu: { fr: "Voir la carte", en: "See the menu" },
    ctaBook: { fr: "Réserver une table", en: "Book a table" },
    image: {
      src: "images/facade.webp", width: 1086, height: 1448,
      srcset: [["images/facade-640.webp", 640], ["images/facade.webp", 1086]],
      alt: { fr: "Façade du Tropical Resto-bar, enseigne et entrée végétalisée", en: "Front of Tropical Resto-bar with its sign and planted entrance" },
    },
  },
  status: {
    open: { fr: "Ouvert", en: "Open" },
    closed: { fr: "Fermé", en: "Closed" },
    until: { fr: "jusqu'à", en: "until" },
    opensAt: { fr: "ouvre à", en: "opens at" },
    opensDay: { fr: "ouvre", en: "opens" },
    midnight: { fr: "minuit", en: "midnight" },
  },
  intro: {
    eyebrow: { fr: "L'adresse", en: "The place" },
    title: { fr: "Une terrasse sous les arbres, un bar, des murs peints à la main.", en: "A terrace under the trees, a bar, and walls painted by hand." },
    text: {
      fr: "Le Tropical a ouvert au cœur de Vaudreuil, sur la Nationale #1. On y vient pour un petit-déjeuner, un plat créole le midi, un cocktail en fin de journée — ou pour fêter quelque chose.",
      en: "Tropical opened in the heart of Vaudreuil, right on Route Nationale #1. Come for breakfast, a Creole lunch, a cocktail as the day cools down — or to celebrate something.",
    },
    facts: [
      { value: "8h30", label: { fr: "petit-déjeuner servi dès l'ouverture", en: "breakfast served from opening" } },
      { value: "12", label: { fr: "rubriques à la carte, du fritay au homard", en: "menu sections, from fritay to lobster" } },
      { value: "★", label: { fr: "les coups de cœur de la maison", en: "house favourites" } },
    ],
    images: [
      {
        src: "images/terrasse.webp", width: 1400, height: 933,
        srcset: [["images/terrasse-640.webp", 640], ["images/terrasse.webp", 1400]],
        alt: { fr: "Terrasse du Tropical devant le mur peint, clients attablés", en: "Tropical's terrace in front of the painted wall, guests at their tables" },
        // Photos visibles seulement dans la galerie plein écran, après celle-ci.
        more: [
          { src: "images/terrasse-animee.webp", width: 1400, height: 933, alt: { fr: "Terrasse couverte du Tropical sous le bâtiment, en journée", en: "Tropical's covered terrace under the building, during the day" } },
        ],
      },
      { src: "images/cocktails.webp", width: 800, height: 1068, alt: { fr: "Trois cocktails maison servis au bar", en: "Three house cocktails served at the bar" } },
    ],
  },
  menu: {
    eyebrow: { fr: "La carte", en: "The menu" },
    title: { fr: "À table", en: "What we serve" },
    text: { fr: "Prix en gourdes (G), service compris.", en: "Prices in Haitian gourdes (G), service included." },
    legend: { fr: "Coup de cœur de la maison", en: "House favourite" },
    all: { fr: "Tout", en: "All" },
  },
  gallery: {
    eyebrow: { fr: "Dans l'assiette", en: "On the plate" },
    title: { fr: "Ce qui sort de la cuisine", en: "Straight from the kitchen" },
    images: [
      { src: "images/plat-viande-riz.webp", width: 738, height: 984, alt: { fr: "Riz collé et viande en sauce, carottes et betteraves", en: "Rice and beans with meat in sauce, carrots and beetroot" } },
      { src: "images/soupe-fruits-mer.webp", width: 738, height: 984, alt: { fr: "Soupe aux fruits de mer avec langouste", en: "Seafood soup with spiny lobster" } },
      { src: "images/pizza.webp", width: 738, height: 984, alt: { fr: "Pizza pepperoni", en: "Pepperoni pizza" } },
      { src: "images/petit-dej.webp", width: 738, height: 984, alt: { fr: "Petit-déjeuner : omelette, avocat, tomate et pain grillé", en: "Breakfast plate: omelette, avocado, tomato and toast" } },
      { src: "images/dessert-pasteque.webp", width: 738, height: 984, alt: { fr: "Pastèque glacée servie en coupe", en: "Iced watermelon served in a glass" } },
      { src: "images/cafe-glace.webp", width: 800, height: 1064, alt: { fr: "Deux cafés glacés Tropical à emporter", en: "Two Tropical iced coffees to go" } },
      { src: "images/terrace-mural.webp", width: 900, height: 1198, alt: { fr: "Mur peint du Tropical et terrasse", en: "Tropical's painted wall and terrace" } },
    ],
  },
  events: {
    eyebrow: { fr: "Privatisation", en: "Private events" },
    title: { fr: "Anniversaire, baptême, fin d'année : la terrasse est à vous.", en: "Birthdays, christenings, year-end parties: the terrace is yours." },
    text: {
      fr: "Table dressée, décoration, menu adapté à votre budget. Dites-nous la date et le nombre d'invités, on s'occupe du reste.",
      en: "A dressed table, decorations and a menu that fits your budget. Tell us the date and the number of guests, we handle the rest.",
    },
    cta: { fr: "Parler de mon événement", en: "Plan my event" },
    whatsappText: {
      fr: "Bonjour, je voudrais organiser un événement au Tropical.",
      en: "Hello, I would like to host an event at Tropical.",
    },
    image: { src: "images/event-table.webp", width: 738, height: 984, alt: { fr: "Longue table dressée pour un événement privé", en: "Long table set for a private event" } },
  },
  info: {
    eyebrow: { fr: "Nous trouver", en: "Visit us" },
    title: { fr: "Infos pratiques", en: "Getting here" },
    address: { fr: "Adresse", en: "Address" },
    maps: { fr: "Itinéraire Google Maps", en: "Directions on Google Maps" },
    phone: { fr: "Téléphone", en: "Phone" },
    hours: { fr: "Horaires", en: "Opening hours" },
    today: { fr: "aujourd'hui", en: "today" },
    closedDay: { fr: "Fermé", en: "Closed" },
    follow: { fr: "Suivez-nous", en: "Follow us" },
    followText: { fr: "Soirées à thème, nouveautés et photos du jour.", en: "Theme nights, new dishes and today's photos." },
  },
  booking: {
    eyebrow: { fr: "Réservation", en: "Booking" },
    title: { fr: "Réserver une table", en: "Book a table" },
    text: {
      fr: "Remplissez le formulaire : WhatsApp s'ouvre avec votre demande déjà rédigée. Nous confirmons par retour de message.",
      en: "Fill in the form: WhatsApp opens with your request already written. We confirm by return message.",
    },
    name: { fr: "Nom complet", en: "Full name" },
    phone: { fr: "Téléphone / WhatsApp", en: "Phone / WhatsApp" },
    type: { fr: "Occasion", en: "Occasion" },
    types: [
      { value: { fr: "Table (repas)", en: "Table (meal)" } },
      { value: { fr: "Anniversaire", en: "Birthday" } },
      { value: { fr: "Événement privé", en: "Private event" } },
    ],
    date: { fr: "Date", en: "Date" },
    time: { fr: "Heure", en: "Time" },
    guests: { fr: "Personnes", en: "Guests" },
    notes: { fr: "Précisions (facultatif)", en: "Notes (optional)" },
    notesPlaceholder: { fr: "Allergies, décoration, chaise bébé…", en: "Allergies, decorations, high chair…" },
    submit: { fr: "Envoyer sur WhatsApp", en: "Send on WhatsApp" },
    call: { fr: "Ou appelez le", en: "Or call" },
    sent: { fr: "WhatsApp s'ouvre avec votre demande. Il ne reste qu'à appuyer sur Envoyer.", en: "WhatsApp is opening with your request. Just press Send." },
    errRequired: { fr: "Ce champ est requis.", en: "This field is required." },
    errPast: { fr: "Choisissez une date à partir d'aujourd'hui.", en: "Pick today or a later date." },
    errClosed: { fr: "Nous sommes fermés à cette heure-là. Horaires de ce jour :", en: "We are closed at that time. Hours that day:" },
    errClosedDay: { fr: "Nous sommes fermés ce jour-là.", en: "We are closed that day." },
    note: {
      fr: "La réservation n'est confirmée qu'après notre réponse.",
      en: "Your booking is confirmed once we reply.",
    },
    msgTitle: { fr: "Demande de réservation — Tropical Resto-bar", en: "Booking request — Tropical Resto-bar" },
  },
  footer: {
    credit: { fr: "Site réalisé par", en: "Website by" },
  },
  floating: { fr: "Écrire sur WhatsApp", en: "Message us on WhatsApp" },
  notFound: {
    title: { fr: "Page introuvable", en: "Page not found" },
    text: { fr: "Cette page n'existe pas ou a été déplacée.", en: "This page doesn't exist or has moved." },
    back: { fr: "Retour à l'accueil", en: "Back to the homepage" },
  },
  days: {
    fr: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
};

// ---------- La carte ----------
// price : nombre en gourdes. priceLabel : texte libre (fourchette...).
// star : coup de cœur. desc : facultatif.
export const menu = [
  {
    cat: { fr: "Entrées", en: "Starters" },
    items: [
      { name: { fr: "Crêpes salées", en: "Savoury crêpes" }, desc: { fr: "Poulet ou jambon, au choix", en: "Chicken or ham" }, price: 1000 },
      { name: "Acras", price: 500 },
      { name: { fr: "Acras de morue", en: "Salt cod acras" }, price: 500 },
      { name: { fr: "Marinades Tropical", en: "Tropical marinades" }, price: 400 },
      { name: "Fritay Tropical", desc: { fr: "Acras, plantains, marinades, chicken wings, pikliz et sauce", en: "Acras, plantains, marinades, chicken wings, pikliz and dip" }, price: 2000, star: true },
      { name: { fr: "Boulettes de bœuf", en: "Beef meatballs" }, price: 700 },
      { name: "Kibby", price: 600 },
    ],
  },
  {
    cat: { fr: "Burgers & sandwichs", en: "Burgers & sandwiches" },
    sub: { fr: "Chaque burger est servi avec des frites.", en: "Every burger comes with fries." },
    items: [
      { name: { fr: "Hamburger classique", en: "Classic hamburger" }, price: 1000 },
      { name: "Cheeseburger", price: 1250 },
      { name: { fr: "Sandwich au griot", en: "Griot sandwich" }, price: 1100 },
      { name: { fr: "Sandwich au poulet", en: "Chicken sandwich" }, desc: { fr: "Salade, fromage, tomate, oignons et sauce tropicale", en: "Lettuce, cheese, tomato, onions and tropical sauce" }, price: 1000 },
      { name: { fr: "Sandwich au jambon", en: "Ham sandwich" }, desc: { fr: "Salade, fromage, tomate, oignons et sauce tropicale", en: "Lettuce, cheese, tomato, onions and tropical sauce" }, price: 1000 },
      { name: "Burger Tropical", desc: { fr: "Galette de bœuf, homard, fromage, tomates, oignons", en: "Beef patty, lobster, cheese, tomatoes, onions" }, price: 1500, star: true },
      { name: { fr: "Hot-dog et frites", en: "Hot dog and fries" }, price: 800 },
      { name: { fr: "Kibby et frites", en: "Kibby and fries" }, price: 1000 },
    ],
  },
  {
    cat: { fr: "Viandes", en: "Meat" },
    sub: { fr: "Servis avec salade et deux accompagnements au choix.", en: "Served with salad and two sides of your choice." },
    items: [
      { name: { fr: "Cabri", en: "Goat" }, desc: { fr: "Frit ou en sauce", en: "Fried or in sauce" }, price: 2250 },
      { name: { fr: "Bœuf", en: "Beef" }, desc: { fr: "Frit ou en sauce", en: "Fried or in sauce" }, price: 1750 },
      { name: { fr: "Filet de bœuf", en: "Beef fillet" }, desc: { fr: "Sauce moutarde ou sauce au poivre", en: "Mustard or pepper sauce" }, price: 1750 },
      { name: { fr: "Filet de bœuf au vin rouge", en: "Beef fillet in red wine" }, price: 2000 },
      { name: { fr: "Griot de porc", en: "Pork griot" }, price: 1750 },
      { name: { fr: "Brochettes de bœuf", en: "Beef skewers" }, price: 1750 },
    ],
  },
  {
    cat: { fr: "Volailles", en: "Poultry" },
    sub: { fr: "Servies avec salade et deux accompagnements au choix.", en: "Served with salad and two sides of your choice." },
    items: [
      { name: { fr: "Poulet", en: "Chicken" }, desc: { fr: "Frit ou en sauce", en: "Fried or in sauce" }, price: 1500 },
      { name: { fr: "Poulet barbecue", en: "Barbecue chicken" }, price: 1750 },
      { name: "Chicken wings Tropical", price: 1500, star: true },
      { name: { fr: "Poulet pays aux noix", en: "Free-range chicken with cashews" }, price: 2250 },
      { name: { fr: "Dinde sautée aux légumes", en: "Turkey sautéed with vegetables" }, price: 1750 },
      { name: { fr: "Pintade flambée au rhum", en: "Guinea fowl flambéed in rum" }, price: 2500 },
      { name: { fr: "Pintade en sauce", en: "Guinea fowl in sauce" }, price: 2250 },
    ],
  },
  {
    cat: { fr: "Fruits de mer", en: "Seafood" },
    sub: {
      fr: "Servis avec salade et deux accompagnements : frites, pommes de terre sautées, bananes pesées, riz blanc ou riz collé aux pois.",
      en: "Served with salad and two sides: fries, sautéed potatoes, fried plantains, white rice or rice and beans.",
    },
    items: [
      { name: { fr: "Poisson entier", en: "Whole fish" }, desc: { fr: "En sauce ou frit, prix selon la taille", en: "In sauce or fried, priced by size" }, priceLabel: "2 500 – 4 000 G" },
      { name: { fr: "Poisson grillé", en: "Grilled fish" }, price: 2500 },
      { name: { fr: "Lambi en sauce", en: "Conch in sauce" }, price: 2500 },
      { name: { fr: "Lambi Tropical", en: "Tropical conch" }, price: 2700 },
      { name: { fr: "Homard en sauce créole", en: "Lobster in Creole sauce" }, price: 2500 },
      { name: { fr: "Homard grillé", en: "Grilled lobster" }, price: 2750 },
      { name: { fr: "Crevettes panées", en: "Breaded shrimp" }, price: 2250 },
      { name: { fr: "Crevettes en sauce", en: "Shrimp in sauce" }, desc: { fr: "Sauce rouge ou lait de coco", en: "Red sauce or coconut milk" }, price: 2250 },
      { name: "Seafood boil", desc: { fr: "Selon l'arrivage du marché", en: "Depending on the day's catch" }, price: 4000, star: true },
    ],
  },
  {
    cat: { fr: "Pâtes", en: "Pasta" },
    items: [
      { name: { fr: "Spaghetti bolognaise", en: "Spaghetti bolognese" }, price: 1250 },
      { name: "Spaghetti Tropical", desc: { fr: "Poulet, légumes et sauce blanche", en: "Chicken, vegetables and white sauce" }, price: 1350 },
      { name: { fr: "Macaroni au poulet", en: "Chicken macaroni" }, price: 1000 },
      { name: { fr: "Macaroni du chef", en: "Chef's macaroni" }, desc: { fr: "Porc, légumes et sauce soja", en: "Pork, vegetables and soy sauce" }, price: 1250, star: true },
    ],
  },
  {
    cat: "Pizzas",
    items: [
      { name: { fr: "Végétarienne ou fromage", en: "Vegetarian or cheese" }, price: 1700 },
      { name: "Haïti chérie", desc: { fr: "Sauce tomate, fromage, griot, oignons et piments doux", en: "Tomato sauce, cheese, griot, onions and sweet peppers" }, price: 2000, star: true },
      { name: { fr: "Poulet barbecue", en: "Barbecue chicken" }, desc: { fr: "Sauce barbecue, fromage, poulet et oignons", en: "Barbecue sauce, cheese, chicken and onions" }, price: 2000 },
      { name: { fr: "Hawaïenne", en: "Hawaiian" }, desc: { fr: "Sauce tomate, fromage, ananas, jambon et oignons", en: "Tomato sauce, cheese, pineapple, ham and onions" }, price: 2000 },
      { name: "Pepperoni", price: 1800 },
    ],
  },
  {
    cat: { fr: "Salades & soupes", en: "Salads & soups" },
    items: [
      { name: { fr: "Soupe au poulet", en: "Chicken soup" }, price: 800 },
      { name: { fr: "Soupe aux fruits de mer", en: "Seafood soup" }, price: 1250 },
      { name: { fr: "Salade Tropical", en: "Tropical salad" }, desc: { fr: "Laitue, tomates, bacon, oignons, crevettes et vinaigrette", en: "Lettuce, tomatoes, bacon, onions, shrimp and vinaigrette" }, price: 1500 },
      { name: { fr: "Salade au poulet", en: "Chicken salad" }, price: 1000 },
    ],
  },
  {
    cat: { fr: "Petit-déjeuner", en: "Breakfast" },
    sub: { fr: "Servi avec une tasse de thé ou de café.", en: "Served with a cup of tea or coffee." },
    items: [
      { name: { fr: "Omelette", en: "Omelette" }, desc: { fr: "Végétarienne ou jambon, avec du pain", en: "Vegetarian or ham, with bread" }, price: 500 },
      { name: { fr: "Œufs sur le plat", en: "Fried eggs" }, desc: { fr: "Avec du pain", en: "With bread" }, price: 750 },
      { name: { fr: "Œufs brouillés", en: "Scrambled eggs" }, desc: { fr: "Avec du pain", en: "With bread" }, price: 750 },
      { name: { fr: "Œufs créole au hareng", en: "Creole eggs with herring" }, desc: { fr: "Avec du pain", en: "With bread" }, price: 750 },
      { name: { fr: "Assiette Tropical", en: "Tropical plate" }, desc: { fr: "Œufs, pancakes et fruits frais", en: "Eggs, pancakes and fresh fruit" }, price: 1200, star: true },
      { name: { fr: "Crêpe Nutella & banane", en: "Nutella & banana crêpe" }, price: 700 },
      { name: { fr: "Croissant jambon-fromage", en: "Ham & cheese croissant" }, price: 800 },
      { name: { fr: "Sandwich au jambon", en: "Ham sandwich" }, price: 500 },
      { name: { fr: "Pain perdu", en: "French toast" }, price: 700 },
      { name: { fr: "Pancakes du chef", en: "Chef's pancakes" }, price: 800 },
      { name: "Spaghetti", desc: { fr: "Aransò ou jambon", en: "Smoked herring (aransò) or ham" }, price: 750 },
      { name: { fr: "Sandwich aux œufs", en: "Egg sandwich" }, price: 400 },
      { name: { fr: "Bananes et foie", en: "Plantains and liver" }, price: 1000 },
      { name: { fr: "Bananes et œufs", en: "Plantains and eggs" }, price: 800 },
      { name: { fr: "Avoine", en: "Oatmeal" }, price: 600 },
      { name: { fr: "Plateau de fruits", en: "Fruit platter" }, price: 750 },
    ],
  },
  {
    cat: "Desserts",
    items: [
      { name: { fr: "Blanc-manger", en: "Blancmange" }, price: 400 },
      { name: "Brownies", price: 300 },
      { name: { fr: "Gâteau renversé à l'ananas", en: "Pineapple upside-down cake" }, price: 350, star: true },
      { name: { fr: "Crème glacée — 12 oz", en: "Ice cream — 12 oz" }, price: 500 },
      { name: { fr: "Crème glacée — 16 oz", en: "Ice cream — 16 oz" }, price: 750 },
      { name: { fr: "Crème glacée — coupe", en: "Ice cream — sundae glass" }, price: 400 },
    ],
  },
  {
    cat: { fr: "Boissons", en: "Drinks" },
    items: [
      { name: { fr: "Café glacé", en: "Iced coffee" }, price: 500 },
      { name: "Cappuccino", price: 500 },
      { name: { fr: "Chocolat chaud haïtien", en: "Haitian hot chocolate" }, price: 600 },
      { name: { fr: "Jus naturel", en: "Fresh juice" }, price: 400 },
      { name: "Smoothie", price: 700 },
      { name: "Milkshake / Frappuccino", price: 1000 },
    ],
  },
  {
    cat: { fr: "Accompagnements", en: "Sides" },
    items: [
      { name: { fr: "Frites", en: "Fries" }, price: 500 },
      { name: { fr: "Pommes de terre sautées", en: "Sautéed potatoes" }, price: 500 },
      { name: { fr: "Bananes pesées", en: "Fried plantains" }, price: 500 },
      { name: { fr: "Riz blanc", en: "White rice" }, price: 500 },
      { name: { fr: "Riz collé aux pois", en: "Rice and beans" }, price: 500 },
      { name: { fr: "Légumes sautés", en: "Sautéed vegetables" }, price: 500 },
    ],
  },
];

// ---------- Thème ----------
// Changer ces valeurs suffit à donner une autre identité au site.
// Deux modes : le visiteur bascule avec le bouton soleil/lune.
export const theme = {
  defaultMode: "dark",
  dark: {
    bg: "#14170F",        // fond principal (nuit, vert très sombre)
    bgRaised: "#1C2016",  // fond des blocs
    bgSoft: "#232819",    // survols, lignes
    ink: "#F2EAD6",       // texte principal
    inkSoft: "#B9B19B",   // texte secondaire
    line: "#343A27",      // filets
    accent: "#DDBE7E",    // or du logo
    accentInk: "#17150E", // texte posé sur l'accent
    leaf: "#7E9A5B",      // vert feuille (statut ouvert)
    alert: "#E07A5F",     // erreurs, fermé
  },
  light: {
    bg: "#F5EFE3",
    bgRaised: "#ECE3D1",
    bgSoft: "#E2D7C0",
    ink: "#1E2016",
    inkSoft: "#5D5848",
    line: "#D6C9AE",
    accent: "#87672B",
    accentInk: "#FFF8EC",
    leaf: "#4C6A33",
    alert: "#B0452C",
  },
  fonts: {
    display: "'Instrument Serif', Georgia, serif",
    body: "'Manrope', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  radius: "14px",
};
