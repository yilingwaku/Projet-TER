"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import Bar from '@/components/Bar';
import Bubble from '@/components/text/Bubble';

const Reglages = () => {
  const router = useRouter();

  return (
    <>
      <Bar icon="Cog" title="Réglages" color="#F9F7F7" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Gérer la paramétrage de l’application et de l’intelligence artificielle.
          </span>

          <div className='content'>
            <span className='md-text'>TODO</span>

            {/* <Bubble
              icon="Search"
              title="Aperçu"
              onClick={() => router.push('/notes/details')}
            >
              <span className='md-text'>Ceci est une note</span>
            </Bubble> */}







          </div>

        </div>
      </div>
    </>
  );
};

export default Reglages;
