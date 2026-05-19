import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/animated-pressable';
import { HeaderLogo } from '@/components/header-logo';
import type { Lead } from '@/constants/quiz-data';
import { colors, layout, radius, spacing, typography } from '@/constants/theme';
import { getStoredLeads, updateLeadStatus } from '@/hooks/use-quiz-storage';
import { submitLead } from '@/lib/api/leads';

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString('pt-BR');
}

type BadgeStyle = { text: string; container: ViewStyle; label: TextStyle };

function statusBadge(s: Lead['status']): BadgeStyle {
  if (s === 'sent') {
    return {
      text: 'Enviado',
      container: { backgroundColor: colors.correctBadge },
      label: { color: colors.correct },
    };
  }
  if (s === 'error') {
    return {
      text: 'Erro',
      container: { backgroundColor: colors.incorrectBadge },
      label: { color: colors.incorrect },
    };
  }
  return {
    text: 'Pendente',
    container: { backgroundColor: colors.surfaceStrong },
    label: { color: colors.text },
  };
}

export default function AdminScreen() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const refresh = useCallback(async () => {
    const list = await getStoredLeads();
    setLeads(list.slice().sort((a, b) => b.createdAt - a.createdAt));
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const pendingCount = leads.filter((l) => l.status !== 'sent').length;

  async function handleSendOne(lead: Lead) {
    setSending(true);
    const result = await submitLead(lead);
    const next = result.ok
      ? await updateLeadStatus(lead.id, { status: 'sent', sentAt: Date.now() })
      : await updateLeadStatus(lead.id, { status: 'error', errorMessage: result.message });
    setLeads(next.slice().sort((a, b) => b.createdAt - a.createdAt));
    setSending(false);
  }

  async function handleSendAllPending() {
    setSending(true);
    const pending = leads.filter((l) => l.status !== 'sent');
    let working = leads;
    for (const lead of pending) {
      const result = await submitLead(lead);
      working = result.ok
        ? await updateLeadStatus(lead.id, { status: 'sent', sentAt: Date.now() })
        : await updateLeadStatus(lead.id, { status: 'error', errorMessage: result.message });
    }
    setLeads(working.slice().sort((a, b) => b.createdAt - a.createdAt));
    setSending(false);
  }

  async function handleSendAll() {
    setSending(true);
    let working = leads;
    for (const lead of leads) {
      const result = await submitLead(lead);
      working = result.ok
        ? await updateLeadStatus(lead.id, { status: 'sent', sentAt: Date.now() })
        : await updateLeadStatus(lead.id, { status: 'error', errorMessage: result.message });
    }
    setLeads(working.slice().sort((a, b) => b.createdAt - a.createdAt));
    setSending(false);
  }

  const sendDisabled = sending || pendingCount === 0;
  const sendAllDisabled = sending || leads.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderLogo />
      <View style={styles.header}>
        <AnimatedPressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backLabel}>{'< Voltar'}</Text>
        </AnimatedPressable>
        <Text style={styles.title}>Admin · Leads</Text>
        <Text style={styles.subtitle}>
          {leads.length} cadastro(s) · {pendingCount} pendente(s)
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <AnimatedPressable
          onPress={handleSendAllPending}
          disabled={sendDisabled}
          style={[
            styles.sendAllButton,
            sendDisabled ? styles.sendAllDisabled : styles.sendAllActive,
          ]}
        >
          <Text style={styles.sendAllLabel}>
            {sending ? 'Enviando...' : `Enviar pendentes (${pendingCount})`}
          </Text>
        </AnimatedPressable>
        <AnimatedPressable
          onPress={refresh}
          disabled={sending}
          style={styles.refreshButton}
        >
          <Text style={styles.refreshLabel}>Atualizar</Text>
        </AnimatedPressable>
      </View>

      <View style={styles.secondaryActionsRow}>
        <AnimatedPressable
          onPress={handleSendAll}
          disabled={sendAllDisabled}
          style={[
            styles.sendEverythingButton,
            sendAllDisabled && styles.sendEverythingDisabled,
          ]}
        >
          <Text
            style={[
              styles.sendEverythingLabel,
              sendAllDisabled && styles.sendEverythingLabelDisabled,
            ]}
          >
            {sending ? 'Enviando...' : `Subir todos (${leads.length})`}
          </Text>
        </AnimatedPressable>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.brand} />
        </View>
      ) : leads.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Nenhum cadastro registrado ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => {
            const badge = statusBadge(item.status);
            return (
              <View style={styles.leadCard}>
                <View style={styles.leadHeader}>
                  <Text style={styles.leadName}>{item.name}</Text>
                  <View style={[styles.badge, badge.container]}>
                    <Text style={[styles.badgeLabel, badge.label]}>{badge.text}</Text>
                  </View>
                </View>
                <Text style={styles.leadDetail}>{item.phone}</Text>
                {item.email ? <Text style={styles.leadDetail}>{item.email}</Text> : null}
                <Text style={styles.leadMeta}>
                  Cadastrado: {formatDate(item.createdAt)}
                  {item.sentAt ? ` · Enviado: ${formatDate(item.sentAt)}` : ''}
                </Text>
                {item.errorMessage ? (
                  <Text style={styles.leadError}>{item.errorMessage}</Text>
                ) : null}
                {item.status !== 'sent' && (
                  <AnimatedPressable
                    onPress={() => handleSendOne(item)}
                    disabled={sending}
                    style={[
                      styles.sendOneButton,
                      sending ? styles.sendAllDisabled : styles.sendAllActive,
                    ]}
                  >
                    <Text style={styles.sendOneLabel}>Enviar agora</Text>
                  </AnimatedPressable>
                )}
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    marginBottom: spacing.md,
    alignSelf: 'flex-start',
  },
  backLabel: {
    color: colors.brand,
    fontWeight: '600',
  },
  title: {
    ...typography.display,
    color: colors.textStrong,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  actionsRow: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    gap: spacing.md,
  },
  secondaryActionsRow: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  sendEverythingButton: {
    borderRadius: radius['2xl'],
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.brand,
    backgroundColor: colors.brandTint,
  },
  sendEverythingDisabled: {
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  sendEverythingLabel: {
    textAlign: 'center',
    color: colors.brand,
    fontWeight: '600',
  },
  sendEverythingLabelDisabled: {
    color: colors.textMuted,
  },
  sendAllButton: {
    flex: 1,
    borderRadius: radius['2xl'],
    paddingVertical: spacing.md,
  },
  sendAllActive: {
    backgroundColor: colors.brand,
  },
  sendAllDisabled: {
    backgroundColor: colors.border,
  },
  sendAllLabel: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '700',
  },
  refreshButton: {
    borderRadius: radius['2xl'],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  refreshLabel: {
    color: colors.text,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['3xl'],
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  separator: {
    height: spacing.md,
  },
  leadCard: {
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.surfaceStrong,
    backgroundColor: colors.surfaceMuted,
    padding: spacing.lg,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  leadName: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textStrong,
    flex: 1,
    marginRight: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  badgeLabel: {
    ...typography.caption,
    fontWeight: '600',
  },
  leadDetail: {
    ...typography.small,
    color: colors.text,
  },
  leadMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  leadError: {
    ...typography.caption,
    color: colors.incorrect,
    marginTop: spacing.xs,
  },
  sendOneButton: {
    marginTop: spacing.md,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm,
  },
  sendOneLabel: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
    ...typography.small,
  },
});
