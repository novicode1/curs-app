import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  quizzesSection: {
    paddingTop: wp('2%'),
    borderRadius: 10,
    width: '94%',
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 80,
	},

  userAvatar: {
    width: wp('24%'),
    alignSelf: 'center',
    height: wp('24%'),
    marginTop: wp('4%'),
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

  table: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: hp('33%'),
  },

  tableDateColumn: {
    width: '18%',
    marginRight: '8%',
  },

  tableCategoryColumn: {
    width: '42%',
    marginRight: '4%',
  },

  tableScoreColumn: {
    width: '18%',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },

  tableRowActive: {
    backgroundColor: ThemeColors.blue,
    color: '#fff',
  },
})
