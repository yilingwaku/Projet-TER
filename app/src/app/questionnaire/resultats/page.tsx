'use client';

import React from 'react';

import Bar from '@/components/Bar';
import LinkModal from '@/components/modal/LinkModal';

import { useUser } from '@/context/UserContext';

const Resultats = () => {
    const { questionnaire } = useUser();
  
    return (
        <>
            <Bar icon="TestTube" title="Résultats" color="#F9F7F7"/>

            <div className="view">
                <div className="thread">
                    <span className="sm-text">
                        Vous avez terminé le questionnaire. Voici les réponses que vous avez fournies.
                    </span>

                    { questionnaire && questionnaire.length > 0 ? (
                        questionnaire.map((item, index) => (
                            <div key={index} className="content">
                                <span className="md-text">{item.question}</span>
                                <ul className="pl-4 list-disc">
                                    {item.reponses.map((rep, idx) => (
                                        <li key={idx} className="sm-text">{rep}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <span className="md-text">Aucune réponse fournie.</span>
                    )}

                </div>
            </div>

            <LinkModal
                icon="Check"
                title="Valider"
                link="/acceuil"
                isDouble
                doubleIcon="RotateCcw"
                doubleTitle="Relancer"
                doubleLink="/questionnaire"
            />

        </>
    );
};

export default Resultats;