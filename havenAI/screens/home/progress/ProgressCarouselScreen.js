import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import ProgressScreen from "./ProgressScreen.js";
import RecommendedSection from "../../../components/RecommendedSection.js";
import BatchScreen from "./BatchScreen.js";
import HealthStatsScreen from "./HealthStats.js";

const { width } = Dimensions.get("window");

export default function ProgressCarouselScreen() {
  const scrollRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.carouselItem}>
          <ProgressScreen />
        </View>

        <View style={styles.carouselItem}>
          <HealthStatsScreen />
        </View>
        
        
        <View style={styles.carouselItem}>
          <BatchScreen />
        </View>
      </ScrollView>
      {/* Dot indicators */}
      <View style={styles.dotIndicator}>
        <View style={[styles.dot, activeIndex === 0 && styles.activeDot]} />
        <View style={[styles.dot, activeIndex === 1 && styles.activeDot]} />
        <View style={[styles.dot, activeIndex === 2 && styles.activeDot]} />
      </View>
      <RecommendedSection />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A6D74",
  },
  carousel: {
    flexGrow: 0,
    maxHeight: 420,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#2A6D74",
  },
  contentContainer: {
    flexGrow: 1,
  },
  screen: {
    width: width,
    flex: 1,
  },
  carouselItem: {
    width: width,
    height: "100%",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 4,
  },
  dotIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  activeDot: {
    backgroundColor: "#FFFFFF",
  },
});
