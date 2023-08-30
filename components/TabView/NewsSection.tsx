import React from "react";
import NewsCard from "./NewsCard";
// import { FlatList } from "react-native-gesture-handler";
import { ScrollView } from "react-native";

interface tabViewNews {
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  articleId: string;
}

interface NewsScectionProps {
  scrollEnabled: boolean;
  tabViewNewsList: tabViewNews[];
}

const NewsSection = (props: NewsScectionProps) => {
  return (
    // <View>
    //   {isLoading ? (
    //     <View />
    //   ) : (
    //     <FlatList
    //       nestedScrollEnabled
    //       scrollEnabled={props.scrollEnabled}
    //       data={tabViewNewsList}
    //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //       renderItem={({ item }: { item: tabViewNews }) => (
    //         <NewsCard
    //           title={item.title}
    //           author={item.author}
    //           date={item.date}
    //           imageUrl={item.imageUrl}
    //           link={item.link}
    //         />
    //       )}
    //     />
    //   )}
    // </View>

    <ScrollView nestedScrollEnabled scrollEnabled={props.scrollEnabled}>
      {/* <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard /> */}
      {props.tabViewNewsList?.map((item) => (
        <NewsCard
          title={item.title}
          author={item.author}
          date={item.date}
          imageUrl={item.imageUrl}
          articleId={item.articleId}
          key={item.articleId}
        />
      ))}
    </ScrollView>
  );
};

export default NewsSection;
