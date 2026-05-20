import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/animated-pressable';
import { HeaderLogo } from '@/components/header-logo';
import { MaskedPhoneInput } from '@/components/masked-phone-input';
import { colors, layout, radius, spacing, typography } from '@/constants/theme';
import { appendLead } from '@/hooks/use-quiz-storage';
import { isValidPhone } from '@/lib/phone-mask';

function isEmailLocalPartValid(email: string): boolean {
  if (email.length === 0) return true;
  const localPart = email.split('@')[0] ?? '';
  return localPart.trim().length > 0;
}

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const trimmedName = name.trim();
  const nameValid = trimmedName.length > 0;
  const phoneValid = isValidPhone(phone);
  const emailValid = isEmailLocalPartValid(email.trim());
  const canSubmit = nameValid && phoneValid && emailValid && !submitting;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const createdAt = Date.now();
      const trimmedEmail = email.trim() || undefined;
      const leadId = `${createdAt}-${Math.random().toString(36).slice(2, 8)}`;
      await appendLead({
        id: leadId,
        name: trimmedName,
        phone,
        email: trimmedEmail,
        createdAt,
        status: 'pending',
      });
      router.replace({ pathname: '/quiz', params: { leadId } });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderLogo />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Cadastro</Text>
          <Text style={styles.subtitle}>Preencha seus dados para começar o quiz.</Text>

          <Field label="Nome *">
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Seu nome completo"
              autoCapitalize="words"
              style={styles.input}
              placeholderTextColor={colors.placeholder}
            />
          </Field>

          <Field label="Telefone *">
            <MaskedPhoneInput
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              placeholderTextColor={colors.placeholder}
            />
            {!phoneValid && phone.length > 5 && (
              <Text style={styles.errorText}>Informe os 11 dígitos do telefone.</Text>
            )}
          </Field>

          <Field label="E-mail (opcional)">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="seuemail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor={colors.placeholder}
            />
          </Field>

          <AnimatedPressable
            onPress={handleSubmit}
            disabled={!canSubmit}
            style={[
              styles.submitButton,
              canSubmit ? styles.submitButtonActive : styles.submitButtonDisabled,
            ]}
          >
            <Text style={styles.submitLabel}>
              {submitting ? 'Salvando...' : 'Continuar'}
            </Text>
          </AnimatedPressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing['3xl'],
  },
  title: {
    ...typography.display,
    color: colors.textStrong,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing['3xl'],
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
    marginTop: spacing.xs,
  },
  field: {
    marginBottom: spacing.xl,
  },
  fieldLabel: {
    ...typography.small,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  submitButton: {
    marginTop: spacing.lg,
    borderRadius: radius['2xl'],
    paddingVertical: spacing.lg,
  },
  submitButtonActive: {
    backgroundColor: colors.brand,
  },
  submitButtonDisabled: {
    backgroundColor: colors.border,
  },
  submitLabel: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
});
