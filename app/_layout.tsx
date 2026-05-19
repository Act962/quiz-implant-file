import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" options={{ title: 'Cadastro' }} />
        <Stack.Screen name="quiz" options={{ title: 'Quiz' }} />
        <Stack.Screen name="result" options={{ title: 'Resultado' }} />
        <Stack.Screen name="admin" options={{ title: 'Admin' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
