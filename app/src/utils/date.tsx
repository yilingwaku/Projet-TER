// utils/date.tsx

/**
 * Formate une date au format court français : "dd/mm/yyyy hh:mm"
 *
 * @param date - Une instance de Date ou une string compatible avec new Date()
 * @returns string - La date formatée
 */
export const formatDateFr = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Mois = 0-indexé
  const year = d.getFullYear();

  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};