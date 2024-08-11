import Feed from "@/components/Feed";
import { TamaguiProvider, View } from "tamagui";
import config from "../tamagui.config";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import Header from "@/components/Header";

export default function Index() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <TamaguiProvider config={config}>
      <View style={styles.container}>
        <Header />
        <Feed />
      </View>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7E9EE",
  },
});
