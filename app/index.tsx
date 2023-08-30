import {
  ActivityIndicator,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import LatestNews from "../components/LatestNews/LatestNews";
import NewsCategoryTabView from "../components/TabView/NewsCategoryTabView";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import {
  fetchLatestNews,
  fetchTabViewNews,
} from "../components/newsDataHelper";

interface LatestNewsInfo {
  title: string;
  author: string;
  date: string;
  subtitle: string;
  imageUrl: string;
  articleId: string;
}

interface tabViewNews {
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  articleId: string;
}

interface tabViewNewsMap {
  animals: tabViewNews[];
  artsLifestyle: tabViewNews[];
  business: tabViewNews[];
  communityEducation: tabViewNews[];
  environmentHealth: tabViewNews[];
}

const Home = () => {
  const [latestNewsInfoList, setLatestNewsInfoList] =
    useState<LatestNewsInfo[]>();
  const [tabViewNewsMap, setTabViewNewsList] = useState<tabViewNewsMap>();
  const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchTabViewNews()
  //     .then((tabViewNewsMap) => setTabViewNewsList(tabViewNewsMap))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    Promise.all([fetchLatestNews(), fetchTabViewNews()])
      .then((responses) => {
        setLatestNewsInfoList(responses[0]);
        setTabViewNewsList(responses[1]);
      })
      .finally(() => setLoading(false));
  }, []);

  const [scrollEnabled, setScrollEnabled] = useState(false);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const windowHeight = Dimensions.get("window").height;
    // console.log(event.nativeEvent.contentOffset.y);
    // console.log(windowHeight);
    if (event.nativeEvent.contentOffset.y > windowHeight - 300) {
      setScrollEnabled(true);
    }
    if (event.nativeEvent.contentOffset.y < windowHeight - 300) {
      setScrollEnabled(false);
    }
  };

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
        <View>
          <View style={{ flex: 1 }}>
            <StatusBar translucent={false} backgroundColor="#fff" />
          </View>
          <ScrollView onScroll={handleScroll}>
            <HomeHeader />
            <LatestNews latestNewsInfoList={latestNewsInfoList!} />
            <NewsCategoryTabView
              scrollEnabled={scrollEnabled}
              tabViewNewsMap={tabViewNewsMap!}
            />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

// const styles = StyleSheet.create({})
