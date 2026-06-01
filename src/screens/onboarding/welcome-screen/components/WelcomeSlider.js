import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  ImageBackground,
  Text,
} from 'react-native';
import {rhp, rwp} from '../../../../utils/helpers/responsivePixelHelper';
import {useEffect, useRef} from 'react';

const WelcomeSlider = ({ListData, setCurrentIndex, scrollViewRef}) => {
  const scrollX = useRef(new Animated.Value(1)).current;
  const itemWidth = rwp(214);
  const gap = 10;
  const offset = itemWidth + gap;

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({x: offset * 1, animated: false});
      setCurrentIndex(1);
    }, 100);
  }, []);

  return (
    <View style={{height: rhp(432)}}>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        pagingEnabled
        snapToInterval={offset}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
            listener: e => {
              const index = Math.round(e.nativeEvent.contentOffset.x / offset);
              setCurrentIndex(index);
            },
          },
        )}
        contentContainerStyle={{
          paddingHorizontal: rwp(80), // <-- ensures left & right images are partially visible
          alignItems: 'center',
        }}>
        {ListData?.map((item, i) => {
          const inputRange = [(i - 1) * offset, i * offset, (i + 1) * offset];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={{
                width: itemWidth,
                marginHorizontal: gap / 2,
                transform: [{scale}],
                opacity,
              }}>
              <ImageBackground
                source={item.image}
                style={{
                  height: rhp(420),
                  borderRadius: 20,
                  overflow: 'hidden',
                  justifyContent: 'flex-end',
                  resizeMode: 'contain',
                  padding: rwp(4),
                }}></ImageBackground>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WelcomeSlider;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: rwp(9),
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },
  logo: {
    height: rhp(84),
    width: rwp(132),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  image: {
    height: rhp(420),
    width: '100%',
    resizeMode: 'center',
  },
});
