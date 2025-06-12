"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

import type { Risk } from '@/assets/datas/risks';

import { updateUserData } from "@controller/UserController";

type RiskContextType = {
  risks: Risk[];
  updateRiskItemCheck: (riskSlug: string, itemSlug: string, checked: boolean) => void;
  updateRiks: (newRisks: Risk[]) => void;
  addRisks: (newRisks: Risk[]) => void;
};

const RiskContext = createContext<RiskContextType | undefined>(undefined);

export const RiskProvider = ({ children }: { children: React.ReactNode }) => {
  const [risks, setRisksState] = useState<Risk[]>([]);

  const isInitialMount = useRef(true);
  const skipNextSave = useRef(false);

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

  // Reset le flag initial mount
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  //Sauvegarde
    useEffect(() => {

    if (isInitialMount.current || skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    if (risks.length === 0) {
      return;
    }

    const token = localStorage.getItem("token") || "";
    
    const saveRisks = async () => {
      try {
        const preventions = risks;
        const res = await updateUserData({ preventions }, token);
        console.log("Risks updated successfully:", res);
      } catch (error) {
        console.error("Error updating discussions:", error);
      }
    };
  
    saveRisks();

  }, [risks]);

  const updateRiks = (newRisks: Risk[]) => {
    skipNextSave.current = true;
    setRisksState(newRisks);
  }

  const addRisks = (newRisks: Risk[]) => {
    setRisksState(newRisks);
  }

  return (
    <RiskContext.Provider value={{ risks, updateRiskItemCheck, updateRiks, addRisks }}>
      {children}
    </RiskContext.Provider>
  );
};

export const useRisk = () => {
  const context = useContext(RiskContext);
  if (!context) throw new Error("useRisk must be used within a RiskProvider");
  return context;
};
