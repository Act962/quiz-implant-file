import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressableInner = Animated.createAnimatedComponent(Pressable);

type AnimatedPressableProps = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
  pressDuration?: number;
  releaseDuration?: number;
};

export function AnimatedPressable({
  style,
  scaleTo = 0.96,
  pressDuration = 110,
  releaseDuration = 160,
  onPressIn,
  onPressOut,
  ...rest
}: AnimatedPressableProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressableInner
      onPressIn={(e) => {
        scale.value = withTiming(scaleTo, { duration: pressDuration });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withTiming(1, { duration: releaseDuration });
        onPressOut?.(e);
      }}
      style={[style, animatedStyle]}
      {...rest}
    />
  );
}
