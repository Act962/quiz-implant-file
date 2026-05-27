import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { Question } from '@/constants/quiz-data';
import { animation, colors, layout, radius, spacing, typography } from '@/constants/theme';

import { OptionButton } from './option-button';

type QuestionCardProps = {
  question: Question;
  selectedOptionId: string | null;
  revealed: boolean;
  onSelect: (optionId: string) => void;
};

export function QuestionCard({
  question,
  selectedOptionId,
  revealed,
  onSelect,
}: QuestionCardProps) {
  const explanationOpacity = useSharedValue(0);
  const explanationTranslate = useSharedValue(8);

  useEffect(() => {
    if (revealed && question.explanation) {
      explanationOpacity.value = withTiming(1, { duration: animation.fadeDuration });
      explanationTranslate.value = withTiming(0, { duration: animation.fadeDuration });
    } else {
      explanationOpacity.value = 0;
      explanationTranslate.value = 8;
    }
  }, [revealed, question.explanation, explanationOpacity, explanationTranslate]);

  const explanationStyle = useAnimatedStyle(() => ({
    opacity: explanationOpacity.value,
    transform: [{ translateY: explanationTranslate.value }],
  }));

  return (
    <View style={styles.card}>
      {(question.caseId || question.level) && (
        <View style={styles.tagsRow}>
          {question.caseId && (
            <View style={styles.caseBadge}>
              <Text style={styles.caseBadgeText}>Caso {question.caseId}</Text>
            </View>
          )}
          {question.level && (
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>{question.level}</Text>
            </View>
          )}
        </View>
      )}
      {question.image && (
        <Image source={question.image} style={styles.image} resizeMode="contain" />
      )}
      <Text style={styles.prompt}>{question.prompt}</Text>

      {question.options.map((option, index) => (
        <OptionButton
          key={option.id}
          label={option.text}
          letter={String.fromCharCode(65 + index)}
          selected={selectedOptionId === option.id}
          revealed={revealed}
          isCorrect={option.id === question.correctOptionId}
          onPress={() => onSelect(option.id)}
        />
      ))}

      {revealed && question.explanation && (
        <Animated.View style={[styles.explanationBox, explanationStyle]}>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius['3xl'],
    backgroundColor: colors.white,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  caseBadge: {
    borderRadius: radius.full,
    backgroundColor: colors.brandTint,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginRight: spacing.sm,
  },
  caseBadgeText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.brand,
  },
  levelBadge: {
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  levelBadgeText: {
    ...typography.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: colors.text,
  },
  image: {
    width: '100%',
    height: layout.imageMaxHeight,
    borderRadius: radius['2xl'],
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  prompt: {
    ...typography.title,
    color: colors.textStrong,
    marginBottom: spacing.xl,
  },
  explanationBox: {
    marginTop: spacing.md,
    borderRadius: radius['2xl'],
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  explanationText: {
    ...typography.small,
    color: colors.text,
  },
});
