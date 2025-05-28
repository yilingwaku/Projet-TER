"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ReponseQuest = {
  question: [],
  reponse : [],
}
const Questionnaire = () => {
  //Fichier des questions, toujours laisser en premieres questions les pièces de l'appartement
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
  //L'index des questions, les réponses donnée par l'utilisateur, les checkbox selectionnées, les résultats
  //Et l'ordre des question
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [questionOrder, setQuestionOrder] = useState([0]);
  const currentQuestion = allQuestions[questionOrder[currentIndex]];

  //Modifie la sélection des options, lorsque un élément est décocher celui-ci est enlever
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedOptions((prev) => [...prev, id]);
    } else {
      setSelectedOptions((prev) => prev.filter((v) => v !== id));
    }
  };
  //Affiche la question suivante
  const handleNext = () => {
    const questionIndex = questionOrder[currentIndex];

    // Enregistre les réponses
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = {
      question: allQuestions[questionIndex].question,
      reponses: selectedOptions,
    };
    setUserAnswers(updatedAnswers);

    // Logique spéciale après la première question
    if (currentIndex === 0) {
      const hasEntree = selectedOptions.includes("Entrée");
      const hasSalon = selectedOptions.includes("Salon");
      const hasCuisine = selectedOptions.includes("Cuisine");
      const hasSalleManger = selectedOptions.includes("Salle à manger");
      const hasBureau = selectedOptions.includes("Bureau ou espace de travail");
      const hasChambrePrinc = selectedOptions.includes("Chambre principale");
      const hasChambreAmis = selectedOptions.includes("Chambre d'amis");
      const hasSalleBain = selectedOptions.includes("Salle de bain");
      const hasSalleDouche = selectedOptions.includes("Salle de douche");
      const hasWC = selectedOptions.includes("WC");
      const hasBuanderie = selectedOptions.includes("Buanderie");
      const hasCellier = selectedOptions.includes("Cellier");
      const hasDressing = selectedOptions.includes("Dressing");
      const hasTerrasse = selectedOptions.includes("Terrasse");
      const hasBalcon = selectedOptions.includes("Balcon");
      const hasJardin = selectedOptions.includes("Jardin");
      const hasPatio = selectedOptions.includes("Patio");
      const hasVeranda = selectedOptions.includes("Véranda");
      const hasCave = selectedOptions.includes("Cave");
      const hasGrenier = selectedOptions.includes("Grenier");
      const hasGarage = selectedOptions.includes("Garage");
      const hasCouloir = selectedOptions.includes("Couloir");
      const hasEscalier = selectedOptions.includes("Escalier");
      const hasSalleMulti = selectedOptions.includes("Salle de multimédia");
      const hasSalleMusic = selectedOptions.includes("Salle de musique");
      const hasSalleSport = selectedOptions.includes("Salle de sport");
      const hasBibliothèque = selectedOptions.includes("Bibliothèque");
      const hasAtelier = selectedOptions.includes("Atelier");
      const hasPiscine = selectedOptions.includes("Piscine");

      if (hasEntree) {
        setQuestionOrder((prevOrder) => [...prevOrder, 1]);
      }
      if (hasSalon) {
        setQuestionOrder((prevOrder) => [...prevOrder, 2]);
      }
      if (hasCuisine) {
        setQuestionOrder((prevOrder) => [...prevOrder, 3]);
      }
      if (hasSalleManger) {
        setQuestionOrder((prevOrder) => [...prevOrder, 4]);
      }
      if (hasChambrePrinc||hasChambreAmis) {
        setQuestionOrder((prevOrder) => [...prevOrder, 5]);
      }
      if (hasSalleBain||hasSalleDouche) {
        setQuestionOrder((prevOrder) => [...prevOrder, 6]);
      }
      if (hasWC) {
        setQuestionOrder((prevOrder) => [...prevOrder, 7]);
      }
      if (hasBuanderie) {
        setQuestionOrder((prevOrder) => [...prevOrder, 8]);
      }
      if (hasTerrasse||hasJardin||hasPatio) {
        setQuestionOrder((prevOrder) => [...prevOrder, 9]);
      }
      if (hasCouloir) {
        setQuestionOrder((prevOrder) => [...prevOrder, 10]);
      }
      if (hasEscalier) {
        setQuestionOrder((prevOrder) => [...prevOrder, 11]);
      }
      if (hasPiscine) {
        setQuestionOrder((prevOrder) => [...prevOrder, 12]);
      }
    }

    const next = currentIndex + 1;
    if (
      next < questionOrder.length ||
      (currentIndex == 0 && selectedOptions.length > 0)
    ) {
      setCurrentIndex(next);
      setSelectedOptions([]);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h2>Résultats du questionnaire</h2>
        {questionOrder.map(
          (index, i) =>
            userAnswers[index] && (
              <div key={i}>
                <h4>{userAnswers[index].question}</h4>
                <ul>
                  {userAnswers[index].reponses.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>
        Question {currentIndex + 1} / {questionOrder.length}
      </h2>
      <h4>{currentQuestion.question}</h4>
      {currentQuestion.options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
      <button onClick={handleNext} style={{ marginTop: "10px" }}>
        {currentIndex + 1 === questionOrder.length &&
        (currentIndex != 0 || selectedOptions.length == 0)
          ? "Voir les résultats"
          : "Suivant"}
      </button>
    </div>
  );
};

export default Questionnaire;

