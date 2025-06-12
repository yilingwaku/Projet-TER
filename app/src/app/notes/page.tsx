"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import Bar from '@/components/Bar';
import LinkModal from '@/components/modal/LinkModal';
import Bubble from '@/components/text/Bubble';
import { useNote } from '@/context/NotesContext';

const Notes = () => {
  const router = useRouter();
  const { notes } = useNote();

  return (
    <>
      <Bar icon="PencilLine" title="Notes" color="#EEE9DA" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Noter les informations importantes pour vous.
          </span>

          <div className='content'>
            {notes.length === 0 ? (
              <span className="md-text">Aucune note n'a été écrite.</span>
            ) : (
              notes.slice().reverse().map((note) => (
                <Bubble isDescription
                  icon="Clock"
                  title={note.date}
                  onClick={() => router.push(`/notes/details?id=${note.id}`)}
                  key={note.id}>
                  {note.content
                    ? note.content.slice(0, 47) + (note.content.length > 47 ? '...' : '')
                    : 'Aucun contenu'}
                </Bubble>
              ))
            )}
          </div>
        </div>
      </div>

      <LinkModal icon="SquarePen" title="Créer" link="/notes/details" />
    </>
  );
};

export default Notes;