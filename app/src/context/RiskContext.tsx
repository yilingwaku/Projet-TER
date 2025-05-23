"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

import type { Risk } from '@assets/data/risks';
import defaultRisks from '@assets/data/risks';

type RiskContextType = {
  risks: Risk[];
  setRisks: (newRisks: Risk[]) => void;
  updateRiskItemCheck: (riskSlug: string, itemSlug: string, checked: boolean) => void;
};

const RiskContext = createContext<RiskContextType | undefined>(undefined);

export const RiskProvider = ({ children }: { children: React.ReactNode }) => {
  const [risks, setRisksState] = useState<Risk[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preventions');

    if (saved) {
      try {
        const parsed: Risk[] = JSON.parse(saved);
        setRisksState(parsed);
      } catch (e) {
        console.error("Erreur de parsing localStorage", e);
        setRisksState(defaultRisks);
      }
    } else {
      setRisksState(defaultRisks);
      localStorage.setItem('preventions', JSON.stringify(defaultRisks));
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('preventions', JSON.stringify(risks));
    }
  }, [risks, initialized]);

  const setRisks = (newRisks: Risk[]) => {
    setRisksState(newRisks);
  };

  const updateRiskItemCheck = (riskSlug: string, itemSlug: string, checked: boolean) => {
    setRisksState(prev =>
      prev.map(risk =>
        risk.slug === riskSlug
          ? {
              ...risk,
              items: risk.items.map(item =>
                item.slug === itemSlug ? { ...item, isChecked: checked } : item
              ),
            }
          : risk
      )
    );
  };

  return (
    <RiskContext.Provider value={{ risks, setRisks, updateRiskItemCheck }}>
      {children}
    </RiskContext.Provider>
  );
};

export const useRisk = () => {
  const context = useContext(RiskContext);
  if (!context) throw new Error("useRisk must be used within a RiskProvider");
  return context;
};
