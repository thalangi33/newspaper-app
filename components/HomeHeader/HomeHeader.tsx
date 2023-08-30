import { View } from "react-native";
import React from "react";
import HeaderTitle from "../HeaderTitle";
import HeaderSettings from "../HeaderSettings";
import { SIZES } from "../../constants";

const HomeHeader = () => {
  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: SIZES.small,
        marginTop: SIZES.small,
      }}
    >
      <HeaderTitle />
      <HeaderSettings />
    </View>
  );
};

export default HomeHeader;
