import type { QuestionBundle } from '@/constants/quiz-data';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class QuizApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'QuizApiError';
  }
}

export async function fetchQuestions(quizId: string, signal?: AbortSignal): Promise<QuestionBundle> {
  if (!API_URL) {
    throw new QuizApiError('EXPO_PUBLIC_API_URL não configurada');
  }

  const res = await fetch(`${API_URL}/quiz/${encodeURIComponent(quizId)}/questions`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!res.ok) {
    throw new QuizApiError(`Falha ao buscar perguntas (HTTP ${res.status})`, res.status);
  }

  const data = (await res.json()) as QuestionBundle;
  if (!data?.questions || !Array.isArray(data.questions)) {
    throw new QuizApiError('Resposta do servidor em formato inválido');
  }
  return data;
}
