//import defaultRisks from '@/assets/datas/risks';
import { Risk } from '@/assets/datas/risks';

/**
 * Adapte la prévention en fonction des réponses au questionnaire.
 *
 * @param answers - Les réponses au questionnaire
 * @param defaultRisks - La liste complète des risques par défaut
 * @returns Risk[] - La liste filtrée et personnalisée des risques
 */
export const adaptPrevention = (answers: string[], defaultRisks: Risk[]): Risk[] => {
  if (!answers || answers.length === 0) return defaultRisks;










  return "NOT YET IMPLEMENTED";
};
