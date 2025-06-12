"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { updateUserData } from "@controller/UserController";

type Message = { role: 'user' | 'assistant' | 'system'; content: string };

type Discussion = {
  id: string;
  messages: Message[];
};

type DiscussionContextType = {
  discussions: Discussion[];
  createDiscussionId: () => string;
  addMessage: (discussionId: string, message: Message) => void;
  updateDiscussions: (newDiscussions: Discussion[]) => void;
};

const DiscussionContext = createContext<DiscussionContextType | undefined>(undefined);

export const DiscussionProvider = ({ children }: { children: React.ReactNode }) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  const isInitialMount = useRef(true);
  const skipNextSave = useRef(false);

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

  // Reset le flag initial mount
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  // Sauvegarde automatique
  useEffect(() => {

    if (isInitialMount.current || skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    if (discussions.length === 0) {
      return;
    }

    const token = localStorage.getItem("token") || "";

    const saveDiscussions = async () => {
      try {
        await updateUserData({ discussions }, token);
      } catch (error) {
        console.error("Error updating discussions:", error);
      }
    };

    saveDiscussions();

  }, [discussions]);

  const updateDiscussions = (newDiscussions: Discussion[]) => {
    skipNextSave.current = true;
    setDiscussions(newDiscussions);
  }

  return (
    <DiscussionContext.Provider
      value={{
        discussions,
        createDiscussionId,
        addMessage,
        updateDiscussions,
      }}
    >
      {children}
    </DiscussionContext.Provider>
  );
};

export const useDiscussion = () => {
  const context = useContext(DiscussionContext);
  if (!context) throw new Error('useDiscussion must be used within a DiscussionProvider');
  return context;
};
