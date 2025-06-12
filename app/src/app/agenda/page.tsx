"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import Bar from '@/components/Bar';
import Bubble from '@/components/text/Bubble';

const Agenda = () => {
  const router = useRouter();

  return (
    <>
      <Bar icon="ChartNoAxesGantt" title="Agenda" color="#A0C3D2" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Planifier les évènements particuliers ou récurrents de votre journée.
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

export default Agenda;
