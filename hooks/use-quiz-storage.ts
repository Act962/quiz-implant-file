import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

import type {
  Lead,
  LeadScore,
  LeadUploadStatus,
  QuestionBundle,
  QuizAttempt,
} from '@/constants/quiz-data';

const KEYS = {
  attempts: '@quiz-implant:attempts',
  questions: '@quiz-implant:questions',
  leads: '@quiz-implant:leads',
} as const;

function parseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function getCachedQuestions(): Promise<QuestionBundle | null> {
  const raw = await AsyncStorage.getItem(KEYS.questions);
  return parseJson<QuestionBundle | null>(raw, null);
}

export async function saveCachedQuestions(bundle: QuestionBundle): Promise<void> {
  await AsyncStorage.setItem(KEYS.questions, JSON.stringify(bundle));
}

export async function getStoredLeads(): Promise<Lead[]> {
  const raw = await AsyncStorage.getItem(KEYS.leads);
  return parseJson<Lead[]>(raw, []);
}

export async function appendLead(lead: Lead): Promise<void> {
  const existing = await getStoredLeads();
  await AsyncStorage.setItem(KEYS.leads, JSON.stringify([...existing, lead]));
}

export async function updateLeadStatus(
  id: string,
  patch: { status: LeadUploadStatus; sentAt?: number; errorMessage?: string },
): Promise<Lead[]> {
  const existing = await getStoredLeads();
  const next = existing.map((l) =>
    l.id === id ? { ...l, ...patch, errorMessage: patch.errorMessage } : l,
  );
  await AsyncStorage.setItem(KEYS.leads, JSON.stringify(next));
  return next;
}

export async function updateLeadScore(
  id: string,
  score: LeadScore,
): Promise<Lead[]> {
  const existing = await getStoredLeads();
  const next = existing.map((l) => (l.id === id ? { ...l, score } : l));
  await AsyncStorage.setItem(KEYS.leads, JSON.stringify(next));
  return next;
}

export function useQuizStorage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(KEYS.attempts).then((raw) => {
      if (cancelled) return;
      setAttempts(parseJson<QuizAttempt[]>(raw, []));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const saveAttempt = useCallback(async (attempt: QuizAttempt) => {
    const raw = await AsyncStorage.getItem(KEYS.attempts);
    const existing = parseJson<QuizAttempt[]>(raw, []);
    const next = [...existing, attempt];
    await AsyncStorage.setItem(KEYS.attempts, JSON.stringify(next));
    setAttempts(next);
  }, []);

  const clearAll = useCallback(async () => {
    await AsyncStorage.multiRemove([KEYS.attempts, KEYS.questions]);
    setAttempts([]);
  }, []);

  return { attempts, saveAttempt, clearAll };
}
