import { Image } from 'expo-image';
import { StyleSheet, View, type ViewStyle } from 'react-native';

const backgroundSource = require('@/assets/images/screen-background.svg');

export function ScreenBackground({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={backgroundSource}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        pointerEvents="none"
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
