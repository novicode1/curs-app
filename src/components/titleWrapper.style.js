import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  titleWrapper: {
    position: 'absolute',
    top: wp('2%'),
    zIndex: 1,
    paddingVertical: wp('2%'),
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    paddingHorizontal: wp('3%'),
    justifyContent: 'space-between',
    borderRadius: 6,
    alignItems: 'center',
  },

  title: {
    fontSize: wp('7%'),
    color: '#424242',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },
})
