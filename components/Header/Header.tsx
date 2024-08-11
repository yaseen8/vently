import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Header = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>San Francisco Feed</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: "#F7E9EE",
    paddingVertical: 10,
  },
  headerText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
  },
});
