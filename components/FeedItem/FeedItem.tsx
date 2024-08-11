import { FeedDataDto } from "@/shared/dtos/feed-data.dto";
import { formatTime } from "@/shared/util/formatTime";
import { FC, useState } from "react";
import { Text, Image, XStack, YStack, Card, Button } from "tamagui";
import {
  Animated,
  TouchableWithoutFeedback,
  Easing,
  StyleSheet,
} from "react-native";

interface FeedItemProps {
  post: FeedDataDto;
  triggerAnimation(post: FeedDataDto, position: { x: number; y: number }): void;
}

export const FeedItem: FC<FeedItemProps> = ({ post, triggerAnimation }) => {
  const [animation] = useState(new Animated.Value(0));

  const handleLongPress = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    triggerAnimation(post, { x: pageX, y: pageY });
    triggerBounceAndShake();
  };
  const triggerBounceAndShake = () => {
    Animated.sequence([
      // Bounce effect
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      // Shake effect
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 2 }
      ),
    ]).start();
  };

  const animatedStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.1],
        }),
      },
      {
        translateX: animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, -10, 0],
        }),
      },
    ],
  };

  return (
    <TouchableWithoutFeedback onLongPress={handleLongPress}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Card
          backgroundColor="#f2f2f9"
          borderRadius="$6"
          paddingHorizontal="$4"
          shadowColor="$shadowColor"
          shadowOpacity={0.1}
          shadowRadius="$4"
          elevation="$2"
          marginBottom="$4"
          margin="$2"
          testID="feed-item"
        >
          <XStack alignItems="center" marginBottom="$4" marginTop="$4">
            <YStack width="$3" height="$3" borderRadius="$7" overflow="hidden">
              <Image
                source={{ uri: post.avatar }}
                width="100%"
                height="100%"
                resizeMode="cover"
              />
            </YStack>
            <YStack marginLeft="$3">
              <Text fontWeight="bold">{post.username}</Text>
              <XStack alignItems="center">
                <Text color="$gray">{formatTime(post.createdAt)} .</Text>
                <Text color="$gray"> at </Text>
                <Text color="$gray" textDecorationLine="underline">
                  {post.location}
                </Text>
              </XStack>
            </YStack>
          </XStack>
          <Text color="#7C7A83" textAlign="justify" fontWeight="bold">
            {post.content}
          </Text>
          <XStack space="$2" justifyContent="space-between">
            {post.images?.map((url, index) => (
              <YStack
                key={index}
                width={170}
                height={130}
                borderRadius="$4"
                overflow="hidden"
              >
                <Image
                  source={{ uri: url }}
                  width="100%"
                  height="100%"
                  resizeMode="cover"
                />
              </YStack>
            ))}
          </XStack>

          <Card.Footer>
            <XStack marginVertical="$3" alignItems="center" minWidth="100%">
              <XStack alignItems="center">
                <Image
                  source={require("../../assets/images/heart-icon.png")}
                  width={24}
                  height={24}
                />
                <Text margin="$1" marginLeft="$2">
                  {post.likes}
                </Text>
              </XStack>
              <XStack alignItems="center" marginLeft="$4">
                <Image
                  source={require("../../assets/images/comment-icon.png")}
                  width={18}
                  height={18}
                  marginTop="$1.5"
                />
                <Text margin="$1" marginLeft="$2">
                  {post.comments}
                </Text>
              </XStack>
              <XStack justifyContent="flex-end" flex={1}>
                <Button
                  backgroundColor="#C678F7"
                  borderRadius="$5"
                  paddingHorizontal="$4"
                  paddingVertical="$2"
                  color="#FFFFFF"
                  height="$4"
                  fontWeight="bold"
                >
                  GO?!
                </Button>
              </XStack>
            </XStack>
          </Card.Footer>
        </Card>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
});
