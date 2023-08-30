import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { SIZES } from "../../constants";

interface tabViewNewsProps {
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  articleId: string;
}

const NewsCard = (props: tabViewNewsProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => router.push(`/news-details/${props.articleId}`)}
    >
      <Image
        style={styles.image}
        source={{ uri: props.imageUrl }}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text numberOfLines={3} style={styles.title}>
          {props.title}
        </Text>
        <View style={styles.extraInfo}>
          <Text style={styles.author}>by {props.author}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
    // backgroundColor: "blue",
    marginHorizontal: 8,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderRadius: 25,
    padding: 10,
  },
  image: {
    borderRadius: 25,
    width: 80,
    height: 80,
  },
  title: {
    // flex: 1,
    fontFamily: "PoppinsMedium",
    fontSize: SIZES.small,
  },
  info: {
    flex: 1,
    // gap: 10,
    // justifyContent: "center",
    justifyContent: "space-between",
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  author: {
    fontSize: SIZES.xSmall,
  },
  date: {
    fontSize: SIZES.xSmall,
  },
});
