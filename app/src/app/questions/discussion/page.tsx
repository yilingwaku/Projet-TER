"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { Mirage } from 'ldrs/react'
import 'ldrs/react/Mirage.css'

import Bar from '@/components/Bar';
import Bubble from '@/components/text/Bubble';
import DiscussionModal from '@/components/modal/DiscussionModal';
import ActionButton from '@/components/button/ActionButton';

import { useDiscussion } from '@/context/DiscussionContext';
import { useUser } from '@/context/UserContext';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const speak = (text: string) => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    window.speechSynthesis.speak(utterance);
  }
};

const Discussion = () => {
  const searchParams = useSearchParams();
  const discussionId = searchParams.get('id');

  const { discussions, createDiscussionId, addMessage } = useDiscussion();

  const [activeDiscussionId, setActiveDiscussionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { settings, user, questionnaire } = useUser();

  const systemPrompt: Message = {
    role: 'system',
    content: "Ne te présente pas. Ne parle pas de toi. Réponds à la question de manière synthétique, en évitant les détails superflus. Ne fais pas d'introduction, parle directement du sujet de la question. Ne fais pas de liste. Un maximum de 100 mots pour répondre. Si tu ne sais pas répondre à la question, dis que tu ne sais pas. Réponds en français."
  };

  if (settings.sharePersonalData) {
    systemPrompt.content += `\n\nVoici quelques information me concernant :\n- Nom : ${user.name}\n- Questionnaire : ${questionnaire}\n Utilises ces informations pour personnaliser tes réponses; Appelles moi par mon nom, utilises les réponses du questionnaire pour orienter tes réponses auw questions.`;
  }

  const currentController = useRef<AbortController | null>(null);

  // À l'initialisation, créer une discussion si aucune n'est active
  const router = useRouter();

  useEffect(() => {
    let id = discussionId;

    if (!id) {
      id = createDiscussionId();
      setActiveDiscussionId(id);
      router.replace(`/questions/discussion?id=${id}`);
      return;
    }

    setActiveDiscussionId(id);

    const activeDisc = discussions.find(d => d.id === id);
    if (activeDisc) {
      setMessages(activeDisc.messages);
    } else {
      setMessages([]);
    }

    const element = document.querySelector('.view');
    if (element) element.scrollTop = element.scrollHeight;

  }, [discussionId, discussions, createDiscussionId, router]);

  useEffect(() => {
    const element = document.querySelector('.view');
    if (element) {
      // Utilise setTimeout pour attendre la fin du rendu
      setTimeout(() => {
        element.scrollTop = element.scrollHeight;
      }, 0);
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      if (currentController.current) {
        currentController.current.abort();
      }
    };
  }, []);

  const sendPrompt = async () => {
    if (isLoading || !currentPrompt.trim() || !activeDiscussionId) return;

    const view = document.querySelector(".view") as HTMLElement;
    view.style.opacity = "1";

    setIsLoading(true);
    const newPrompt = currentPrompt;
    setCurrentPrompt('');

    const element = document.querySelector('.view');
    if (element) element.scrollTop = element.scrollHeight;

    const userMessage: Message = { role: 'user', content: newPrompt };
    const fullMessages = [systemPrompt, ...messages, userMessage];

    setMessages(prev => [...prev, userMessage]);
    addMessage(activeDiscussionId, userMessage);

    const controller = new AbortController();
    const signal = controller.signal;

    // Enregistre le controller pour l’abandon sur unmount
    currentController.current = controller;

    try {
      const res = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: fullMessages }),
        signal,
      });

      if (!res.ok || !res.body) {
        throw new Error("Fetch failed");
      }

      console.log("Réponse du serveur reçue, début du streaming...", res);

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let responseSoFar = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        responseSoFar += chunk;

        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return [...prev.slice(0, -1), { ...last, content: responseSoFar }];
          }
          return prev;
        });
      }

      addMessage(activeDiscussionId, { role: 'assistant', content: responseSoFar });

      if (settings.textToSpeechEnabled) {
        speak(responseSoFar);
      }

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Erreur dans le stream :", error);
      }
    } finally {
      setIsLoading(false);
      currentController.current = null;
    }
  };


  return (
    <>
      <Bar icon="MessageCircleQuestion" title="Questions" color="#BBDED6" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Poser des questions à l’intelligence artificielle.
          </span>

          {messages
          .filter(msg => msg.role !== 'system')
          .map((msg, i) => (
            <React.Fragment key={i}>
              <div className='content'>
                {msg.role === 'user' && <Bubble icon="MessageCircleQuestion" title="Vous">{msg.content}</Bubble>}
                {msg.role === 'assistant' && <span className="md-text">{msg.content}</span>}
              </div>
            </React.Fragment>
          ))}

          {isLoading && (
              <Mirage size="40" speed="4" color="black" />
          )}

          

          {/* {!isLoading && (
            <div className='w-full flex flex-col items-end gap-[10px]'>

              <ActionButton
                isSecondary
                isExample
                text="Quels sont les risques liés à mon domicile ?"
                onClick={() => {
                  setCurrentPrompt("Quels sont les risques liés à mon domicile ? En fonction du questionnaire que j'ai rempli sur mon domicile.");
                  sendPrompt();
                }}
              />

              <ActionButton
                isSecondary
                isExample
                text="Quel temps fait-il aujourd'hui ?"
                onClick={() => {
                  setCurrentPrompt("Quel temps fait-il aujourd'hui ?");
                  sendPrompt();
                }}
              />

            </div>
          )} */}

          



        </div>
      </div>

      <DiscussionModal
        prompt={currentPrompt}
        setPrompt={setCurrentPrompt}
        onSend={sendPrompt}
        isLoading={isLoading}
      />
    </>
  );
};

export default Discussion;