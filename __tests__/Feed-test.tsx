import React from "react";
import { render, screen } from "@testing-library/react-native";
import { feedData } from "@/shared/feedData";
import Feed from "@/components/Feed";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";

jest.mock(
  "../components/HeartAnimation",
  () =>
    ({
      isVisible,
      position,
    }: {
      isVisible: boolean;
      position: { x: number; y: number };
    }) =>
      isVisible ? (
        <div
          data-testid="heart-animation"
          style={{ position: "absolute", left: position.x, top: position.y }}
        />
      ) : null
);

jest.mock("../components/HeartCount", () => ({ count }: { count: number }) => (
  <div data-testid="heart-count">{count}</div>
));

describe("Feed Component", () => {
  it("renders a list of posts", () => {
    render(
      <TamaguiProvider config={config}>
        <Feed />
      </TamaguiProvider>
    );

    expect(screen.getAllByTestId("feed-item")).toHaveLength(feedData.length);
  });
});
