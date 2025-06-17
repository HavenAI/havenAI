import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import StreakScreen from './StreakScreen';
import CutbackScreen from './CutbackScreen';
import RecommendedSection from '../../../components/RecommendedSection';
import SessionsScreen from './SessionsScreen';
import {useUser} from '../../../context/UserContext.js'

const { width } = Dimensions.get('window');

export default function ProgressCarouselScreen() {
  const scrollRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const {quitMethod} = useUser();

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
      
      {
        quitMethod === 'Quit gradually' 
          ? <View style={styles.carouselItem}>
        <CutbackScreen />
            </View>: <View style={styles.carouselItem}>
        <StreakScreen />
      </View>
      }
      <View style={styles.carouselItem}>
        <SessionsScreen />
      </View>
      
    </ScrollView>
    {/* Dot indicators */}
    <View style={styles.dotIndicator}>
        <View style={[styles.dot, activeIndex === 0 && styles.activeDot]} />
        <View style={[styles.dot, activeIndex === 1 && styles.activeDot]} />
      </View>
    <RecommendedSection />
    </View>
    
    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A6D74',
    },
    carousel: {
        flexGrow: 0,
        maxHeight: 420, // Adjust this based on how tall the green section should be
      },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#2A6D74',
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
    height: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  dotIndicator: {
    flexDirection: 'row',            // ⬅️ THIS makes dots horizontal
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
});
