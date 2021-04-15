import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  pageWrapper: {
    marginTop: wp('6%'),
    width: '94%',
    alignSelf: 'center',
  },

  subtitleWrapper: {
    position: 'relative',
    paddingTop: 6,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingRight: wp('1.5%'),
    paddingLeft: wp('3%'),
    justifyContent: 'space-between',
    borderRadius: 6,
    alignItems: 'center',
  },

  subtitle: {
    fontSize: wp('6%'),
    width: '80%',
    marginBottom: 12,
    marginTop: 6,
    color: '#424242',
    fontFamily: ThemeFontFamily.NeuronBlack,
	},

	locationIcon: {
		width: wp('4%'),
		height: wp('4%'),
		marginRight: wp('2%'),
	},

	card: {
		alignItems: 'center',
		display: 'flex',
		backgroundColor: '#fff',
		overflow: 'hidden',
		borderRadius: 10,
		marginTop: wp('1%'),
		paddingHorizontal: wp('5%'),
		paddingVertical: wp('8%'),
	},

	textPink: {
		color: '#f9087a',
	},

	textOrange: {
		color: ThemeColors.orange,
	},

	cardTitle: {
    fontSize: wp('5%'),
    lineHeight: wp('6.5%'),
    // width: '85%',
    color: '#777777',
		fontFamily: ThemeFontFamily.NeuronBlack,
		textAlign: 'center',
	},

	qrCodeModal: {
		maxWidth: wp('90%'),
		marginTop: hp('10%'),
		display: 'flex',
		alignItems: 'center',
		alignContent: 'center',
		paddingVertical: wp('10%'),
    backgroundColor: 'white',
		borderRadius: 12,
		shadowColor: "#000",
		alignSelf: 'center',
    shadowOffset: {
      width: 12,
      height: 12
    },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 150
	},

	doneButton: {
		backgroundColor: ThemeColors.orange,
		paddingVertical: wp('3%'),
		paddingHorizontal: wp('7%'),
		borderRadius: wp('3%'),
		marginTop: wp('5%'),
	},

	doneButtonText: {
		color: '#fff',
		fontSize: wp('5%'),
		fontFamily: ThemeFontFamily.NeuronBlack,
	},

	cardBackground: {
		flex: 1,
	},

	giftIcon: {
		width: wp('12%'),
		height: wp('12%'),
    marginBottom: wp('4%'),
	},

	ctaSection: {
		alignItems: 'center',
		display: 'flex',
		backgroundColor: 'rgba(255,255,255, 0.5)',
		borderRadius: 10,
		marginTop: wp('2%'),
		paddingHorizontal: wp('5%'),
		paddingVertical: wp('5%'),
	},

	ctaText: {
		color: ThemeColors.blue,
    fontFamily: ThemeFontFamily.NeuronBlack,
		fontSize: wp('4.5%'),
		lineHeight: wp('5%'),
		textAlign: 'center',
		marginBottom: wp('5%'),
		marginTop: wp('1%')
	},

	claimUrlImg: {
		marginBottom: wp('6%'),
		height: wp('15%'),
	},

	claimUrlText: {
		color: ThemeColors.orange,
    fontFamily: ThemeFontFamily.NeuronBlack,
		fontSize: wp('3.5%'),
		lineHeight: wp('5%'),
		textAlign: 'center',
		marginBottom: wp('4%'),
	},

	ctaButton: {
    backgroundColor: '#FE9500',
    color: '#fff',
    paddingHorizontal: wp('12%'),
    paddingVertical: wp('3.5%'),
    bottom: 0,
    left: 0,
		borderRadius: 100,
	},

  ctaButtonText: {
    fontSize: wp('4.5%'),
    color: '#fff',
		alignSelf: 'center',
		textTransform: 'uppercase',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },
})
