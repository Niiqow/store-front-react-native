import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Dimensions, Text, StyleSheet, Image } from 'react-native';

const Carousel = ({ images }) => {
  const scrollViewRef = useRef(null);
  const windowWidth = Dimensions.get('window').width;
  let currentIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        currentIndex = (currentIndex + 1) % images.length;
        const offset = currentIndex * windowWidth;
        scrollViewRef.current.scrollTo({ x: offset, y: 0, animated: true });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    // Lógica adicional según el slide actual
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Agregamos scrollEventThrottle aquí para controlar la frecuencia de los eventos de desplazamiento
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
      >
        {images.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: Dimensions.get('window').width,
    height: 400,
    position: 'absolute',
    top: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  slide: {
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Carousel;
