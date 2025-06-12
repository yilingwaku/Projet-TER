"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Bar from '@/components/Bar';
import ActionModal from '@/components/modal/ActionModal';
import TextField from '@/components/text/TextField';

import { createUserData } from "@controller/UserController";

const Parametrage = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const savedName = localStorage.getItem('name');
    if (savedName) {
      setName(savedName);
      setIsNameValid(validateName(savedName));
    }
  }, []);

  const validateName = (value) => {
    const regex = /^.{3,}$/;
    return regex.test(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (validateName(value)) {
      setError('');
      setIsNameValid(true);
    } else {
      setError("Longueur minimum de 3 caractères.");
      setIsNameValid(false);
    }
  };

  const setUser = async () => {
    localStorage.setItem('name', name);
    if (!isNameValid) return;

    const data = {
      name: name,
      email: localStorage.getItem('email'),
    }

    const res = await createUserData(data);

    if (!res) {
      setError("Erreur de connexion aux services.");
      return;
    }
    
    if (res.status === "success") {
      localStorage.setItem('token', res.token);

      router.push('/questionnaire');
    } else {
      setError("Le compte existe déjà, veuillez vous connecter.");
    }
  };

  return (
    <>
      <Bar icon="User" title="Compte" color="#F9F7F7" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Créer votre compte pour synchroniser vos données.
          </span>

          <div className='content'>
            <TextField
              title="Prénom"
              subtitle="Votre prénom sert à personnaliser l'expérience et les réponses de l'intelligence artificielle."
              value={name}
              placeholder="Tapez votre prénom"
              type="name"
              handleChange={handleNameChange}
              onKeyDown={setUser}
              inputRef={inputRef}
            />

            {error && <span className='sm-text error'>{error}</span>}
          </div>
        </div>
      </div>

      <ActionModal
        icon="CheckCheck"
        title="Valider"
        onClick={setUser}
        isDisable={!isNameValid}
      />
    </>
  );
};

export default Parametrage;