import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PasswordDialog } from '@/components/password-dialog';
import { colors, radius, spacing, typography } from '@/constants/theme';

const ADMIN_PASSWORD = 'Fala1234@';
const RANKING_PASSWORD = 'implant123@';

type Dialog = null | 'admin' | 'ranking';

export function SecretMenu() {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState<Dialog>(null);

  function openMenu() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function openDialog(which: Exclude<Dialog, null>) {
    setMenuOpen(false);
    setDialog(which);
  }

  function closeDialog() {
    setDialog(null);
  }

  return (
    <>
      <Pressable
        onLongPress={openMenu}
        delayLongPress={500}
        style={styles.trigger}
        hitSlop={12}
      >
        <View style={styles.circle} />
      </Pressable>

      <Modal
        visible={menuOpen}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.menuOverlay} onPress={closeMenu}>
          <Animated.View
            entering={FadeIn.duration(120)}
            exiting={FadeOut.duration(80)}
            style={[
              styles.menu,
              { top: insets.top + 44, left: 16 },
            ]}
            onStartShouldSetResponder={() => true}
          >
            <MenuItem
              icon="🏆"
              label="Ranking"
              onPress={() => openDialog('ranking')}
            />
            <View style={styles.separator} />
            <MenuItem
              icon="🔒"
              label="Admin"
              onPress={() => openDialog('admin')}
            />
          </Animated.View>
        </Pressable>
      </Modal>

      <PasswordDialog
        visible={dialog === 'ranking'}
        title="Acesso ao ranking"
        subtitle="Informe a senha para visualizar."
        expectedPassword={RANKING_PASSWORD}
        onClose={closeDialog}
        onSuccess={() => {
          closeDialog();
          router.push('/ranking');
        }}
      />

      <PasswordDialog
        visible={dialog === 'admin'}
        title="Acesso restrito"
        subtitle="Informe a senha de administrador."
        expectedPassword={ADMIN_PASSWORD}
        onClose={closeDialog}
        onSuccess={() => {
          closeDialog();
          router.push('/admin');
        }}
      />
    </>
  );
}

function MenuItem({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      android_ripple={{ color: colors.surface }}
    >
      <Text style={styles.itemIcon}>{icon}</Text>
      <Text style={styles.itemLabel}>{label}</Text>
    </Pressable>
  );
}

const CIRCLE_SIZE = 14;

const styles = StyleSheet.create({
  trigger: {
    position: 'absolute',
    top: 12,
    left: 16,
    zIndex: 10,
    padding: 6,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.white,
    opacity: 0.85,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menu: {
    position: 'absolute',
    minWidth: 184,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.sm,
    marginHorizontal: spacing.xs,
  },
  itemPressed: {
    backgroundColor: colors.surface,
  },
  itemIcon: {
    fontSize: 16,
    width: 20,
    textAlign: 'center',
  },
  itemLabel: {
    ...typography.small,
    fontWeight: '600',
    color: colors.textStrong,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
    marginHorizontal: spacing.sm,
  },
});
