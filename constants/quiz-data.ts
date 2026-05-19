import type { ImageSourcePropType } from 'react-native';

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizLevel = 'easy' | 'medium' | 'hard' | 'expert';

export type Question = {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
  image?: ImageSourcePropType;
  caseId?: string;
  level?: QuizLevel;
};

export type UserProfile = {
  name: string;
  phone: string;
  email?: string;
  createdAt: number;
};

export type AnswerRecord = {
  questionId: string;
  selectedOptionId: string;
  correct: boolean;
};

export type QuizAttempt = {
  completedAt: number;
  totalQuestions: number;
  correctCount: number;
  answers: AnswerRecord[];
};

export type QuestionBundle = {
  version: string;
  quizId: string;
  questions: Question[];
  updatedAt: number;
};

export type LeadUploadStatus = 'pending' | 'sent' | 'error';

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: number;
  status: LeadUploadStatus;
  sentAt?: number;
  errorMessage?: string;
};

export const QUESTIONS: Question[] = [
  {
    id: 'exemplo-1',
    prompt: 'Qual é o tempo médio de osseointegração de um implante na mandíbula?',
    options: [
      { id: 'a', text: '1 a 2 semanas' },
      { id: 'b', text: '6 a 8 semanas' },
      { id: 'c', text: '3 a 4 meses' },
      { id: 'd', text: '12 meses' },
    ],
    correctOptionId: 'c',
    explanation:
      'O tempo médio aceito na literatura é de 3 a 4 meses para a mandíbula e 4 a 6 meses para a maxila.',
  },
  {
    id: 'exemplo-2',
    prompt: 'O torque de inserção mínimo geralmente recomendado para carga imediata é:',
    options: [
      { id: 'a', text: '5 N·cm' },
      { id: 'b', text: '15 N·cm' },
      { id: 'c', text: '35 N·cm' },
      { id: 'd', text: '70 N·cm' },
    ],
    correctOptionId: 'c',
    explanation:
      'Torques iguais ou superiores a 35 N·cm são tipicamente associados à estabilidade primária suficiente para carga imediata.',
  },
];
