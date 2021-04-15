import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
		bottom: wp('20%'),
    left: wp('3%'),
    right: wp('3%'),
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },

  primaryButton: {
    backgroundColor: ThemeColors.orange,
    borderRadius: wp('2%'),
    paddingVertical: wp('2%'),
  },

  primaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    fontFamily: ThemeFontFamily.NeuronBlack,
    textTransform: 'uppercase',
    fontSize: wp('7%'),
  },

  descriptionWrapper: {
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: wp('2.5%'),
    alignSelf: 'center',
  },

  robotIcon: {
    width: wp('10%'),
    height: wp('10%'),
    marginBottom: wp('1%'),
  },

  descriptionText: {
    fontFamily: ThemeFontFamily.NeuronBlack,
    fontSize: wp('4.5%'),
    maxWidth: 240,
    marginHorizontal: '4%',
    color: ThemeColors.orange,
  },

  subscribeText: {
		color: ThemeColors.blue,
		textAlign: 'center',
    maxWidth: 260,
	},

	primaryButtonBlue: {
    backgroundColor: ThemeColors.blue,
	},

	secondaryButton: {
		backgroundColor: '#DBFAD9',
	},

	secondaryButtonText: {
		color: ThemeColors.blue,
	},
})
