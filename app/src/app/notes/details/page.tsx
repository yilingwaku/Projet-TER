"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import Bar from '@/components/Bar';
import NoteModal from '@/components/modal/NoteModal';
import { useNote } from '@/context/NotesContext';

import { Mirage } from 'ldrs/react';
import 'ldrs/react/Mirage.css';

import { v4 as uuidv4 } from 'uuid';
import Icon from '@/components/Icon';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { formatDateFr } from '@/utils/date';

const Details = () => {
  const searchParams = useSearchParams();
  const noteId = searchParams.get('id');
  const router = useRouter();

  const { getNote, addOrUpdateNote } = useNote();
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  const [prevTranscript, setPrevTranscript] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (!noteId) {
      const id = uuidv4();
      const now = formatDateFr(new Date());
      setDate(now);

      router.replace(`/notes/details?id=${id}`);
      return;
    }

    const existingNote = getNote(noteId);
    if (existingNote) {
      setContent(existingNote.content);
      setDate(existingNote.date);
    }
  }, [noteId, getNote, router]);

  useEffect(() => {
    adjustHeight();
  }, [content]);

  useEffect(() => {
    if (listening) {
      const newText = transcript.slice(prevTranscript.length);
      if (newText) {
        const updated = content + newText;

        setContent(updated);
        setPrevTranscript(transcript);

        if (noteId) {
          addOrUpdateNote(noteId, updated, date);
        }
      }
    }
  }, [transcript, listening]);

  useEffect(() => {
    if (!listening && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [listening]);

  useEffect(() => {
    return () => {
      SpeechRecognition.abortListening();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (noteId) {
      addOrUpdateNote(noteId, e.target.value, date);
    }
  };

  const startDictation = () => {
    resetTranscript();
    setPrevTranscript('');
    SpeechRecognition.startListening({ continuous: true, language: 'fr-FR' });
  };

  const stopDictation = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <>
      <Bar icon="PencilLine" title="Notes" color="#EEE9DA" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Écrire une note pour se souvenir des informations.
          </span>

          <div className="content">

            <span className="sm-text">
              {date}
            </span>

            <textarea
              className="md-text auto-textarea"
              autoFocus
              ref={textareaRef}
              value={content}
              onChange={handleChange}
              onInput={adjustHeight}
              placeholder={listening ? "Dictez votre note..." : "Tapez votre note..."}
              rows={1}
              style={{ overflow: 'hidden', resize: 'none' }}
              readOnly={listening}
            />
            {listening && <Mirage size="40" speed="4" color="black" />}
          </div>

            <div className="flex gap-[10px]">
              <div className='pt-1'><Icon icon="Info" size={20}/></div>
              <span className="sm-text w-fit">
                <i>Un contenu vide supprime la note.</i>
              </span>
            </div>
          
        </div>
      </div>

      <NoteModal
        isDictating={listening}
        onStartDictation={startDictation}
        onStopDictation={stopDictation}
        isSpeechSupported={browserSupportsSpeechRecognition}
      />
    </>
  );
};

export default Details;
