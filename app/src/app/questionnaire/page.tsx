"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const questions = [
    {
        question: "Quelles sont les pièces de votre appartement ou maison :",
        reponse: ["Cuisine", "Salon", "Salle de bain", "Chambre principale"]
    },
    {
        question: "Avez-vous des meubles encombrant ?",
        reponse: ["Oui", "Non"]
    },
    {
        question: "Utilisez-vous un équipement d’aide (canne, déambulateur, escalator …)?",
        reponse: ["Oui", "Non"]
    }
];

const questionnaire = () => {
    const [questionActuel, setQuestionActuel] = useState(0);
    const choix = [];

    const choixElement = (optionSelect) => {
        if (choix.indexOf(optionSelect) == -1) {
            choix.push(optionSelect);
        }


        const nextQuestion = questionActuel + 1;
        if (nextQuestion < questions.length) {
            setQuestionActuel(nextQuestion);
        }
    }

    return (
        <>
            <div className="view">
                <div className="thread">
                    <div>
                        <h4>{questions[questionActuel].question}</h4>
                        {questions[questionActuel].reponse.map(option => (
                            <button
                                key={option}
                                onClick={() => choixElement(option)}
                                style={{
                                    margin: "5px",
                                    padding: "10px",
                                    display: "block",
                                    width: "100%",
                                    maxWidth: "300px"
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}

export default Questionnaire;