import { Text, Image, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { SIZES } from "../../constants";

interface MoreNewsProps {
  title: string;
  imageUrl: string;
  articleId: string;
}

const MoreNewsCard = (props: MoreNewsProps) => {
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
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default MoreNewsCard;

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    // flex: 1,
    width: 150,
    height: 120,
    borderRadius: 10,
  },
  title: {
    flex: 1,
    marginTop: SIZES.small,
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    width: 150,

    // textAlign: "center",
  },
});
