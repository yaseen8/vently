import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { FeedDataDto } from "@/shared/dtos/feed-data.dto";
import FeedItem from "@/components/FeedItem";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";

const mockPost: FeedDataDto = {
  id: 1,
  avatar: "https://example.com/avatar.jpg",
  username: "testuser",
  createdAt: new Date().toISOString(),
  location: "Test Location",
  content: "This is a test post content.",
  images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  likes: 10,
  comments: 5,
};

// Mock function to simulate the triggerAnimation prop
const mockTriggerAnimation = jest.fn();

describe("FeedItem Component", () => {
  it("renders correctly with post data", () => {
    const { getByText, getByTestId } = render(
      <TamaguiProvider config={config}>
        <FeedItem post={mockPost} triggerAnimation={mockTriggerAnimation} />
      </TamaguiProvider>
    );

    expect(getByText("testuser")).toBeTruthy();
    expect(getByText("Test Location")).toBeTruthy();
    expect(getByText("This is a test post content.")).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
    expect(getByText("5")).toBeTruthy();
  });

  it("triggers animation on long press", async () => {
    const { getByTestId } = render(
      <TamaguiProvider config={config}>
        <FeedItem post={mockPost} triggerAnimation={mockTriggerAnimation} />
      </TamaguiProvider>
    );

    // Simulate a long press event
    await waitFor(() =>
      fireEvent(getByTestId("feed-item"), "onLongPress", {
        nativeEvent: { pageX: 100, pageY: 200 },
      })
    );

    // Verify that the triggerAnimation function is called with the correct arguments
    expect(mockTriggerAnimation).toHaveBeenCalledWith(mockPost, {
      x: 100,
      y: 200,
    });
  });
});
