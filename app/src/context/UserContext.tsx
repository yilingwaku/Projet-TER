"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { updateUserData } from "@controller/UserController";

type UserSettings = {
  textToSpeechEnabled: boolean;
  sharePersonalData: boolean;
};

type UserInfo = {
  name: string;
  email: string;
};

type QuestionnaireAnswer = {
  question: string;
  reponses: string[];
};

type UserContextType = {
  settings: UserSettings;
  user: UserInfo;
  questionnaire: QuestionnaireAnswer;
  toggleTextToSpeech: () => void;
  toggleSharePersonalData: () => void;
  updateUser: (newUser: Partial<UserInfo>) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  updateQuestionnaire: (newQuestionnaire: QuestionnaireAnswer) => void;
  addQuestionnaireAnswer: (newQuestionnaire: QuestionnaireAnswer) => void;
};

const defaultSettings: UserSettings = {
  textToSpeechEnabled: true,
  sharePersonalData: true,
};

const defaultUser: UserInfo = {
  name: '',
  email: '',
};

const defaultQuestionnaire: QuestionnaireAnswer = {
  question: '',
  reponses: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [user, setUser] = useState<UserInfo>(defaultUser);
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireAnswer>(defaultQuestionnaire);

  const isInitialMount = useRef(true);
  const skipNextSettingsSave = useRef(false);
  const skipNextUserSave = useRef(false);
  const skipNextQuestionnaireSave = useRef(false);

  // Sauvegarde des réglages
  useEffect(() => {
    if (isInitialMount.current || skipNextSettingsSave.current) {
      skipNextSettingsSave.current = false;
      return;
    }

    const token = localStorage.getItem("token") || "";

    const saveSettings = async () => {
      try {
        await updateUserData({ reglages: [settings] }, token);
      } catch (error) {
        console.error("Error updating user settings:", error);
      }
    };

    saveSettings();
  }, [settings]);

  // Sauvegarde des infos utilisateur
  useEffect(() => {
    if (isInitialMount.current || skipNextUserSave.current) {
      skipNextUserSave.current = false;
      return;
    }

    const token = localStorage.getItem("token") || "";

    const saveUser = async () => {
      try {
        await updateUserData({ name: user.name }, token);
      } catch (error) {
        console.error("Error updating user info:", error);
      }
    };

    saveUser();
  }, [user]);

  // Sauvegarde des réponses au questionnaire
  useEffect(() => {
    if (isInitialMount.current || skipNextQuestionnaireSave.current) {
      skipNextQuestionnaireSave.current = false;
      return;
    }

    const token = localStorage.getItem("token") || "";

    const saveQuestionnaire = async () => {
      try {
        await updateUserData({ questionnaire: questionnaire }, token);
      } catch (error) {
        console.error("Error updating questionnaire:", error);
      }
    };

    saveQuestionnaire();
  }, [questionnaire]);

  // Reset le flag initial mount
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  const toggleTextToSpeech = () => {
    setSettings(prev => ({
      ...prev,
      textToSpeechEnabled: !prev.textToSpeechEnabled,
    }));
  };

  const toggleSharePersonalData = () => {
    setSettings(prev => ({
      ...prev,
      sharePersonalData: !prev.sharePersonalData,
    }));
  };

  const updateUser = (newUser: Partial<UserInfo>) => {
    skipNextUserSave.current = true;
    setUser(prev => ({ ...prev, ...newUser }));
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    skipNextSettingsSave.current = true;
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateQuestionnaire = (newQuestionnaire: QuestionnaireAnswer[]) => {
    skipNextQuestionnaireSave.current = true;
    setQuestionnaire(newQuestionnaire);
  };

  const addQuestionnaireAnswer = (newQuestionnaire: QuestionnaireAnswer) => {
    setQuestionnaire(newQuestionnaire);
  };

  return (
    <UserContext.Provider
      value={{
        settings,
        user,
        questionnaire,
        toggleTextToSpeech,
        toggleSharePersonalData,
        updateUser,
        updateSettings,
        updateQuestionnaire,
        addQuestionnaireAnswer
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
