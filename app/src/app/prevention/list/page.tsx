"use client";

import React from 'react';
import { useRouter, notFound, useSearchParams } from 'next/navigation';

import Bar from '@/components/Bar';
import Check from '@/components/text/Check';

import { useRisk } from '@/context/RiskContext';

export default function PreventionList() {

  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const router = useRouter();
  const { risks } = useRisk();

  // On attend que les risques soient chargés
  if (!risks || risks.length === 0) {
    return <></>;
  }

  const risk = risks.find((r) => r.slug === slug);

  // Si risque non trouvé, on affiche 404
  if (!risk) {
    notFound();
  }

  return (
    <>
      <Bar icon="Megaphone" title="Prévention" color="#e5c39a" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">{risk.description}</span>

          <div className='content'>
            {[...risk.items]
              .sort((a, b) => Number(a.isChecked) - Number(b.isChecked))
              .map((item) => (
                <Check
                  key={item.slug}
                  isChecked={item.isChecked}
                  onClick={() => router.push(`/prevention/list/detail?slug=${item.slug}`)}
                >
                  {item.title}
                </Check>
              ))}
          </div>

        </div>
      </div>
    </>
  );
}
