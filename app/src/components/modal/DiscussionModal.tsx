import React, { useState, useEffect } from "react";

import { useSpeechRecognition } from 'react-speech-recognition';

import ActionButton from "../button/ActionButton";
import TextInput from "../text/TextInput";
import SpeechInput from "../text/SpeechInput";

const DiscussionModal = ({ prompt, setPrompt, onSend, isLoading }: {
  prompt: string,
  setPrompt: (value: string) => void,
  onSend: () => void
}) => {

  const [isWriting, setIsWriting] = useState(false);
  const [isDictating, setIsDictating] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  const {
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setIsSpeechSupported(false);
      return;
    }
    setIsSpeechSupported(true);
  }, [browserSupportsSpeechRecognition]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setIsWriting(false);
      onSend?.();
    }
  };

  return (
    <>
      <div className="modal">
        {!isWriting && !isDictating && (
          <div className="modal-container">
            <div className="modal-item">
              <ActionButton isSecondary={isSpeechSupported} isDisable={isLoading} icon="PenLine" text="Écrire" onClick={() => setIsWriting(true)}/>
              {isSpeechSupported && (
                <ActionButton isDisable={isLoading} icon="MicVocal" text="Dicter" onClick={() => setIsDictating(true)} />
              )}
            </div>
          </div>
        )}

        {isWriting && (
          <div className="modal-container">
            <TextInput value={prompt} onChange={setPrompt} handleKeyDown={handleKeyDown}/>

            <div className="modal-item">
              <ActionButton isSecondary icon="X" text="Annuler" onClick={() => { setPrompt(""); setIsWriting(false); }}/>
              <ActionButton icon="CornerUpRight" text="Demander" onClick={() => { onSend(); setPrompt(""); setIsWriting(false); }}/>
            </div>
          </div>
        )}

        {isDictating && (
          <div className="modal-container">
            <SpeechInput value={prompt} onChange={setPrompt} />

            <div className="modal-item">
              <ActionButton isSecondary icon="X" text="Annuler" onClick={() => { setPrompt(""); setIsDictating(false);}}/>
              <ActionButton icon="CornerUpRight" text="Demander" onClick={() => { onSend(); setPrompt(""); setIsDictating(false); }}/>
            </div>
          </div>
        )}
      </div>      
    </>
  );
};

export default DiscussionModal;