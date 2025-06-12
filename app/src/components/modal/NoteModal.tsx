import React from 'react';
import ActionButton from "../button/ActionButton";

const NoteModal = ({
  isDictating,
  onStartDictation,
  onStopDictation,
  isSpeechSupported
}: {
  isDictating: boolean;
  onStartDictation: () => void;
  onStopDictation: () => void;
  isSpeechSupported: boolean;
}) => {
  // Si le navigateur ne supporte pas la dictée, ne rien afficher
  if (!isSpeechSupported) return null;

  return (
    <div className="modal">
      {!isDictating && (
        <div className="modal-container">
          <div className="modal-item">
            <ActionButton
              icon="MicVocal"
              text="Dicter"
              onClick={onStartDictation}
            />
          </div>
        </div>
      )}

      {isDictating && (
        <div className="modal-container">
          <div className="modal-item">
            <ActionButton
              isSecondary
              icon="CircleStop"
              text="Arrêter"
              onClick={onStopDictation}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteModal;
