import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { colors, radius, spacing, typography } from '@/constants/theme';

type PasswordDialogProps = {
  visible: boolean;
  title: string;
  subtitle: string;
  expectedPassword: string;
  onClose: () => void;
  onSuccess: () => void;
};

export function PasswordDialog({
  visible,
  title,
  subtitle,
  expectedPassword,
  onClose,
  onSuccess,
}: PasswordDialogProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (visible) {
      setPassword('');
      setError(false);
    }
  }, [visible]);

  function handleSubmit() {
    if (password === expectedPassword) {
      onSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={styles.overlay}>
        <Pressable onPress={() => {}} style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
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
            <AnimatedPressable onPress={onClose} style={styles.secondaryButton}>
              <Text style={styles.secondaryLabel}>Cancelar</Text>
            </AnimatedPressable>
            <AnimatedPressable onPress={handleSubmit} style={styles.primaryButton}>
              <Text style={styles.primaryLabel}>Entrar</Text>
            </AnimatedPressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
