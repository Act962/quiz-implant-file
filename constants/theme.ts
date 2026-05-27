import { RFValue } from 'react-native-responsive-fontsize';

export const colors = {
  brand: '#0a7ea4',
  brandTint: 'rgba(10, 126, 164, 0.1)',
  correct: '#16a34a',
  correctTint: 'rgba(22, 163, 74, 0.2)',
  correctBadge: 'rgba(22, 163, 74, 0.15)',
  incorrect: '#dc2626',
  incorrectTint: 'rgba(220, 38, 38, 0.2)',
  incorrectBadge: 'rgba(220, 38, 38, 0.15)',

  white: '#ffffff',
  background: '#ffffff',
  surfaceMuted: '#fafafa',
  surface: '#f5f5f5',
  surfaceStrong: '#e5e5e5',
  border: '#d4d4d4',

  textMuted: '#737373',
  textSecondary: '#525252',
  text: '#404040',
  textStrong: '#171717',

  textOnBg: '#ffffff',
  textOnBgMuted: 'rgba(255, 255, 255, 0.78)',
  textOnBgFaint: 'rgba(255, 255, 255, 0.55)',

  overlay: 'rgba(0, 0, 0, 0.5)',
  placeholder: '#9ca3af',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

export const typography = {
  caption: { fontSize: RFValue(11), lineHeight: RFValue(16) },
  small: { fontSize: RFValue(13), lineHeight: RFValue(20) },
  body: { fontSize: RFValue(15), lineHeight: RFValue(24) },
  bodyBold: { fontSize: RFValue(15), lineHeight: RFValue(24), fontWeight: '700' as const },
  title: { fontSize: RFValue(18), lineHeight: RFValue(26), fontWeight: '700' as const },
  titleLarge: { fontSize: RFValue(22), lineHeight: RFValue(30), fontWeight: '700' as const },
  display: { fontSize: RFValue(26), lineHeight: RFValue(34), fontWeight: '700' as const },
  hero: { fontSize: RFValue(32), lineHeight: RFValue(38), fontWeight: '700' as const },
  emojiLarge: { fontSize: RFValue(56) },
};

export const layout = {
  contentMaxWidth: 640,
  imageMaxHeight: 320,
};

export const animation = {
  bounceDuration: 220,
  fadeDuration: 260,
};
