import { FeedDataDto } from "@/shared/dtos/feed-data.dto";
import { feedData } from "@/shared/feedData";
import React, { useState } from "react";
import { FlatList } from "react-native";
import FeedItem from "../FeedItem";
import HeartAnimation from "../HeartAnimation";
import HeartCount from "../HeartCount";

const ANIMATION_TIME = 4000;

export const Feed = () => {
  const [postData, setPostData] = useState<FeedDataDto[]>(feedData);
  const [isHeartVisible, setIsHeartVisible] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const [animationPosition, setAnimationPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleAnimation = (
    post: FeedDataDto,
    position: { x: number; y: number }
  ) => {
    setPostData((prevPostData) =>
      prevPostData.map((item) =>
        item.id === post.id ? { ...item, likes: (item.likes ?? 0) + 1 } : item
      )
    );
    setHeartCount((post.likes ?? 0) + 1);
    setAnimationPosition(position);
    setIsHeartVisible(true);
    setTimeout(() => {
      setIsHeartVisible(false);
    }, ANIMATION_TIME);
  };
  return (
    <>
      {/* Heart animation overlay */}
      {isHeartVisible && animationPosition && (
        <HeartAnimation
          isVisible={isHeartVisible}
          position={animationPosition}
        />
      )}
      {/* Heart count overlay */}
      {isHeartVisible && animationPosition && (
        <HeartCount count={heartCount} position={animationPosition} />
      )}
      <FlatList
        data={postData}
        renderItem={({ item }) => (
          <FeedItem post={item} triggerAnimation={handleAnimation} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
};
