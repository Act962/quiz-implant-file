import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export function HeaderLogo() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/logos/logo.png')}
        style={styles.logo}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 10,
  },
  logo: {
    width: 48,
    height: 56,
  },
});
