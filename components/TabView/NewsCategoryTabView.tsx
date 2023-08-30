import { View, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import React, { useState } from "react";
import NewsSection from "./NewsSection";
import { SIZES } from "../../constants";

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

interface NewsCategoryTabViewProps {
  scrollEnabled: boolean;
  tabViewNewsMap: tabViewNewsMap;
}

const NewsCategoryTabView = (props: NewsCategoryTabViewProps) => {
  const layout = useWindowDimensions();
  const [routes] = useState([
    { key: "animals", title: "Animals" },
    { key: "artsLifestyle", title: "Arts & Lifestyle" },
    { key: "business", title: "Business" },
    { key: "communityEducation", title: "Community & Education" },
    { key: "environmentHealth", title: "Environment & Health" },
  ]);

  const [index, setIndex] = useState(0);

  const FirstRoute = () => (
    <NewsSection
      scrollEnabled={props.scrollEnabled}
      tabViewNewsList={props.tabViewNewsMap["animals"]}
    />
  );

  const SecondRoute = () => (
    <NewsSection
      scrollEnabled={props.scrollEnabled}
      tabViewNewsList={props.tabViewNewsMap["artsLifestyle"]}
    />
  );

  const ThirdRoute = () => (
    <NewsSection
      scrollEnabled={props.scrollEnabled}
      tabViewNewsList={props.tabViewNewsMap["business"]}
    />
  );

  const FourthRoute = () => (
    <NewsSection
      scrollEnabled={props.scrollEnabled}
      tabViewNewsList={props.tabViewNewsMap["communityEducation"]}
    />
  );

  const FifthRoute = () => (
    <NewsSection
      scrollEnabled={props.scrollEnabled}
      tabViewNewsList={props.tabViewNewsMap["environmentHealth"]}
    />
  );

  const renderScene = SceneMap({
    animals: FirstRoute,
    artsLifestyle: SecondRoute,
    business: ThirdRoute,
    communityEducation: FourthRoute,
    environmentHealth: FifthRoute,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: "blue",
        height: 3,
        width: 1,
      }}
      activeColor="blue"
      inactiveColor="#83829A"
      labelStyle={{
        fontFamily: "PoppinsBold",
        fontSize: SIZES.medium,
        textTransform: "none",
      }}
      style={{
        backgroundColor: "#ffffff",
        height: 55,
        // paddingHorizontal: 16,
      }}
      scrollEnabled={true}
      tabStyle={{
        // paddingHorizontal: 16,
        width: "auto",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        // height: 60,
      }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <TabView
        style={{
          flex: 1,
          height: layout.height,
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default NewsCategoryTabView;
