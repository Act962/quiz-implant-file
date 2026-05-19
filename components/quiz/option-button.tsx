import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { animation, colors, radius, spacing, typography } from '@/constants/theme';

type OptionButtonProps = {
  label: string;
  letter: string;
  selected: boolean;
  revealed: boolean;
  isCorrect: boolean;
  onPress: () => void;
};

export function OptionButton({
  label,
  letter,
  selected,
  revealed,
  isCorrect,
  onPress,
}: OptionButtonProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (revealed && isCorrect) {
      scale.value = withSequence(
        withTiming(1.04, { duration: animation.bounceDuration / 2 }),
        withSpring(1, { damping: 12, stiffness: 200 }),
      );
    } else {
      scale.value = 1;
    }
  }, [revealed, isCorrect, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const stateStyle = (() => {
    if (!revealed) {
      return selected
        ? { borderColor: colors.brand, backgroundColor: colors.brandTint }
        : { borderColor: colors.border, backgroundColor: colors.white };
    }
    if (isCorrect) {
      return { borderColor: colors.correct, backgroundColor: colors.correctTint };
    }
    if (selected && !isCorrect) {
      return { borderColor: colors.incorrect, backgroundColor: colors.incorrectTint };
    }
    return { borderColor: colors.border, backgroundColor: colors.white, opacity: 0.6 };
  })();

  const isHighlighted = revealed && (isCorrect || selected);

  return (
    <Animated.View style={animatedStyle}>
      <Pressable onPress={onPress} disabled={revealed} style={[styles.button, stateStyle]}>
        <View style={styles.letterBubble}>
          <Text style={styles.letter}>{letter.toUpperCase()}</Text>
        </View>
        <Text
          style={[
            styles.label,
            isHighlighted ? styles.labelHighlighted : styles.labelDefault,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius['2xl'],
    borderWidth: 2,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  letterBubble: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  letter: {
    fontWeight: '700',
    color: colors.text,
  },
  label: {
    flex: 1,
    ...typography.body,
  },
  labelDefault: {
    color: colors.text,
  },
  labelHighlighted: {
    color: colors.textStrong,
    fontWeight: '600',
  },
});
