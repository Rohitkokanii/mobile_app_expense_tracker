import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import layout from '../../theme/layout';
import {rhp, rwp} from '../../utils/helpers/responsivePixelHelper';
import {LOTTIE} from '../../utils/constant/lottieConstant';

const NodataFoundWithLottie = ({NoDataMsg, icon}) => {
  return (
    <View style={layout.MainStyleLoading}>
      <LottieView
        autoPlay
        source={LOTTIE.NodataLottie}
        style={{height: rhp(130), width: rwp(130)}}
      />
      <Text style={layout.NoDataFoundStyle}>{NoDataMsg}</Text>
    </View>
  );
};

export default NodataFoundWithLottie;

const styles = StyleSheet.create({});
