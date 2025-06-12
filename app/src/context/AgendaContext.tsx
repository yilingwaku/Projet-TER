"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

import { updateUserData } from "@controller/UserController";

type Agenda = {
  id: string;
  title: string;
};

type AgendaContextType = {
  agenda: Agenda[];
  getAgenda: (id: string) => Agenda | undefined;
  addOrUpdateAgenda: (id: string, title: string, date: string, heure: string, note: string) => void;
  updateAgenda: (newAgenda: Agenda[]) => void;
};

const AgendaContext = createContext<AgendaContextType | undefined>(undefined);

export const AgendaProvider = ({ children }: { children: React.ReactNode }) => {
  const [agenda, setAgenda] = useState<Agenda[]>([]);

  const isInitialMount = useRef(true);
  const skipNextSave = useRef(false);

  const getAgenda = (id: string) => agenda.find(n => n.id === id);

  const addOrUpdateAgenda = (id: string, title: string, date: string, heure: string, note: string) => {
    setAgenda(prev => {
      const existing = prev.find(n => n.id === id);
      if (existing) {
        return prev.map(n => (n.id === id ? { ...n, title: title, date: date, heure: heure, note: note } : n));
      }
      return [...prev, { id, title: title, date: date, heure: heure, note: note }];
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

    if (agenda.length === 0) {
      return;
    }

    const token = localStorage.getItem("token") || "";

    const saveAgenda = async () => {
      try {
        await updateUserData({ agenda: agenda }, token);
      } catch (error) {
        console.error("Error updating user agenda:", error);
      }
    };

    saveAgenda();

  }, [agenda]);

  const updateAgenda = (newAgenda: Agenda[]) => {
    skipNextSave.current = true;
    const cleanedAgenda = newAgenda.filter(agenda => agenda.title.trim() !== "" && agenda.heure.trim() !== "");
    setAgenda(cleanedAgenda);
  };

  return (
    <AgendaContext.Provider
      value={{
        agenda,
        getAgenda,
        addOrUpdateAgenda,
        updateAgenda }}>
      {children}
    </AgendaContext.Provider>
  );
};

export const useAgenda = () => {
  const context = useContext(AgendaContext);
  if (!context) throw new Error('useAgenda must be used within AgendaProvider');
  return context;
};
