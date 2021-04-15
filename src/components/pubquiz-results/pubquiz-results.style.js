import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  tournamentsSection: {
    paddingTop: wp('2%'),
    borderRadius: 10,
    width: '94%',
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 80,
  },

  titleWrapper: {
    position: 'relative',
    paddingTop: 6,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingRight: wp('1.5%'),
    paddingLeft: wp('11%'),
    justifyContent: 'space-between',
    borderRadius: 6,
    alignItems: 'center',
    overflow: 'hidden',
  },

  titleWrapperMarginBottom: {
    marginBottom: wp('2.5%'),
  },

  date: {
    backgroundColor: '#74D2DD',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    paddingTop: wp('2.5%'),
    paddingHorizontal: wp('1.8%'),
	},

  dateText: {
    fontSize: wp('4.5%'),
    textAlign: 'center',
    width: '100%',
    color: '#fff',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  dateMonth: {
    fontSize: wp('3.5%'),
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
    color: '#fff',
  },

  title: {
    fontSize: wp('6%'),
    width: '80%',
    marginBottom: 12,
    paddingRight: wp('5%'),
    marginTop: 6,
    color: '#424242',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },

  tabsSection: {
    display: 'flex',
    width: '100%',
    padding: 0,
    backgroundColor: '#BAE8F9',
    borderRadius: 10,
    overflow: 'hidden',
  },

  selectedTabWrapper: {
    backgroundColor: '#BAE8F9',
  },

  quizWrapper: {
    minWidth: wp('40%'),
    marginBottom: wp('3%'),
  },

  locationButton: {
    backgroundColor: '#A5E7F3',
    borderRadius: wp('2%'),
    paddingVertical: wp('1.2%'),
    paddingHorizontal: wp('5%'),
    marginBottom: 4,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: wp('1.5%'),
  },

  locationButtonText: {
    fontSize: wp('4.4%'),
    fontFamily: ThemeFontFamily.NeuronDemiBold,
    color: ThemeColors.blue,
  },

  locationButtonIcon: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    marginRight: wp('1.5%'),
    marginBottom: wp('1%'),
  },

  tableTextColumn: {
    width: '30%',
  },

  tableText: {
    fontSize: wp('4.5%'),
    color: '#09A4AD',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  tableTextPrize: {
    color: '#A8A7A7',
    fontSize: wp('3.5%'),
    width: '100%',
    textAlign: 'right',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  tableWrapper: {
    position: 'relative',
  },

  table: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: hp('50%'),
  },

  prizeItem: {
    backgroundColor: '#dbf4fe',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('2%'),
    paddingHorizontal: wp('3%'),
    minHeight: wp('13%'),
  },

  tournamentDescription: {
    width: '100%',
    color: '#fff',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
    fontSize: wp('4%'),
  },

  tableRankingColumn: {
    width: '10%',
    marginRight: '5%',
    marginLeft: '5%',
    position: 'relative',
    alignItems: 'center',
    alignContent: 'center',
  },

  topPrizeImage: {
    width: wp('7%'),
    height: wp('7%'),
    position: 'absolute',
    alignSelf: 'center',
    top: -wp('0.6%'),
    zIndex: -1,
  },

  tableTextWhite: {
    color: '#fff',
    top: -wp('1%'),
  },

  tableUserNameColumn: {
    width: '40%',
    marginRight: '5%',
  },

  tablePrizeColumn: {
    width: '30%',
    textAlign: 'right',
    alignItems: 'flex-end',
  },

  tableRowActive: {
    backgroundColor: ThemeColors.blue,
    color: '#fff',
  },
})
