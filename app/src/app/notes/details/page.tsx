"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import Bar from '@/components/Bar';
import Bubble from '@/components/text/Bubble';

const Notes = () => {
  const router = useRouter();

  return (
    <>
      <Bar icon="PencilLine" title="Notes" color="#EEE9DA" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Écrire un note pour se souvenir des informations.
          </span>

          <div className='content'>
            <span className='md-text'>TODO- Détails</span>

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

export default Notes;
