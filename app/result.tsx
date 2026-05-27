import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/animated-pressable';
import { HeaderLogo } from '@/components/header-logo';
import { ScreenBackground } from '@/components/screen-background';
import { colors, layout, radius, spacing, typography } from '@/constants/theme';

function getFeedback(pct: number): { title: string; emoji: string; message: string } {
  if (pct >= 80) {
    return {
      title: 'Excelente!',
      emoji: '🏆',
      message: 'Você dominou o conteúdo. Parabéns pelo desempenho!',
    };
  }
  if (pct >= 50) {
    return {
      title: 'Bom trabalho',
      emoji: '👏',
      message: 'Você foi bem, mas ainda dá para melhorar. Continue praticando!',
    };
  }
  return {
    title: 'Continue estudando',
    emoji: '📚',
    message: 'Reveja o conteúdo e tente novamente. Você consegue!',
  };
}

export default function ResultScreen() {
  const params = useLocalSearchParams<{ correct?: string; total?: string }>();
  const correct = Number(params.correct ?? 0);
  const total = Number(params.total ?? 0);
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  const feedback = getFeedback(pct);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safeArea}>
        <HeaderLogo />
        <View style={styles.content}>
        <Text style={styles.emoji}>{feedback.emoji}</Text>

        <Text style={styles.title}>{feedback.title}</Text>

        <Text style={styles.message}>{feedback.message}</Text>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreCaption}>Sua pontuação</Text>
          <Text style={styles.scoreNumber}>
            {correct}
            <Text style={styles.scoreTotal}> / {total}</Text>
          </Text>
          <Text style={styles.scorePercent}>{pct}% de acertos</Text>
        </View>

        <AnimatedPressable
          onPress={() => router.replace('/')}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryLabel}>Voltar ao início</Text>
        </AnimatedPressable>
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['3xl'],
  },
  emoji: {
    ...typography.emojiLarge,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.display,
    color: colors.textOnBg,
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.body,
    color: colors.textOnBgMuted,
    textAlign: 'center',
    marginBottom: spacing['3xl'],
  },
  scoreCard: {
    width: '100%',
    borderRadius: radius['3xl'],
    backgroundColor: colors.surface,
    padding: spacing['2xl'],
    marginBottom: spacing['3xl'],
  },
  scoreCaption: {
    textAlign: 'center',
    ...typography.small,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  scoreNumber: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: '700',
    color: colors.brand,
    marginBottom: spacing.xs,
  },
  scoreTotal: {
    fontSize: 30,
    color: colors.textMuted,
  },
  scorePercent: {
    textAlign: 'center',
    ...typography.body,
    color: colors.textSecondary,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.brand,
    borderRadius: radius['2xl'],
    paddingVertical: spacing.lg,
  },
  primaryLabel: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
});
