"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Message = { role: 'user' | 'assistant' | 'system'; content: string };

type Discussion = {
  id: string;
  messages: Message[];
};

type DiscussionContextType = {
  discussions: Discussion[];
  createDiscussionId: () => string;
  addMessage: (discussionId: string, message: Message) => void;
};

const NotesContext = createContext<DiscussionContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [initialized, setInitialized] = useState(false);

  const createDiscussionId = (): string => {
    return uuidv4();
  };

  const addMessage = (discussionId: string, message: Message) => {
    if (!discussionId) return;

    setDiscussions(prev => {
      const idx = prev.findIndex(d => d.id === discussionId);

      if (idx === -1) {
        // Discussion inexistante, création avec le premier message
        return [...prev, { id: discussionId, messages: [message] }];
      } else {
        // Discussion existante, ajout du message
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          messages: [...updated[idx].messages, message],
        };
        return updated;
      }
    });
  };

  // Restauration depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('discussions');
    if (saved) {
      const parsed: Discussion[] = JSON.parse(saved);
      if (parsed.length > 0) {
        setDiscussions(parsed);
      }
    }
    setInitialized(true);
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    if (initialized) {
      localStorage.setItem('discussions', JSON.stringify(discussions));
    }
  }, [discussions, initialized]);

  return (
    <NotesContext.Provider
      value={{
        discussions,
        createDiscussionId,
        addMessage,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useDiscussion = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useDiscussion must be used within a DiscussionProvider');
  return context;
};
