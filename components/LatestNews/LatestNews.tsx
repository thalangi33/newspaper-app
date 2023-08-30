import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import LatestNewsCard from "./LatestNewsCard";
import { SIZES } from "../../constants";

interface LatestNewsInfo {
  title: string;
  author: string;
  date: string;
  subtitle: string;
  imageUrl: string;
  articleId: string;
}

interface LatestNewsProps {
  latestNewsInfoList: LatestNewsInfo[];
}

const LatestNews = (props: LatestNewsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Latest News</Text>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: SIZES.small,
          // paddingBottom: SIZES.small,
        }}
        horizontal={true}
        style={styles.cardSection}
        data={props.latestNewsInfoList}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderItem={({ item }: { item: LatestNewsInfo }) => (
          <LatestNewsCard
            title={item.title}
            author={item.author}
            date={item.date}
            subtitle={item.subtitle}
            imageUrl={item.imageUrl}
            articleId={item.articleId}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ width: SIZES.small }} />}
      />
    </View>
  );
};

export default LatestNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "orange",
  },
  header: {
    flex: 1,
    // backgroundColor: "blue",
    fontFamily: "PoppinsBold",
    fontSize: SIZES.large,
    marginLeft: SIZES.small,
  },
  cardSection: {
    flex: 1,
    // backgroundColor: "red",
  },
});
