import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  notificationIconWrapper: {
    position: 'absolute',
    top: wp('4%'),
    right: wp('2%'),
    width: wp('14%'),
    height: wp('14%'),
    zIndex: 2,
  },

  notificationIcon: {
    width: '100%',
    height: '100%',
  },

  unreadBadgeWrapper: {
    width: wp('6%'),
    height: wp('6%'),
    backgroundColor: '#f9087a',
    borderRadius: 100,
    position: 'absolute',
    left: 0,
    top: 0,
  },

  unreadBadge: {
    fontSize: wp('5%'),
    lineHeight: wp('6%'),
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },
})
