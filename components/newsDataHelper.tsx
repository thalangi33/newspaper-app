import cheerio from "react-native-cheerio";

interface LatestNewsInfo {
  title: string;
  author: string;
  date: string;
  subtitle: string;
  imageUrl: string;
  articleId: string;
}

const fetchLatestNews = async () => {
  let responseInfo: object = {};
  let htmlString: string = "";
  const latestNewsInfoList: LatestNewsInfo[] = [];

  await fetch("https://hongkongfp.com/wp-json/wp/v2/pages/49")
    .then(async (response) => await response.json())
    .then((response) => (responseInfo = response));

  htmlString = responseInfo["content"]["rendered"];

  const $ = cheerio.load(htmlString);

  $(".entry-wrapper").each(function (this: object) {
    if (
      $(this).find(".byline").length !== 0 &&
      $(this).find(".entry-date").length !== 0
    ) {
      const latestNewsInfo: LatestNewsInfo = {
        title: $(this).find(".entry-title").text(),
        subtitle: $(this)
          .find(".newspack-post-subtitle")
          .text()
          .replace(/^\s+/, ""),
        imageUrl: $(this)
          .parent()
          .find(".post-thumbnail")
          .find("img")
          .attr("src"),

        articleId: $(this).parent().attr("data-post-id"),
        author: $(this).find(".author").text(),
        date: $(this).find(".entry-date").text(),
      };

      latestNewsInfoList.push(latestNewsInfo);
    }
  });

  return latestNewsInfoList;
};

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

const fetchTabViewNews = async () => {
  const tabViewNewsMap: tabViewNewsMap = {
    animals: [],
    artsLifestyle: [],
    business: [],
    communityEducation: [],
    environmentHealth: [],
  };

  const tabsLinks: object = {
    animals: "https://hongkongfp.com/category/topics/wildlife-pets/",
    artsLifestyle: "https://hongkongfp.com/category/topics/arts-lifestyle/",
    business: "https://hongkongfp.com/category/topics/business/",
    communityEducation:
      "https://hongkongfp.com/category/topics/community-education/",
    environmentHealth: "https://hongkongfp.com/category/topics/health-eco/",
  };

  for (const key in tabsLinks) {
    let htmlString: string = "";
    const tabViewNewsList: tabViewNews[] = [];

    await fetch(tabsLinks[key])
      .then(async (response) => await response.text())
      .then((response) => (htmlString = response));
    //   htmlString = responseInfo["content"]["rendered"];

    const $ = cheerio.load(htmlString);

    $(".entry-container").each(function (this: object) {
      const tabViewNews: tabViewNews = {
        title: $(this).find(".entry-title").text(),
        imageUrl: $(this)
          .parent()
          .find(".post-thumbnail")
          .find("img")
          .attr("src"),
        articleId: $(this).parent().attr("id").replace("post-", ""),
        author: $(this).find(".author").text(),
        date: $(this).find(".entry-date").text(),
      };
      tabViewNewsList.push(tabViewNews);
    });

    tabViewNewsMap[key] = tabViewNewsList;
  }

  return tabViewNewsMap;
};

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

const fetchNews = async (articleId) => {
  let responseInfo: object = {};
  let htmlString: string = "";
  await fetch(`https://hongkongfp.com/wp-json/wp/v2/posts/${articleId}`)
    .then(async (response) => await response.json())
    .then((response) => (responseInfo = response));

  const newsInfo: newsInfo = {
    title: responseInfo["yoast_head_json"]["title"],
    author: responseInfo["yoast_head_json"]["author"],
    date: new Date(responseInfo["date"]).toDateString(),
    subtitle: responseInfo["meta"]["newspack_post_subtitle"],
    imageUrl: responseInfo["parsely"]["meta"]["image"]["url"],
    article: [],
    moreNews: [],
  };

  htmlString = responseInfo["content"]["rendered"];

  const $ = cheerio.load(htmlString);

  const paragraph: string[] = [];

  $("p").each(function (this: object) {
    if ($(this).text().includes("Support HKFP") === false) {
      paragraph.push($(this).text());
    }
  });

  newsInfo["article"] = paragraph;

  const moreNews: moreNews[] = [];

  $("article").each(function (this: object) {
    const news: moreNews = {
      title: $(this).find(".entry-title").text(),
      imageUrl: $(this).find("img").attr("src"),
      articleId: $(this).attr("data-post-id"),
    };

    moreNews.push(news);
  });

  newsInfo["moreNews"] = moreNews;

  return newsInfo;
};

export { fetchNews, fetchLatestNews, fetchTabViewNews };
