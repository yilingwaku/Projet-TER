"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Bar from '@/components/Bar';
import ActionModal from '@/components/modal/ActionModal';
import TextField from '@/components/text/TextField';

import { loginUser } from "@controller/UserController";

const Connexion = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
      setIsEmailValid(validateEmail(savedEmail));
    }
  }, []);

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}$/;
    return regex.test(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (validateEmail(value)) {
      setError('');
      setIsEmailValid(true);
    } else {
      setError("Format de l'adresse mail invalide");
      setIsEmailValid(false);
    }
  };

  const connectUser = async () => {

    if (!isEmailValid) return;

    const res = await loginUser(email);

    if (!res) {
      setError("Erreur de connexion aux services.");
      return;
    }

    if (res.status === "success") {
      localStorage.clear();
      localStorage.setItem('token', res.token);
      localStorage.setItem('email', email);
      router.push('/acceuil');
      return;
    } else {
      localStorage.clear();
      localStorage.setItem('email', email);
      router.push('/parametrage');
    }
  };

  return (
    <>
      <Bar icon="User" title="Compte" color="#F9F7F7" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Connecter ou créer votre compte pour synchroniser vos données.
          </span>

          <div className='content'>
            <TextField
              title="Adresse email"
              subtitle="Votre email sert d'identifiant. Il est utilisé pour synchroniser vos données."
              value={email}
              placeholder="Tapez votre adresse mail"
              type="email"
              handleChange={handleEmailChange}
              onKeyDown={connectUser}
              inputRef={inputRef}
            />

            {error && <span className='sm-text error'>{error}</span>}
          </div>
        </div>
      </div>

      <ActionModal
        icon="Unplug"
        title="Connecter"
        onClick={connectUser}
        isDisable={!isEmailValid}
      />
    </>
  );
};

export default Connexion;