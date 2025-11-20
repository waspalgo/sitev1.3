export interface FAQItem {
  questionKey: string;
  answerKey: string;
}

// Clés de traduction pour les questions FAQ
export const faqData: FAQItem[] = [
  {
    questionKey: 'faq.q1.question',
    answerKey: 'faq.q1.answer',
  },
  {
    questionKey: 'faq.q2.question',
    answerKey: 'faq.q2.answer',
  },
  {
    questionKey: 'faq.q3.question',
    answerKey: 'faq.q3.answer',
  },
  {
    questionKey: 'faq.q4.question',
    answerKey: 'faq.q4.answer',
  },
  {
    questionKey: 'faq.q5.question',
    answerKey: 'faq.q5.answer',
  },
  {
    questionKey: 'faq.q6.question',
    answerKey: 'faq.q6.answer',
  },
  {
    questionKey: 'faq.q7.question',
    answerKey: 'faq.q7.answer',
  },
  {
    questionKey: 'faq.q8.question',
    answerKey: 'faq.q8.answer',
  },
  {
    questionKey: 'faq.q9.question',
    answerKey: 'faq.q9.answer',
  },
  {
    questionKey: 'faq.q10.question',
    answerKey: 'faq.q10.answer',
  },
  {
    questionKey: 'faq.q11.question',
    answerKey: 'faq.q11.answer',
  },
];

// Questions à afficher sur la page d'accueil (par ordre d'importance)
export const homeFAQQuestionKeys = [
  'faq.q1.question',
  'faq.q2.question',
  'faq.q3.question',
  'faq.q6.question',
  'faq.q8.question',
  'faq.q11.question',
];

export function getHomeFAQItems(): FAQItem[] {
  return faqData.filter(item => homeFAQQuestionKeys.includes(item.questionKey));
}

