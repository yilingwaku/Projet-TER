"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import Bar from '@/components/Bar';
import LinkModal from '@/components/modal/LinkModal';
import Bubble from '@/components/text/Bubble';

import { useAgenda } from '@/context/AgendaContext';

const Agenda = () => {
  const router = useRouter();
  const { agenda } = useAgenda();

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const isTomorrow = (dateStr: string) => {
    const date = new Date(dateStr);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toISOString().split('T')[0] === tomorrow.toISOString().split('T')[0];
  };

  // Catégorisation
  const noDate = agenda.filter(a => !a.date);
  // const noDateNoHeure = noDate.filter(a => !a.heure);
  const noDateWithHeure = noDate.filter(a => a.heure);

  const noDateWithHeureSorted = [...noDateWithHeure].sort((a, b) =>
    (a.heure || '').localeCompare(b.heure || '')
  );

  const dated = agenda
    .filter(a => a.date)
    .filter(a => {
      const date = new Date(`${a.date}T${a.heure || '00:00'}`);
      return date >= now;
    });

  const groupedByDate: { [date: string]: { noHeure: typeof dated; withHeure: typeof dated } } = {};

  dated.forEach(a => {
    if (!groupedByDate[a.date]) {
      groupedByDate[a.date] = { noHeure: [], withHeure: [] };
    }
    if (a.heure) {
      groupedByDate[a.date].withHeure.push(a);
    } else {
      groupedByDate[a.date].noHeure.push(a);
    }
  });

  Object.keys(groupedByDate).forEach(date => {
    groupedByDate[date].withHeure.sort((a, b) => (a.heure || '').localeCompare(b.heure || ''));
  });

  const sortedDates = Object.keys(groupedByDate).sort();

  return (
    <>
      <Bar icon="ChartNoAxesGantt" title="Agenda" color="#A0C3D2" />

      <div className="view">
        <div className="thread">
          <span className="sm-text">
            Planifier les évènements particuliers ou récurrents de votre journée.
          </span>

          <div className="content">

            {/* Événements sans date ni heure */}
            {/* {noDateNoHeure.length > 0 && (
              <>
                <span className="md-text" style={{ marginTop: '1rem' }}>
                  Événements sans date ni heure
                </span>
                {noDateNoHeure.map(a => (
                  <Bubble
                    isDescription
                    key={a.id}
                    onClick={() => router.push(`/agenda/details?id=${a.id}`)}
                  >
                    {a.title
                      ? a.title.slice(0, 47) + (a.title.length > 47 ? '...' : '')
                      : 'Aucun contenu'}
                  </Bubble>
                ))}
              </>
            )} */}

            {/* Événements récurrents (heure sans date) */}
            {noDateWithHeureSorted.length > 0 && (
              <>
                <span className="md-text" style={{ marginTop: '1rem' }}>
                  Événements récurrents
                </span>
                {noDateWithHeureSorted.map(a => (
                  <Bubble
                    isDescription
                    key={a.id}
                    icon="Clock"
                    title={a.heure}
                    onClick={() => router.push(`/agenda/details?id=${a.id}`)}
                  >
                    {a.title
                      ? a.title.slice(0, 47) + (a.title.length > 47 ? '...' : '')
                      : 'Aucun contenu'}
                  </Bubble>
                ))}
              </>
            )}

            {/* Événements datés */}
            {sortedDates.map(date => {
              const label =
                date === todayStr
                  ? `Aujourd'hui - ${date.split('-').reverse().join('/')}`
                  : isTomorrow(date)
                  ? `Demain - ${date.split('-').reverse().join('/')}`
                  : (() => {
                      const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      });
                      const weekday = capitalize(
                        new Date(date).toLocaleDateString('fr-FR', { weekday: 'long' })
                      );
                      return `${weekday} - ${formattedDate}`;
                    })();

              return (
                <React.Fragment key={date}>
                  <span className="md-text" style={{ marginTop: '1rem' }}>{label}</span>

                  {[...groupedByDate[date].noHeure, ...groupedByDate[date].withHeure].map(a => (
                    <Bubble
                      isDescription
                      key={a.id}
                      onClick={() => router.push(`/agenda/details?id=${a.id}`)}
                      icon="Calendar1"
                      title={a.date.split('-').reverse().join('/')}
                      icon2={a.heure ? 'Clock' : undefined}
                      title2={a.heure || undefined}
                    >
                      {a.title
                        ? a.title.slice(0, 47) + (a.title.length > 47 ? '...' : '')
                        : 'Aucun contenu'}
                    </Bubble>
                  ))}
                </React.Fragment>
              );
            })}

            {agenda.length === 0 && (
              <span className="md-text">Aucun événement n'a été planifié.</span>
            )}
          </div>
        </div>
      </div>

      <LinkModal icon="BellPlus" title="Planifier" link="/agenda/details" />
    </>
  );
};

export default Agenda;
