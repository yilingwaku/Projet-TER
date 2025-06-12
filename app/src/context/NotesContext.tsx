"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

import { updateUserData } from "@controller/UserController";

type Note = {
  id: string;
  content: string;
};

type NoteContextType = {
  notes: Note[];
  getNote: (id: string) => Note | undefined;
  addOrUpdateNote: (id: string, content: string) => void;
  updateNotes: (newNotes: Note[]) => void;
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const isInitialMount = useRef(true);
  const skipNextSave = useRef(false);

  const getNote = (id: string) => notes.find(n => n.id === id);

  const addOrUpdateNote = (id: string, content: string) => {
    setNotes(prev => {
      const existing = prev.find(n => n.id === id);
      if (existing) {
        return prev.map(n => (n.id === id ? { ...n, content } : n));
      }
      return [...prev, { id, content }];
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

    if (notes.length === 0) {
      return;
    }

    const token = localStorage.getItem("token") || "";

    const saveNotes = async () => {
      try {
        await updateUserData({ notes: notes }, token);
      } catch (error) {
        console.error("Error updating user notes:", error);
      }
    };

    saveNotes();

  }, [notes]);

  const updateNotes = (newNotes: Note[]) => {
    skipNextSave.current = true;
    const cleanedNotes = newNotes.filter(note => note.content.trim() !== "");
    setNotes(cleanedNotes);
  };


  return (
    <NoteContext.Provider
      value={{
        notes,
        getNote,
        addOrUpdateNote,
        updateNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) throw new Error('useNote must be used within NoteProvider');
  return context;
};
