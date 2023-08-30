import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { SIZES } from "../../constants";

interface LatestNewsCardProps {
  title: string;
  author: string;
  date: string;
  subtitle: string;
  imageUrl: string;
  articleId: string;
}

const LatestNewsCard = (props: LatestNewsCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => router.push(`/news-details/${props.articleId}`)}
    >
      <Image
        style={styles.image}
        source={{ uri: props.imageUrl }}
        resizeMode="contain"
      />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.summary}>{props.subtitle}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.extraInfo}>
          by <Text style={styles.editorName}>{props.author}</Text>
        </Text>
        <Text style={styles.extraInfo}>{props.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LatestNewsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 280,
    backgroundColor: "#FAFAFC",
    borderRadius: 25,
  },
  image: {
    // flex: 3,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    width: 280,
    height: 170,
    // backgroundColor: "white",
  },
  title: {
    marginHorizontal: SIZES.xSmall,
    marginTop: SIZES.xSmall,
    fontFamily: "PoppinsMedium",
    fontSize: SIZES.medium,
    // marginBottom: SIZES.xxSmall,
    // flex: 2,
  },
  summary: {
    // flex: 3,
    marginHorizontal: SIZES.xSmall,
    fontFamily: "PoppinsRegular",
    fontSize: SIZES.small,
    // marginBottom: SIZES.xxSmall,
  },
  extraInfo: {
    marginHorizontal: SIZES.xSmall,
    marginBottom: SIZES.xxSmall,
    fontFamily: "PoppinsRegular",
    fontSize: SIZES.small,
  },

  editorName: {
    fontFamily: "PoppinsMedium",
    fontSize: SIZES.small,
  },
});
