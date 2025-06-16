export type RiskItem = {
  title: string; // Title of the risk item
  isChecked: boolean; // Indicates if the item is checked (for user interaction)
  slug: string; // Slug for the risk item (used in the URL)
  risks: string; // Risks associated with the item
  where: string; // Locations where the risk is present
  prevents: string; // Preventive measures to mitigate the risk
};

export type Risk = {
  title: string; // Title of the risk
  icon: string; // Icon representing the risk (https://lucide.dev/icons/)
  slug: string; // Slug for the risk (used in the URL)
  resume: string; // Main description of the risk
  description: string; // Detailed description of the risk
  items: RiskItem[]; // List of items related to the risk
};

const risks: Risk[] = [
  {
    title: "Cuisine",
    icon: "Flame",
    slug: "cuisine",
    resume: "Attention aux accidents fréquents en cuisine.",
    description: "La cuisine est un lieu à haut risque pour les personnes âgées : brûlures, coupures, intoxications.",
    items: [
      {
        title: "",
        isChecked: false,
        slug: "",
        risks:"",
        where:"",
        prevents:""
      },
      {
        title: "Hotte",
        isChecked: false,
        slug: "incendie-intoxication",
        risks:"- Intoxication : Mauvaise installation ou hotte non entrenue\n - Incendie : La graisse peut s'infiltrer dans la hotte et prendre feu ",
        where:"Cuisine",
        prevents:"- Entrenir la hotte\n - Ouvrir les fenêtres régulièrement"
      },
      {
        title: "Four, Grille-pain,Friteuse,Plaque à induction",
        isChecked: false,
        slug: "incendie",
        risks:"- Incendie : Risque d'incendie sans une surveillance lors de l'utilisation",
        where:"Cuisine",
        prevents:"- Surveiller l'utilisation\n- Entretenir les appareils régulièrement\n- Mettre un chronomètre lors de l'utilisation de ses appareils"
      },
      {
        title: "Gazinière",
        isChecked: false,
        slug: "incendie-intoxication",
        risks:"- Incendie : Risque d'incendie par l'utilisation de la gazinière\n- Intoxication : Risque de laisser le gaz allumé",
        where:"Cuisine",
        prevents:"- Si une odeur forte se fait sentir, il faut ouvrir les fenêtres"
      },
      {
        title: "Lave-vaisselle ,Lave-linge, Sèche-linge",
        isChecked: false,
        slug: "chute-blessure",
        risks:"- Chute : Possibilité de se taper le pied et de chuter par la suite\n- Blessure : Possibilité de se prendre taper le pied et d'avoir un ecchymose",
        where:"Cuisine, SalleDeBain, SalleDeDouche, Buanderie",
        prevents:""
      },
      
      {
        title: "Placard",
        isChecked: false,
        slug: "chute",
        risks:"- Chute : Risque de chute si les placards sont trop haut\n- Blessure : Se prendre le coin de la porte du placard",
        where:"Cuisine,SalledeBain",
        prevents:"- Il faut mettre les placards à votre niveau, pas en hauteur\n- Mettre des rebords en caoutchouc pour éviter de se blesser"
      },
      {
        title: "Appareils Electriques",
        isChecked: false,
        slug: "incendie",
        risks:"- Incendie : ",
        where:"Cuisine,",
        prevents:"- Débrancher les appareils électroniques après leurs utilisations\n- Il faut éviter l'utilisation de plusieurs multiprises entre elles"
      },
      {
        title: "Coupures",
        isChecked: false,
        slug: "coupures-cuisine",
        risks: "- Coupures\n- Infections\n- Perte de dextérité ou vision.",
        where: "- Utilisation de couteaux\n- Boîtes de conserve\n- Objets en verre ou métal cassés",
        prevents: "- Utiliser des couteaux ergonomiques\n- Éviter les outils complexes\n- Demander de l'aide"
      },
      {
        title: "Intoxication alimentaire",
        isChecked: false,
        slug: "intoxication-alimentaire",
        risks: "- Intoxication grave\n- Affaiblissement du système immunitaire.",
        where: "- Aliments périmés\n- Mauvaise conservation\n- Mauvaise hygiène",
        prevents: "- Vérifier les dates de péremption\n- Maintenir le frigo à 4°C\n- Se laver les mains\n- Nettoyer les surfaces"
      }
    ]
  },
  {
    title: "Santé et soins",
    icon: "Cross",
    slug: "sante-et-soins",
    resume: "Gérer les risques liés à la santé au quotidien.",
    description: "Certaines habitudes de santé peuvent représenter un danger important à domicile.",
    items: [
      {
        title: "Intoxication par médicaments",
        isChecked: false,
        slug: "intoxication-medicaments",
        risks: "- Erreur de prise\n- Surdosage\n- Interactions dangereuses.",
        where: "- Salle de bain\n- Cuisine\n- Confusion des prises",
        prevents: "- Utiliser un pilulier\n- Lire les notices\n- Consulter médecin ou pharmacien\n- Ne pas modifier les doses sans avis"
      },
      {
        title: "Déshydratation",
        isChecked: false,
        slug: "deshydratation",
        risks: "- Confusion\n- Fatigue\n- Chutes\n- Aggravation de maladies.",
        where: "Partout",
        prevents: "- Boire régulièrement\n- Consommer des aliments riches en eau\n- Surveiller les signes : bouche sèche, fatigue"
      },
      {
        title: "Sport",
        isChecked: false,
        slug: "chute",
        risks:"- Chute",
        where:"Partout",
        prevents:""
      },
      {
        title: "Dénutrition",
        isChecked: false,
        slug: "denutrition",
        risks: "- Affaiblissement immunitaire\n- Chutes\n- Ralentissement de guérison.",
        where: "- Partout",
        prevents: "- Maintenir une alimentation équilibrée\n- Surveiller le poids\n- Consulter un diététicien"
      }
      
    ]
  },
  {
    title: "Équipements et installations",
    icon: "Zap",
    slug: "equipements",
    resume: "Assurer la sécurité des équipements domestiques.",
    description: "Les installations vétustes ou dangereuses augmentent les risques domestiques.",
    items: [
      {
        title: "Rampe d'accès, rambarde",
        isChecked: false,
        slug: "chute",
        risks: "- Chute : Glissade involontaire lors de la monter des escaliers",
        where: "Escalier",
        prevents: "- Mettre les rambardes sur tout les escaliers"
      },
      {
        title: "Tapis d'escalier, Sol antidérapant",
        isChecked: false,
        slug: "chute",
        risks: "- Chute : Glissade involontaire lors de la monter des escaliers",
        where: "Escalier",
        prevents: "- Mettre une protection supplémentaire sur le sol de l'escalier"
      },
      {
        title: "Douche + installation",
        isChecked: false,
        slug: "chute, noyade",
        risks:"- Chute : Possibilité de chute ren sortant d'une baignoire et de douche\n- Noyade :  Pour la cas d'un bain, une chute dans le bain et une perte de connaissance peut permettre la noyade",
        where:"SalleDeBain, SalleDeDouche",
        prevents:"- Priviligier une douche à un bain\n- Des tapis antidérapants\n- Siège de douche"
      },
      {
        title: "Détecteur de fumée",
        isChecked: false,
        slug: "intoxication-co",
        risks: "- Intoxication : Risque de ne pas percevoir un incendie à temps",
        where: "- Salle fermée",
        prevents: "- Mettre des détecteurs dans les pièces principales, cuisine, salon ou chambre\n- L'appareil doit être alimenté régulièrement, remettre des piles régulièrement "
      },
      {
        title: "Peinture antidérapante",
        isChecked: false,
        slug: "chute",
        risks:"- Chute : ",
        where:"",
        prevents:""
      },
    ]
  },
  {
    title: "Facteurs sociaux",
    icon: "Users",
    slug: "facteurs-sociaux",
    resume: "Garder le lien social pour prévenir d'autres risques.",
    description: "L'isolement ou la perte de contact social peut avoir des conséquences graves sur la santé.",
    items: [
      {
        title: "Isolement social",
        isChecked: false,
        slug: "isolement",
        risks: "- Perte d'appétit\n- Repli sur soi\n Développement de certaine maladie psychique ou physique",
        where: "La où le vent nous porte ",
        prevents: "- Maintenir des contacts réguliers en utilisant la visioconférence ou le téléphone\n- Participer à des activités sociales\n- "
      }
    ]
  },
  {
    title: "Eau et bain",
    icon: "Droplet",
    slug: "eau-et-bain",
    resume: "Sécuriser les zones avec de l'eau.",
    description: "L'eau représente un danger réel dans les domiciles, en particulier pour les personnes âgées.",
    items: [
      {
        title: "Noyade",
        isChecked: false,
        slug: "noyade",
        risks: "Perte de connaissance ou chute dans l'eau entraînant noyade.",
        where: "- Baignoire\n- Piscine\n- Plans d'eau à proximité",
        prevents: "- Ne jamais se baigner seul\n- Utiliser des équipements de sécurité\n- Limiter l'accès aux zones à risque"
      },
      {
        title: "Suffocation",
        isChecked: false,
        slug: "suffocation",
        risks: "- Asphyxie rapide\n- Fausse route alimentaire.",
        where: "Pendant les repas",
        prevents: "- Adapter la texture des aliments\n- Manger lentement et assis\n- Consulter un professionnel en cas de troubles de la déglutition"
      },
      {
        title: "Déshydratation",
        isChecked: false,
        slug: "deshydratation",
        risks: "- Confusion\n- Fatigue\n- Chutes\n- Aggravation de maladies.",
        where: "Partout",
        prevents: "- Boire régulièrement\n- Consommer des aliments riches en eau\n- Surveiller les signes : bouche sèche, fatigue"
      },
    ]
  }
];

export default risks;