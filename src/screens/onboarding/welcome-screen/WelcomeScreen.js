import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRef, useState} from 'react';
import {IMAGES} from '../../../utils/constant/imageConstant';
import WelcomeSlider from './components/WelcomeSlider';
import SizedView from '../../../components/common/SizedView';
import layout from '../../../theme/layout';
import {rhp, rwp} from '../../../utils/helpers/responsivePixelHelper';
import DefaultWrap from '../../../components/wrappers/DefaultWrap';
import {useMyContext} from '../../../store/context-store/myContextProvider';
import BlueButton from '../../../components/buttons/BlueButton';
import LogoView from './components/LogoView';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Texts} from '../../../components/common/Texts';
const currentHeight = getStatusBarHeight();
const WelcomeScreen = ({navigation}) => {
  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'DrawerGroup',
          state: {
            routes: [
              {
                name: 'TabGroup',
                state: {
                  routes: [
                    {
                      name: 'HomeScreen',
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    });
  };

  const ListData = [
    {
      id: 0,
      image: IMAGES.WELCOME1,
      title: 'Go Places, Move Things!',
      description: 'From daily rides to heavy loads\n— all in one app.',
    },
    {
      id: 1,
      image: IMAGES.WELCOME2,
      title: 'Big or Small, We Haul It All!',
      description: 'Fast, reliable, and right at\nyour doorstep',
    },
    {
      id: 2,
      image: IMAGES.WELCOME3,
      title: 'Get There Without the Flare',
      description: 'Smart, smooth, and stress-free\nrides every time',
    },
  ];

  const NumberOfPages = ListData.length;
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(1);

  const startCarousel = index => {
    scrollViewRef.current?.scrollTo({
      x: index * (rwp(214) + 10),
      animated: true,
    });
  };

  const handleNext = () => {
    if (currentIndex < ListData.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollViewRef.current?.scrollTo({
        x: newIndex * (rwp(214) + 10),
        animated: true,
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollViewRef.current?.scrollTo({
        x: newIndex * (rwp(214) + 10),
        animated: true,
      });
    }
  };

  return (
    <DefaultWrap>
      <View style={styles.container}>
        <LogoView />
        <SizedView height={5} />
        <WelcomeSlider
          ListData={ListData}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          scrollViewRef={scrollViewRef}
        />

        <SizedView height={8} />

        <View style={layout.center}>
          <PageIndicator
            NumberOfPages={NumberOfPages}
            SelectedIndex={currentIndex}
            startCarousel={startCarousel}
          />
        </View>

        <SizedView height={8} />

        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: rhp(10),
            alignSelf: 'center',
          }}>
          <Texts.pt22 style={{color: '#FCD128', fontWeight: '600'}}>
            {'YourRideYourWay'}
          </Texts.pt22>
          <SizedView height={5} />
          <Texts.pt16
            style={{
              color: '#FFFFFF',
              fontWeight: '500',
              textAlign: 'center',
              // backgroundColor: 'pink',
              width: rwp(260),
            }}>
            {'CabDescription'}
          </Texts.pt16>
        </View>

        <SizedView height={8} />

        <View style={[layout.row, {alignSelf: 'center'}]}>
          {currentIndex == 0 ? null : (
            <View>
              <BlueButton
                onPress={handlePrev}
                TextStyle={[{color: 'black'}, layout.fontWeight.bold]}
                ButtonName={'Back'}
                ButtonStyle={{
                  borderColor: '#F9B917',
                  backgroundColor: '#B7B7B7',
                  borderWidth: 0.4,
                  width: rwp(117),
                }}
              />
            </View>
          )}
          <SizedView width={5} />
          {currentIndex == 4 ? null : (
            <BlueButton
              onPress={handleNext}
              TextStyle={[{color: 'black'}, layout.fontWeight.bold]}
              ButtonName={'Next'}
              ButtonStyle={{
                backgroundColor: '#F9B917',
                width: rwp(117),
              }}
            />
          )}
        </View>

        <SizedView height={12} />

        <BlueButton
          TextStyle={[
            {color: 'black', fontWeight: '700'},
            layout.fontWeight.bold,
          ]}
          ButtonName={'GetStarted'}
          ButtonStyle={{
            backgroundColor: '#F9B917',
            width: rwp(117),
          }}
          onPress={() => goToHome()} // Replace 'NextScreen' with your screen
        />
      </View>
    </DefaultWrap>
  );
};

const PageIndicator = ({NumberOfPages, SelectedIndex = 0, startCarousel}) => {
  const Pages = new Array(NumberOfPages).fill('');
  return (
    <View style={[layout.row, {columnGap: rwp(6)}]}>
      {Pages.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            startCarousel(index);
          }}
          style={[
            styles.circle,
            SelectedIndex == index ? styles.selectedCircle : null,
          ]}></TouchableOpacity>
      ))}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: rwp(33),
    backgroundColor: '#005AA1',
  },
  circle: {
    height: rhp(8),
    width: rhp(8),
    borderRadius: rhp(8 / 2),
    backgroundColor: '#FFFFFF',
  },
  selectedCircle: {
    backgroundColor: '#FCD128',
    height: rhp(8),
    width: rhp(8),
    borderRadius: rhp(8 / 2),
  },
});
