import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	userInfo: {
		paddingHorizontal: wp('4.5%'),
		marginVertical: wp('4%'),
	},

	editButton: {
		position: 'absolute',
		right: wp('2.5%'),
		top: wp('1%'),
		padding: wp('2%'),
	},

	editIcon: {
		width: wp('3.5%'),
		height: wp('3.5%'),
	}
})
