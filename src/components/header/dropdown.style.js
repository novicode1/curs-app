import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  dropdownBackground: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    top: -hp('20%'),
    right: 0,
    height: hp('120%'),
    width: wp('100%'),
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  dropdownWrapper: {
    display: 'flex',
    width: wp('98%'),
    zIndex: 1,
    // position: 'absolute',
    left: wp('1%'),
    top: wp('21%'),
  },

  linksWrapper: {
    backgroundColor: '#fff',
    borderRadius: wp('2.5%'),
    overflow: 'hidden',
    width: '96%',
    marginLeft: '2%',
    paddingVertical: wp('1%'),
  },

  link: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: wp('7%'),
    paddingVertical: wp('3%'),
    alignItems: 'center',
  },

  linkText: {
    fontSize: wp('4.5%'),
    color: ThemeColors.blue,
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  linkIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('3%'),
  },

  linkArrowIcon: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    marginLeft: 'auto',
    marginRight: wp('8%'),
  },

  triangleIcon: {
    width: wp('4%'),
    height: wp('4%'),
    marginBottom: -wp('1%'),
    zIndex: 2,
    marginLeft: wp('9.5%'),
  },

  hideArea: {
    height: hp('70%'),
    zIndex: 1,
  },
});
