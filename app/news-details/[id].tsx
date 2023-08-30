import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import MoreNewsSection from "./MoreNewsSection";
import { Stack, useLocalSearchParams } from "expo-router";
import { fetchNews } from "../../components/newsDataHelper";
import { SIZES } from "../../constants";

interface newsInfo {
  title: string;
  author: string;
  date: string;
  subtitle: string;
  imageUrl: string;
  article: string[];
  moreNews: moreNews[];
}
interface moreNews {
  title: string;
  imageUrl: string;
  articleId: string;
}

const NewsDetailsPage = () => {
  const params = useLocalSearchParams();

  const [isLoading, setLoading] = useState(true);
  const [newsInfo, setNewsInfo] = useState<newsInfo>();

  useEffect(() => {
    fetchNews(params.id)
      .then((news) => setNewsInfo(news))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {isLoading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center" }}
          size="large"
        />
      ) : (
        <ScrollView>
          <ImageBackground
            style={styles.image}
            source={{ uri: newsInfo!.imageUrl }}
          >
            <LinearGradient
              // Background Linear Gradient
              colors={[
                "transparent",
                "rgba(0,0,0,0.3)",
                "rgba(0,0,0,0.3)",
                "rgba(0,0,0,0.6)",
                "rgba(0,0,0,0.8)",
              ]}
            >
              <Text style={styles.title}>{newsInfo!.title}</Text>
            </LinearGradient>
          </ImageBackground>
          <View>
            <View style={styles.info}>
              <Text style={styles.infoText}>by {newsInfo!.author}</Text>
              <Text style={styles.infoText}>{newsInfo!.date}</Text>
            </View>
            <Text style={styles.subTitle}>{newsInfo!.subtitle}</Text>
            <Text style={styles.passage}>{newsInfo!.subtitle}</Text>
            {newsInfo!.article.map((item, key) => {
              if (item.replace(/\s/g, "").length) {
                return (
                  <Text key={key} style={styles.passage}>
                    {item}
                  </Text>
                );
              }
            })}
          </View>
          <MoreNewsSection moreNews={newsInfo!.moreNews} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default NewsDetailsPage;

const styles = StyleSheet.create({
  image: {
    height: 500,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  title: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
    fontSize: SIZES.large,
    marginHorizontal: SIZES.small,
    marginBottom: SIZES.xxSmall,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: SIZES.small,
    marginTop: SIZES.small,
  },
  infoText: {
    fontFamily: "PoppinsMedium",
    fontSize: SIZES.small,
  },
  subTitle: {
    fontFamily: "PoppinsBold",
    fontSize: SIZES.medium,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.small,
  },
  passage: {
    fontFamily: "PoppinsMedium",
    marginHorizontal: SIZES.small,
    marginTop: SIZES.small,
    fontSize: SIZES.medium,
  },
});
