"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import Bar from '@/components/Bar';
import Bubble from '@/components/text/Bubble';
import { useRisk } from '@/context/RiskContext';

const Prevention = () => {
  const { risks } = useRisk();
  const router = useRouter();

  return (
    <>
      <Bar icon="Megaphone" title="Prévention" color="#e5c39a" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Découvrir et appréhender les risques liés à l’âge.
          </span>

          <div className='content'>
            {risks.map((risk) => (
              <Bubble
                key={risk.slug}
                isDescription
                icon={risk.icon}
                title={risk.title}
                onClick={() => router.push(`/prevention/list?slug=${risk.slug}`)}
              >
                {risk.resume}
              </Bubble>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Prevention;
