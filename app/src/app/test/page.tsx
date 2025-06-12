"use client";

import React, { useState} from 'react';

import Bar from '@/components/Bar';

const Test = () => {

    const [text, setText] = useState('Je suis un assistant personnel qui aide les personnes âgées dans leur quotidien.');

    const speak = () => {
        if (typeof window !== 'undefined') {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        window.speechSynthesis.speak(utterance);
        }
    };

  return (
    <>
      <Bar icon="TestTube" title="Test" color="#F9F7F7" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Zone d'expérimentation pour tester des fonctionnalités ou des composants.
          </span>

          <div className='content'>


            <div className="tts-box p-4 border rounded max-w-md flex flex-col gap-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                />
                <button onClick={speak} className="border rounded max-w-md">
                    🔊 Lire à haute voix
                </button>
            </div>





          </div>

        </div>
      </div>
    </>
  );
};

export default Test;