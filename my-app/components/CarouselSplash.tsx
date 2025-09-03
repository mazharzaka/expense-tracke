// import { renderItem } from "@/utils/render-item";
import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import CarouselContent from "./CarouselContent";

const data: {
  id: number;
  image: any;
  heading: string;
  description: string;
}[] = [
  {
    id: 1,
    image: require("@/assets/images/splash/taximoney.png"),
    heading: "Note Down Expenses",
    description: "Daily note your expenses to help manage money",
  },
  {
    id: 2,
    image: require("@/assets/images/splash/taxi-man.png"),
    heading: "Simple Money Management",
    description: "Get your notifications or alertwhen you do the over expenses",
  },
  {
    id: 3,
    image: require("@/assets/images/splash/leadership.png"),
    heading: "Easy to Track and Analize",
    description: "Tracking your expense help make sure you don't overspend",
  },
];
const { height: windowHeight } = Dimensions.get("window");
function CarouselSplash() {
  const scrollOffsetValue = useSharedValue<number>(0);
  const carouselRef = React.useRef<any>(null);
  const progress = useSharedValue<number>(0);
  const handlePaginationPress = (index: number) => {
    carouselRef.current?.scrollTo({ index, animated: true });
  };
  return (
    <View id="carousel-component">
      <Carousel
        testID={"xxx"}
        loop={true}
        width={430}
        // height={258}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={2000}
        autoPlay={true}
        data={data}
        defaultScrollOffsetValue={scrollOffsetValue}
        // width={Dimensions.get("window").width}
        height={windowHeight * 0.6}
        onProgressChange={progress}
        onSnapToItem={(index: number) => console.log("current index:", index)}
        renderItem={({ item }) => (
          <CarouselContent
            id={item.id}
            img={item.image}
            heading={item.heading}
            description={item.description}
          />
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={styles.paginationDot}
        activeDotStyle={styles.activePaginationDot}
        containerStyle={{ gap: 5, marginBottom: 10 }}
        // onPress={onPressPagination}
      />
    </View>
  );
}

export default CarouselSplash;
const styles = StyleSheet.create({
  paginationDot: {
    width: 17,
    height: 5,
    borderRadius: 4,
    backgroundColor: "#3E4C59",
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: "#0E33F3",
    // transform: [{ scaleY: 1.5 }],
  },
});
