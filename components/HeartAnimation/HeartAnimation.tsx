import React, { FC, useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

interface HeartAnimationProps {
  isVisible: boolean;
  position: { x: number; y: number };
}

const NUMBER_OF_HEARTS = 150;
const { width, height } = Dimensions.get("window");

export const HeartAnimation: FC<HeartAnimationProps> = ({
  isVisible,
  position,
}) => {
  const animations = useRef(
    [...Array(NUMBER_OF_HEARTS)].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    if (isVisible) {
      animations.forEach((animation, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(animation, {
              toValue: 1,
              duration: 5000,
              delay: index * 50,
              easing: Easing.out(Easing.exp),
              useNativeDriver: true,
            }),
            Animated.timing(animation, {
              toValue: 0,
              duration: 5000,
              easing: Easing.in(Easing.exp),
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    } else {
      animations.forEach((animation) => animation.setValue(0));
    }
  }, [isVisible]);

  return (
    <>
      {animations.map((animation, index) => {
        // Random directions and distances
        const randomX = Math.random() * width - position.x;
        const randomY = Math.random() * height - position.y;

        const translateX = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, randomX],
        });

        const translateY = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, randomY],
        });

        const scale = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, Math.random() * 1.5],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.heartContainer,
              {
                transform: [
                  { translateX: translateX },
                  { translateY: translateY },
                  { scale },
                ],
                position: "absolute",
                top: position.y,
                left: position.x,
              },
            ]}
          >
            <Image
              source={require("../../assets/images/heart-icon.png")}
              style={styles.heart}
            />
          </Animated.View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  heartContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    elevation: 1000,
  },
  heart: {
    width: 50,
    height: 50,
    tintColor: "purple",
  },
});
