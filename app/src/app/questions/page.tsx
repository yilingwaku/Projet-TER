"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import Bar from '@/components/Bar';
import LinkModal from '@/components/modal/LinkModal';
import Bubble from '@/components/text/Bubble';
import { useDiscussion } from '@/context/DiscussionContext';

const Questions = () => {
  const { discussions } = useDiscussion();
  const router = useRouter();

  return (
    <>
      <Bar icon="MessageCircleQuestion" title="Questions" color="#BBDED6" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Historique de vos demandes à l’intelligence artificielle.
          </span>

          <div className='content'>
            {discussions.length === 0 ? (
              <span className="md-text">Aucune question n’a encore été posée.</span>
            ) : (
              discussions.slice().reverse().map((discussion) => {
                const firstUserMessage = discussion.messages.find(m => m.role === 'user');
                const preview = firstUserMessage?.content;
                return (
                  <Bubble isDescription
                    icon="Search"
                    title="Aperçu"
                    onClick={() => router.push(`/questions/discussion?id=${discussion.id}`)}
                    key={discussion.id}>
                    {preview
                    ? preview.slice(0, 47) + (preview.length > 47 ? '...' : '')
                    : 'Aucun contenu'}
                  </Bubble>
                );
              })
            )}
          </div>

        </div>
      </div>

      <LinkModal icon="MessageCirclePlus" title="Nouveau" link="/questions/discussion" />
    </>
  );
};

export default Questions;
