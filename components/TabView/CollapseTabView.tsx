import React from "react";
import { View, StyleSheet, ListRenderItem, StatusBar } from "react-native";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";
import HomeHeader from "../HomeHeader/HomeHeader";
import LatestNews from "../LatestNews/LatestNews";

const HEADER_HEIGHT = 250;

const DATA = [0, 1, 2, 3, 4];
const identity = (v: unknown): string => v + "";

const Header = () => {
  return (
    <View>
      {/* <View style={styles.header} /> */}
      <StatusBar translucent={false} backgroundColor="#fff" />
      <HomeHeader />
      <LatestNews />
    </View>
  );
  //   return <View style={styles.header} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderTabBar = (props: any) => (
  <MaterialTabBar
    {...props}
    labelStyle={{
      fontFamily: "PoppinsBold",
    }}
  />
);

const CollapseTabView = () => {
  const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    );
  }, []);

  return (
    <Tabs.Container
      renderHeader={Header}
      renderTabBar={renderTabBar}
      //   headerHeight={HEADER_HEIGHT} // optional
    >
      <Tabs.Tab name="Technology">
        <Tabs.FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={identity}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Sports">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: "100%",
  },
  boxA: {
    backgroundColor: "blue",
  },
  boxB: {
    backgroundColor: "#D8D8D8",
  },
  header: {
    height: HEADER_HEIGHT,
    width: "100%",
    backgroundColor: "#2196f3",
  },
});

export default CollapseTabView;
