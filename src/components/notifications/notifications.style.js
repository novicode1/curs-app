import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  tabsSection: {
    marginTop: wp('2%'),
    borderRadius: 10,
    width: '94%',
    overflow: 'hidden',
    alignSelf: 'center',
  },

  emptyList: {
    padding: 50,
    textAlign: 'center',
  },

  tabContentWrapper: {
    backgroundColor: '#BAE8F9',
    maxHeight: hp('70%'),
  },

  linkButton: {
    backgroundColor: '#8BE3F6',
    borderRadius: wp('2%'),
    paddingVertical: wp('2%'),
    paddingHorizontal: wp('3.4%'),
    alignItems: 'center',
    display: 'flex',
    marginLeft: 'auto',
  },

  linkButtonText: {
    color: ThemeColors.blue,
    fontSize: wp('4%'),
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  rowTextWrapper: {
    maxWidth: '67%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('5%'),
    paddingLeft: wp('4%'),
    paddingRight: wp('1.5%'),
  },

  rowIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('3%'),
  },

  date: {
    fontSize: wp('3.8%'),
    paddingTop: wp('1%'),
    color: '#a3a3a3',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  primaryButton: {
    backgroundColor: ThemeColors.orange,
    color: '#fff',
  },
});
