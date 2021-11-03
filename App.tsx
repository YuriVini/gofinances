import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Welcome } from "./src/Components/Welcome";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Welcome title="React BareWorkflow com Typescript" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
