import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  tabsWrapper: {
    padding: 0,
    position: 'relative',
    margin: 0,
    backgroundColor: '#0eb2bc',
		display: 'flex',
		borderBottomColor: '#BAE8F9',
		borderBottomWidth: 8,
  },

  tab: {
    backgroundColor: ThemeColors.blue,
	},

  tabsSection: {
    display: 'flex',
    width: '100%',
    padding: 0,
    backgroundColor: '#BAE8F9',
    borderRadius: 10,
    overflow: 'hidden',
  },

  tabTitle: {
    fontSize: wp('5%'),
    textTransform: 'uppercase',
    fontFamily: ThemeFontFamily.NeuronBlack,
    color: '#fff',
  },

  selectedTab: {
		backgroundColor: '#b9e8f9',
  },

  selectedTabTitle: {
    color: ThemeColors.blue,
	},
});
