import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	contentWrapper: {
		padding: wp('4%'),
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'relative',
		display: 'flex',
		flex: 1,
		textAlign: 'center'
	},

	logo: {
		maxWidth: wp('70%'),
		width: '100%',
		height: wp('30%'),
		marginBottom: wp('3%'),
	},

	title: {
    color: '#fff',
		fontFamily: ThemeFontFamily.NeuronDemiBold,
		fontSize: wp('6%'),
		marginBottom: wp('6%'),
	},

	userItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: wp('4%'),
	},

  userAvatar: {
    alignSelf: 'center',
    borderWidth: wp('1%'),
    height: wp('16%'),
    width: wp('16%'),
    zIndex: 3,
	},

  userNameWrapper: {
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    marginLeft: -wp('10%'),
    padding: wp('2%'),
		paddingLeft: wp('12%'),
		zIndex: 1,
		width: wp('45%'),
	},

	userLocationWrapper: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: wp('1%'),
	},

	countryFlag: {
		width: wp('4.5%'),
		height: wp('3.5%'),
		marginRight: wp('1%'),
	},

	userLocationText: {
		color: '#111',
		fontSize: wp('3.5%'),
		fontFamily: ThemeFontFamily.NeuronDemiBold,
	},

  userName: {
    color: ThemeColors.blue,
		fontFamily: ThemeFontFamily.NeuronBlack,
		fontSize: wp('4.5%'),
	},

	bottomContainerWrapper: {
		width: wp('94%'),
		height: wp('40%'),
		position: 'absolute',
		display: 'flex',
		backgroundColor: '#fff',
		bottom: 0,
		right: 0,
		left: wp('3%'),
		borderRadius: wp('6%'),
		overflow: 'hidden',
	},

	quoteImage: {
		width: '100%',
		height: '100%',
	},

	timerWrapper: {
		paddingHorizontal: wp('14%'),
		paddingVertical: wp('6%'),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center',
		display: 'flex',
		width: '100%',
		height: '100%',
	},

	timeDescription: {
    color: ThemeColors.blue,
		fontFamily: ThemeFontFamily.NeuronDemiBold,
		fontSize: wp('5%'),
	},

	time: {
    color: ThemeColors.blue,
		fontFamily: ThemeFontFamily.NeuronBlack,
		fontSize: wp('25%'),
	}
})
