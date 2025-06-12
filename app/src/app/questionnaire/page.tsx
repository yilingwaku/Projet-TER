'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getAllQuestions } from '@assets/data/questions';
import defaultRisks from '@assets/data/risks';

import Bar from '@/components/Bar';
import ActionModal from '@/components/modal/ActionModal';

import { useUser } from '@/context/UserContext';
import { useRisk } from '@/context/RiskContext';

const optionToQuestionMap = [
  { option: "Entrée", index: 1 },
  { option: "Salon", index: 2 },
  { option: "Cuisine", index: 3 },
  { option: "Salle à manger", index: 4 },
  { option: ["Chambre principale", "Chambre d'amis"], index: 5 },
  { option: ["Salle de bain", "Salle de douche"], index: 6 },
  { option: "WC", index: 7 },
  { option: "Buanderie", index: 8 },
  { option: ["Terrasse", "Jardin", "Patio"], index: 9 },
  { option: "Couloir", index: 10 },
  { option: "Escalier", index: 11 },
  { option: "Piscine", index: 12 },
];

const Questionnaire = () => {
    const router = useRouter();
    const { addQuestionnaireAnswer, questionnaire } = useUser();
    const { addRisks } = useRisk();

    const allQuestions = getAllQuestions();

    // L'index des questions, les réponses donnée par l'utilisateur, les checkbox selectionnées, les résultats
    // Et l'ordre des question
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [questionOrder, setQuestionOrder] = useState([0]);
    const currentQuestion = allQuestions[questionOrder[currentIndex]];

    // Modifie la sélection des options, lorsque un élément est décocher celui-ci est enlever
    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        if (checked) {
            setSelectedOptions((prev) => [...prev, id]);
        } else {
            setSelectedOptions((prev) => prev.filter((v) => v !== id));
        }
    };

    const isLastStep = () =>
        currentIndex + 1 === questionOrder.length &&
        (currentIndex !== 0 || selectedOptions.length === 0);

    // Affiche la question suivante
    const handleNext = () => {
        saveCurrentAnswer();

        // Logique spéciale après la première question
        if (currentIndex === 0) {
            if (currentIndex === 0) {
                optionToQuestionMap.forEach(({ option, index }) => {
                    const options = Array.isArray(option) ? option : [option];
                    const found = options.some(opt => selectedOptions.includes(opt));
                    if (found) {
                    setQuestionOrder((prev) => [...prev, index]);
                    }
                });
            }
        }

        const next = currentIndex + 1;
        if ( next < questionOrder.length || (currentIndex == 0 && selectedOptions.length > 0 )) {
            setCurrentIndex(next);
            setSelectedOptions([]);
        } else {
            setShowResults(true);
        }
    };

    // Sauvegarde la réponse actuelle de l'utilisateur
    const saveCurrentAnswer = () => {
        const questionIndex = questionOrder[currentIndex];
        const updatedAnswers = [...userAnswers];
        updatedAnswers[questionIndex] = {
            question: allQuestions[questionIndex].question,
            reponses: selectedOptions,
        };
        setUserAnswers(updatedAnswers);
    };

   useEffect(() => {
        if (showResults) {
            const data = questionOrder
            .map((index) => userAnswers[index])
            .filter(Boolean)
            .map((answer) => ({
                question: answer.question,
                reponses: answer.reponses,
            }));

            //set questionnaire
            addQuestionnaireAnswer(data);

            //set risks
            addRisks(defaultRisks);

            router.push('/questionnaire/resultats');
        }
        setShowResults(false);
    }, [showResults]);

    return (
        <>
            <Bar icon="CircleHelp" title="Questionnaire" color="#F9F7F7"/>

            <div className="view">
                <div className="thread">
                    <span className="sm-text">
                        Réponder aux questions pour personnaliser votre expérience dans l'application.
                    </span>

                    <div className='content'>
                        <div className='content'>
                            <span className="md-text">
                                {currentQuestion.question}
                            </span>
                        </div>
                    </div>

                    <div className='content'>

                        {currentQuestion.options.map((option) => (

                                <div key={option} className='checkbox-container'>
                                    <div
                                        className={`checkbox-item ${
                                        selectedOptions.includes(option) ? 'enabled' : ''
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            id={option}
                                            value={option}
                                            checked={selectedOptions.includes(option)}
                                            onChange={handleCheckboxChange}
                                        />
                                    </div>
                                    <span className="sm-text">
                                        {option}
                                    </span>
                                </div>
                        ))}

                    </div>

                </div>
            </div>

            <ActionModal
                icon={isLastStep() ? "CheckCheck" : "Check"}
                title={isLastStep() ? "Résultats" : "Valider"}
                onClick={handleNext}
            />

        </>
    );
};

export default Questionnaire;