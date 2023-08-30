import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SIZES } from "../constants";

const HeaderTitle = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Newspaper App</Text>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#eaeaea",
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: "PoppinsBold",
  },
});
