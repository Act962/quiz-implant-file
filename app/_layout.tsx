import { Asset } from 'expo-asset';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

const backgroundAsset = Asset.fromModule(
  require('@/assets/images/screen-background.svg')
);
backgroundAsset
  .downloadAsync()
  .then(() => Image.prefetch(backgroundAsset.localUri ?? backgroundAsset.uri, 'memory-disk'));

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" options={{ title: 'Cadastro' }} />
        <Stack.Screen name="quiz" options={{ title: 'Quiz' }} />
        <Stack.Screen name="result" options={{ title: 'Resultado' }} />
        <Stack.Screen name="admin" options={{ title: 'Admin' }} />
        <Stack.Screen name="ranking" options={{ title: 'Ranking' }} />
      </Stack>
      <StatusBar hidden />
    </>
  );
}
