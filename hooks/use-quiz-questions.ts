import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import type { Question, QuestionBundle } from '@/constants/quiz-data';
import { fetchQuestions } from '@/lib/api/quiz';
import { subscribeQuestionsUpdated } from '@/lib/pusher';
import { getCachedQuestions, saveCachedQuestions } from '@/hooks/use-quiz-storage';

type State = {
  questions: Question[];
  version: string | null;
  loading: boolean;
  error: string | null;
};

const initial: State = { questions: [], version: null, loading: true, error: null };

export function useQuizQuestions(quizId: string) {
  const [state, setState] = useState<State>(initial);
  const versionRef = useRef<string | null>(null);

  const applyBundle = useCallback((bundle: QuestionBundle) => {
    versionRef.current = bundle.version;
    setState({
      questions: bundle.questions,
      version: bundle.version,
      loading: false,
      error: null,
    });
  }, []);

  const refresh = useCallback(async () => {
    try {
      const bundle = await fetchQuestions(quizId);
      if (bundle.version !== versionRef.current) {
        await saveCachedQuestions(bundle);
        applyBundle(bundle);
      } else {
        setState((s) => ({ ...s, loading: false, error: null }));
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro desconhecido';
      setState((s) => ({
        ...s,
        loading: s.questions.length === 0,
        error: s.questions.length === 0 ? msg : null,
      }));
    }
  }, [quizId, applyBundle]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cached = await getCachedQuestions();
      if (cancelled) return;
      if (cached && cached.quizId === quizId) {
        applyBundle(cached);
      }
      await refresh();
    })();
    return () => {
      cancelled = true;
    };
  }, [quizId, applyBundle, refresh]);

  useEffect(() => {
    const unsubscribe = subscribeQuestionsUpdated(quizId, () => {
      refresh();
    });
    return unsubscribe;
  }, [quizId, refresh]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (status: AppStateStatus) => {
      if (status === 'active') refresh();
    });
    return () => sub.remove();
  }, [refresh]);

  return { ...state, refresh };
}
