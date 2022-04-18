import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { lightBlue } from "./colors";

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={lightBlue} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    padding: 0,
    width: "100%",
    height: "100%",
    zIndex: 9,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    alignItems: "center"
  }
});

export default Loader;