import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/constants/theme';

type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.min(100, Math.round((current / total) * 100));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>
          Pergunta {Math.min(current, total)} de {total}
        </Text>
        <Text style={styles.percent}>{pct}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.small,
    color: colors.textSecondary,
  },
  percent: {
    ...typography.small,
    fontWeight: '600',
    color: colors.brand,
  },
  track: {
    height: 8,
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.brand,
    borderRadius: radius.full,
  },
});
