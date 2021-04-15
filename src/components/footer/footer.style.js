import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFDA00',
    display: 'flex',
    flex: 1,
  },

  withoutLoginButton: {
    paddingHorizontal: wp('5%'),
  },

  loginWrapper: {
    backgroundColor: '#00B6D8',
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: 100,
  },

  loginButton: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },

  castButton: {
    display: 'flex',
    //TODO: Enable the button back when chromecast issue is fixed
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('2.5%'),
		opacity: 0,
  },

  homeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('2.5%'),
  },

  loginIcon: {
    position: 'absolute',
    top: -wp('9.8%'),
    left: -wp('6.4%'),
    width: wp('26%'),
    height: wp('26%'),
  },

  buttonIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },

  buttonText: {
    textTransform: 'uppercase',
    fontSize: wp('8%'),
    marginHorizontal: wp('3%'),
    color: '#fff',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },
});
