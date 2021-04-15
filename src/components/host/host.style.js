import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  quizesSection: {
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
    paddingLeft: wp('3%'),
    justifyContent: 'space-between',
    borderRadius: 6,
    alignItems: 'center',
  },

  titleWrapperMarginBottom: {
    marginBottom: wp('2.5%'),
  },

  title: {
    fontSize: wp('6%'),
    width: '80%',
    marginBottom: 12,
    marginTop: 6,
    color: '#424242',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },

  tableTitleWrapper: {
    flex: 1,
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('3%'),
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
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
    paddingHorizontal: wp('4%'),
    paddingRight: wp('3%'),
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

  tableDateColumn: {
    width: '18%',
    marginRight: '8%',
  },

  tableCategoryColumn: {
    width: '42%',
    marginRight: '4%',
  },

  tableWinnerColumn: {
    width: '28%',
  },

  table: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: hp('33%'),
  },

  noUsersText: {
    padding: 10,
  },

  tableRankingColumn: {
    width: '10%',
    marginRight: '5%',
    marginLeft: '5%',
  },

  tableUserNameColumn: {
    width: '40%',
    marginRight: '5%',
  },

  tableScoreColumn: {
    width: '30%',
    textAlign: 'right',
    alignItems: 'flex-end',
  },

  primaryRow: {
    backgroundColor: ThemeColors.blue,
    color: '#fff',
  },

  distanceMetricSystem: {
    fontSize: wp('4%'),
  },
});
