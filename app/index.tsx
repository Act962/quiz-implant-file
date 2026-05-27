import { useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedPressable } from "@/components/animated-pressable";
import { ScreenBackground } from "@/components/screen-background";
import { SecretMenu } from "@/components/secret-menu";
import { colors, radius, spacing, typography } from "@/constants/theme";

const clickSound = require("@/assets/sounds/click-sound.wav");

export default function WelcomeScreen() {
  const translateY = useSharedValue(0);
  const lottieRef = useRef<LottieView>(null);
  const clickPlayer = useAudioPlayer(clickSound);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-12, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [translateY]);

  const animatedContainer = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safeArea}>
        <SecretMenu />
        <View style={styles.content}>
        <Animated.View style={[styles.lottieWrapper, animatedContainer]}>
          <LottieView
            ref={lottieRef}
            source={require("@/assets/animations/Estudant.json")}
            autoPlay
            loop
            style={styles.lottie}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={styles.title}>Quiz de Implantodontia</Text>

        <Text style={styles.subtitle}>
          Teste seus conhecimentos com perguntas práticas e veja sua pontuação
          ao final.
        </Text>

        <AnimatedPressable
          onPress={() => {
            try {
              clickPlayer.seekTo(0);
              clickPlayer.play();
            } catch {}
            router.push("/register");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>Começar</Text>
        </AnimatedPressable>
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const LOTTIE_SIZE = RFValue(250);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing["3xl"],
  },
  lottieWrapper: {
    width: LOTTIE_SIZE,
    height: LOTTIE_SIZE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing["2xl"],
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
  title: {
    ...typography.hero,
    color: colors.textOnBg,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textOnBgMuted,
    textAlign: "center",
    marginBottom: spacing["4xl"],
  },
  button: {
    width: "100%",
    backgroundColor: colors.brand,
    borderRadius: radius["2xl"],
    paddingVertical: spacing.lg,
  },
  buttonLabel: {
    textAlign: "center",
    color: colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
});
