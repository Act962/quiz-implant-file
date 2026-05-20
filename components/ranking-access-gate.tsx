import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { colors, radius, spacing, typography } from '@/constants/theme';

const RANKING_PASSWORD = 'implant123@';

export function RankingAccessGate() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function openModal() {
    setPassword('');
    setError(false);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleSubmit() {
    if (password === RANKING_PASSWORD) {
      setOpen(false);
      router.push('/ranking');
    } else {
      setError(true);
    }
  }

  return (
    <>
      <Pressable onPress={openModal} style={styles.trigger}>
        <Text style={styles.triggerEmoji}>🏆</Text>
        <Text style={styles.triggerLabel}>Ranking</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={closeModal}>
        <Pressable onPress={closeModal} style={styles.overlay}>
          <Pressable onPress={() => {}} style={styles.modal}>
            <Text style={styles.title}>Acesso ao ranking</Text>
            <Text style={styles.subtitle}>Informe a senha para visualizar.</Text>
            <TextInput
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setError(false);
              }}
              placeholder="Senha"
              secureTextEntry
              autoFocus
              onSubmitEditing={handleSubmit}
              style={styles.input}
              placeholderTextColor={colors.placeholder}
            />
            {error && <Text style={styles.errorText}>Senha incorreta.</Text>}
            <View style={styles.actions}>
              <AnimatedPressable onPress={closeModal} style={styles.secondaryButton}>
                <Text style={styles.secondaryLabel}>Cancelar</Text>
              </AnimatedPressable>
              <AnimatedPressable onPress={handleSubmit} style={styles.primaryButton}>
                <Text style={styles.primaryLabel}>Entrar</Text>
              </AnimatedPressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    position: 'absolute',
    top: 12,
    left: 16,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  triggerEmoji: {
    fontSize: 18,
  },
  triggerLabel: {
    ...typography.small,
    fontWeight: '600',
    color: colors.text,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
    paddingHorizontal: spacing['2xl'],
  },
  modal: {
    width: '100%',
    maxWidth: 384,
    backgroundColor: colors.white,
    borderRadius: radius['3xl'],
    padding: spacing['2xl'],
  },
  title: {
    ...typography.title,
    color: colors.textStrong,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius['2xl'],
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...typography.body,
    color: colors.textStrong,
    backgroundColor: colors.white,
  },
  errorText: {
    ...typography.caption,
    color: colors.incorrect,
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: radius['2xl'],
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryLabel: {
    textAlign: 'center',
    color: colors.text,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    borderRadius: radius['2xl'],
    paddingVertical: spacing.md,
    backgroundColor: colors.brand,
  },
  primaryLabel: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
  },
});
