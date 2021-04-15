import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
	contentWrapper: {
		padding: wp('5%'),
		position: 'relative',
		flex: 1,
	},

	viewTitle: {
		borderRadius: wp('3%'),
		paddingHorizontal: wp('10%'),
		paddingVertical: wp('1%'),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.15,
		alignSelf: 'center',
		marginBottom: wp('8%'),
	},

	viewTitleText: {
		textTransform: 'uppercase',
		color: '#ff9600',
		fontSize: wp('7%'),
		textAlign: 'center',
		fontFamily: ThemeFontFamily.NeuronBlack,
	},

	userItem: {
		borderRadius: wp('3%'),
		borderTopLeftRadius: wp('12%'),
		borderBottomLeftRadius: wp('12%'),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
		shadowRadius: wp('3%'),
		position: 'relative',
		marginBottom: wp('8%'),
	},

	mainContentWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},

	userAvatarWrapper: {
		position: 'absolute',
		top: -wp('3%'),
		bottom: 0,
		left: 0,
		zIndex: 3,
	},

  userAvatar: {
    borderWidth: wp('1.3%'),
    height: wp('20%'),
		width: wp('20%'),
	},

	selfLabel: {
		backgroundColor: ThemeColors.blue,
		alignSelf: 'center',
		top: -wp('3%'),
		paddingHorizontal: wp('4%'),
		paddingVertical: wp('0.5%'),
		borderRadius: wp('1.3%'),
		overflow: 'hidden'
	},

	selfLabelText: {
		color: '#fff',
		textAlign: 'center',
		fontSize: wp('4%'),
		textTransform: 'uppercase',
		fontFamily: ThemeFontFamily.NeuronBlack,
	},

  userInfoWrapper: {
    padding: wp('2%'),
		paddingLeft: wp('24%'),
		zIndex: 1,
		width: wp('85%'),
		flexDirection: 'row',
		alignItems: 'center',
		display: 'flex',
	},

	cupIcon: {
		width: wp('10%'),
		height: wp('10%'),
		marginRight: wp('6%'),
	},

	userLocationWrapper: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: wp('1%'),
	},

	userNameWrapper: {
		width: '55%',
	},

	userScore: {
		position: 'absolute',
		right: 0,
	},

	userScoreText: {
		color: '#fc9000',
		fontSize: wp('8%'),
		fontFamily: ThemeFontFamily.NeuronBlack,
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

	selfResultTable: {
		height: 'auto',
		minHeight: hp('20%'),
		paddingHorizontal: wp('6%'),
		paddingVertical: wp('5%'),
		maxHeight: hp('55%'),
	},

	selfResultTableExpanded: {
		minHeight: hp('20%'),
		height: hp('55%'),
		maxHeight: hp('22%'),
		paddingHorizontal: wp('6%'),
		paddingVertical: wp('5%'),
	},

  expandTableButton: {
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#fff',
		paddingVertical: wp('2.5%'),
		borderTopColor: '#eee',
		borderTopWidth: 1,
		borderBottomLeftRadius: wp('3%'),
		borderBottomRightRadius: wp('3%'),
	},

	resultRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: wp('1%'),
	},

	resultTitle: {
		paddingTop: wp('1%'),
		fontFamily: ThemeFontFamily.NeuronBlack,
		fontSize: wp('5%'),
		maxWidth: '85%',
		color: '#66cccc',
	},

	resultValue: {
		borderRadius: wp('2%'),
		overflow: 'hidden',
		minHeight: wp('4%'),
	},

	resultValueText: {
		color: '#66cccc',
		minWidth: wp('9%'),
		fontFamily: ThemeFontFamily.NeuronBlack,
		textAlign: 'center',
		fontSize: wp('5%'),
		padding: wp('2%'),
	},

  expandTableButtonText: {
    width: '100%',
    textAlign: 'center',
    color: ThemeColors.blue,
    fontFamily: ThemeFontFamily.NeuronBlack,
    fontSize: wp('5%'),
    textTransform: 'uppercase',
	},



	buttonsRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: wp('84%'),
		alignSelf: 'center',
		paddingTop: wp('8%'),
		position: 'absolute',
		bottom: wp('12%'),
		left: wp('8%'),
	},

	actionButton: {
		paddingVertical: wp('4%'),
		paddingHorizontal: wp('6%'),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
		shadowRadius: 10,
		backgroundColor: '#fc9000',
		borderRadius: wp('5%'),
		minWidth: '40%',
		textAlign: 'center',
	},

	actionIcon: {
		width: wp('7%'),
		height: wp('7%'),
		marginRight: wp('3%'),
	},

	actionButtonText: {
		fontSize: wp('7%'),
		textTransform: 'uppercase',
		color: '#FFF',
		fontFamily: ThemeFontFamily.NeuronBlack,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
	}
})
