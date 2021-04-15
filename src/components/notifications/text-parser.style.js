
import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	rowText: {
		fontSize: wp('4.2%'),
		lineHeight: wp('5%'),
		color: '#878787',
		display: 'flex',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
	},

	boldText: {
		color: '#111',
	},

	winnerText: {
		color: '#5c5b5b'
	},
})
