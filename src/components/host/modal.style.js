import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  modalBackground: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    top: -hp('20%'),
    right: 0,
    height: hp('140%'),
    width: wp('100%'),
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalContent: {
    display: 'flex',
		maxHeight: hp('70%'),
		// paddingTop: hp('10%'),
		overflow: 'hidden',
		borderRadius: wp('4.5%'),
    width: wp('96%'),
    zIndex: 1,
		backgroundColor: '#fff',
    left: wp('2%'),
    top: hp('15%'),
  },
})
