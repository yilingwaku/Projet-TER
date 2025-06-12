const allQuestions = [
  {
    question: "Quelles sont les pièces de votre appartement ou maison :",
    options: [
      "Entrée",
      "Salon",
      "Cuisine",
      "Salle à manger",
      "Bureau ou espace de travail",
      "Chambre principale",
      "Chambre d’amis",
      "Salle de bain",
      "Salle de douche",
      "WC",
      "Buanderie",
      "Cellier",
      "Dressing",
      "Terrasse",
      "Balcon",
      "Jardin",
      "Patio",
      "Véranda",
      "Cave",
      "Grenier",
      "Garage",
      "Couloir",
      "Escalier",
      "Salle de multimédia",
      "Salle de musique",
      "Salle de sport",
      "Bibliothèque",
      "Atelier",
      "Piscine"
    ],
  },
  {
    question: "Dans votre entrée, quels sont vos équipementsv présent ?",
    options: [
      "Porte-manteau",
      "Console d'entrée",
      "Rangement chaussure",
      "Banc",
      "Tapis",
      "Porte-parapluie",
      "Détecteur de fumée"
    ],
  },
  {
    question:
      "Dans votre salon, quels sont les équipements que vous possédez ?",
    options: [
      "Canapé",
      "Canapé d’angle",
      "Chaise",
      "Table",
      "Table basse",
      "Commode",
      "Console",
      "Meuble Télé",
      "Vitrine",
      "Coffre",
      "Détecteur de fumée"
    ],
  },
  {
    question:
      "Dans votre cuisine, quels sont les appareils que vous possédez ?",
    options: [
      "Réfrigérateur",
      "Grille-pain",
      "Congélateur",
      "Gazinière",
      "Plaque à induction",
      "Four",
      "Friteuse électrique",
      "Machine à café",
      "Barbecue électrique",
      "Plancha",
      "Robot cuiseur",
      "Placard",
      "Détecteur de fumée",
      "Lave-vaisselle",
      "Lave-linge",
      "Sèche-linge"
    ],
  },
  {
    question: "Dans votre salle à manger, quels équipements parmi les suivants avez-vous ? ",
    options: [
      "Table à manger", 
      "Chaises",
      "Buffet", 
      "Suspension ou lustres",
      "Tapis",
      "Rideaux",
      "Nappe",
      "Vitrine",
      "Décoration murales",
      "Détecteur de fumée"
    ],
  },
  {
    question: "Dans votre chambre principale ou celle d'amis, quels sont les équimpements présent ?",
    options : [
      "Lit",
      "Commode",
      "Coffre",
      "Table de chevet",
      "Armoire",
      "Détecteur de fumée"
    ],
  },
  {
    question : "Dans votre salle de bain, salle de douche, vos équipements que celle-ci possède ?",
    options : [
      "Evier",
      "Douche",
      "Tapis",
      "Meuble",
      "Poubelle",
      "Rangement de douche",
      "Panier à linge",
      "Tabouret",
      "Marchepied",
      "Barre d'appui",
      "Lave-linge",
      "Sèche-linge"
    ],
  },
  {
    question:"Quels sont les équipements dans vos WC ?",
    options: [
      "Cadre de sécurité",
      "Meuble de rangement",
      "Poubelle",
      "Barre d'appui",
      "Abattant rehausseur"
    ],
  },
  {
    question : "Dans votre buanderie?",
    options : [
      "Sèche-linge",
      "Lave-linge",
      "Etendoir à linge",
      "Marchepied",
      "Tapis"
    ],
  },
  {
    question: "Quels slont les équipements que vous possédez sur votre terrasse, votre jardin, votre patio ?",
    options : [
      "Lit",
      "Fauteuil",
      "Canapé",
      "Bain de soleil",
      "Table",
      "Table basse"
    ],
  },
  {
    question : "Dans votre couloir, vous possédez ?",
    options: [
      "Coffre",
      "Meubles de rangement",
      "Meubles encombrants"
    ],
  },
  {
    question : "Quels sont les équipements dans votre escalier ?",
    options : [
      "Rambarde",
      "Marche antidérapante",
      "Rebord antidérapant",
      "Tapis d'escalier"
    ],
  },
  {
    question : "Vous avez une piscine, quels sont les équipements que vous possédez ?",
    options : [
      "Des marches à pente douce",
      "Un siège d'accès",
      "Une échelle à marche"
    ],
  }
];

export const getAllQuestions = () => {
  return allQuestions;
};