import { Text, StyleSheet, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import MoreNewsCard from "./MoreNewsCard";
import { SIZES } from "../../constants";

interface MoreNewsSectionProps {
  moreNews: moreNews[];
}

interface moreNews {
  title: string;
  imageUrl: string;
  articleId: string;
}

const MoreNewsSection = (props: MoreNewsSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>More news</Text>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: SIZES.small,
        }}
        horizontal={true}
        data={props.moreNews}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderItem={({ item }: { item: moreNews }) => (
          <MoreNewsCard
            title={item.title}
            imageUrl={item.imageUrl}
            articleId={item.articleId}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </View>
  );
};

export default MoreNewsSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.small,
    // marginHorizontal: SIZES.small,
  },
  sectionTitle: {
    marginHorizontal: SIZES.small,
    marginTop: SIZES.large,
    marginBottom: SIZES.small,
    fontFamily: "PoppinsBold",
    fontSize: SIZES.medium,
  },
});
