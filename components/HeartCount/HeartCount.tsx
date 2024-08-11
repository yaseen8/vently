import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";

interface HeartCountProps {
  count: number;
  position: { x: number; y: number };
}

const { width, height } = Dimensions.get("window");

export const HeartCount: FC<HeartCountProps> = ({ count, position }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current; // Animation for rotation
  const counterAnim = useRef(new Animated.Value(0)).current; // Animation for the counter value
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    // Animation for scaling, opacity, and rotation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ) as unknown as Animated.CompositeAnimation,
    ]).start();

    Animated.timing(counterAnim, {
      toValue: count,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    counterAnim.addListener(({ value }) => {
      setDisplayCount(Math.round(value));
    });

    return () => {
      counterAnim.removeAllListeners();
    };
  }, [count]);

  const scale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 3], // Start small and grow to 3x size
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Rotate from 0 to 360 degrees
  });

  const adjustedX = Math.min(Math.max(position.x, 0), width - 50);
  const adjustedY = Math.min(Math.max(position.y, 0), height - 50);

  return (
    <Animated.View
      style={[
        styles.countContainer,
        {
          transform: [{ scale }, { rotate }],
          opacity: opacityAnim,
          position: "absolute",
          top: adjustedY,
          left: adjustedX,
          zIndex: 1000,
        },
      ]}
    >
      <Text style={styles.count}>{displayCount}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  countContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    fontSize: 40,
    fontWeight: "bold",
    color: "purple",
  },
});
