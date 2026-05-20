import { router, useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/animated-pressable';
import { HeaderLogo } from '@/components/header-logo';
import type { Lead } from '@/constants/quiz-data';
import { colors, layout, radius, spacing, typography } from '@/constants/theme';
import { getStoredLeads } from '@/hooks/use-quiz-storage';
import { maskPhone } from '@/lib/phone-mask';

function sortLeads(list: Lead[]): Lead[] {
  return list.slice().sort((a, b) => {
    const sa = a.score?.correctCount ?? -1;
    const sb = b.score?.correctCount ?? -1;
    if (sb !== sa) return sb - sa;
    const ta = a.score?.completedAt ?? a.createdAt;
    const tb = b.score?.completedAt ?? b.createdAt;
    return tb - ta;
  });
}

export default function RankingScreen() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      getStoredLeads().then((list) => {
        if (cancelled) return;
        setLeads(sortLeads(list));
        setLoaded(true);
      });
      return () => {
        cancelled = true;
      };
    }, []),
  );

  const sorted = useMemo(() => sortLeads(leads), [leads]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderLogo />
      <View style={styles.headerRow}>
        <AnimatedPressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backLabel}>‹ Voltar</Text>
        </AnimatedPressable>
        <Text style={styles.title}>Ranking</Text>
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(l) => l.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          loaded ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Nenhum cadastro ainda.</Text>
            </View>
          ) : null
        }
        renderItem={({ item, index }) => {
          const score = item.score;
          return (
            <View style={styles.row}>
              <Text style={styles.position}>#{index + 1}</Text>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>{maskPhone(item.phone)}</Text>
                <Text style={styles.metaEmail}>{item.email || '—'}</Text>
              </View>
              <View style={styles.scoreBox}>
                {score ? (
                  <>
                    <Text style={styles.scoreNumber}>
                      {score.correctCount}
                      <Text style={styles.scoreTotal}> / {score.totalQuestions}</Text>
                    </Text>
                    <Text style={styles.scoreLabel}>acertos</Text>
                  </>
                ) : (
                  <Text style={styles.scoreEmpty}>—</Text>
                )}
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerRow: {
    paddingTop: spacing['4xl'],
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.contentMaxWidth,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  backLabel: {
    ...typography.body,
    color: colors.brand,
    fontWeight: '600',
  },
  title: {
    ...typography.display,
    color: colors.textStrong,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.contentMaxWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius['2xl'],
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  position: {
    ...typography.titleLarge,
    color: colors.brand,
    minWidth: 44,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    ...typography.bodyBold,
    color: colors.textStrong,
  },
  meta: {
    ...typography.small,
    color: colors.textSecondary,
  },
  metaEmail: {
    ...typography.caption,
    color: colors.textMuted,
  },
  scoreBox: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  scoreNumber: {
    ...typography.title,
    color: colors.textStrong,
  },
  scoreTotal: {
    ...typography.small,
    color: colors.textMuted,
    fontWeight: '400',
  },
  scoreLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  scoreEmpty: {
    ...typography.title,
    color: colors.textMuted,
  },
  empty: {
    paddingVertical: spacing['3xl'],
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },
});
