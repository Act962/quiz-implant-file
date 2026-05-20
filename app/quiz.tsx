import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/animated-pressable';
import { HeaderLogo } from '@/components/header-logo';
import { ProgressBar } from '@/components/quiz/progress-bar';
import { QuestionCard } from '@/components/quiz/question-card';
import { quizImplantQuestions } from '@/constants/mock';
import { type AnswerRecord } from '@/constants/quiz-data';
import { colors, layout, radius, spacing, typography } from '@/constants/theme';
import { updateLeadScore, useQuizStorage } from '@/hooks/use-quiz-storage';

const QUESTION_LIMIT = 10;

function shuffleAndPick<T>(arr: readonly T[], n: number): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

export default function QuizScreen() {
  const { leadId } = useLocalSearchParams<{ leadId?: string }>();
  const { saveAttempt } = useQuizStorage();
  const [questions] = useState(() => shuffleAndPick(quizImplantQuestions, QUESTION_LIMIT));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const total = questions.length;
  const question = questions[currentIndex];
  const isLast = currentIndex === total - 1;
  const correctCount = useMemo(() => answers.filter((a) => a.correct).length, [answers]);

  function handleSelect(optionId: string) {
    if (revealed || !question) return;
    const correct = optionId === question.correctOptionId;
    setSelectedOptionId(optionId);
    setRevealed(true);
    setAnswers((prev) => [
      ...prev,
      { questionId: question.id, selectedOptionId: optionId, correct },
    ]);
    Haptics.notificationAsync(
      correct
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Error,
    ).catch(() => {});
  }

  async function handleNext() {
    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      setSelectedOptionId(null);
      setRevealed(false);
      return;
    }

    const finalCorrect = answers.filter((a) => a.correct).length;
    const completedAt = Date.now();
    await saveAttempt({
      completedAt,
      totalQuestions: total,
      correctCount: finalCorrect,
      answers,
    });
    if (leadId) {
      await updateLeadScore(leadId, {
        correctCount: finalCorrect,
        totalQuestions: total,
        completedAt,
      });
    }
    router.replace({
      pathname: '/result',
      params: { correct: String(finalCorrect), total: String(total) },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderLogo />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <ProgressBar current={currentIndex + 1} total={total} />

          <Text style={styles.scoreLabel}>
            Acertos: <Text style={styles.scoreValue}>{correctCount}</Text> / {total}
          </Text>

          {question && (
            <QuestionCard
              question={question}
              selectedOptionId={selectedOptionId}
              revealed={revealed}
              onSelect={handleSelect}
            />
          )}

          <AnimatedPressable
            onPress={handleNext}
            disabled={!revealed}
            style={[
              styles.nextButton,
              revealed ? styles.nextButtonActive : styles.nextButtonDisabled,
            ]}
          >
            <Text style={styles.nextLabel}>{isLast ? 'Ver resultado' : 'Próxima'}</Text>
          </AnimatedPressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing['2xl'],
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: layout.contentMaxWidth,
  },
  scoreLabel: {
    ...typography.small,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  scoreValue: {
    fontWeight: '600',
    color: colors.brand,
  },
  nextButton: {
    marginTop: spacing['2xl'],
    borderRadius: radius['2xl'],
    paddingVertical: spacing.lg,
  },
  nextButtonActive: {
    backgroundColor: colors.brand,
  },
  nextButtonDisabled: {
    backgroundColor: colors.border,
  },
  nextLabel: {
    ...typography.bodyBold,
    textAlign: 'center',
    color: colors.white,
  },
});
