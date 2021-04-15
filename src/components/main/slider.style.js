import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import quizCard from '../quizCard.style';

export default StyleSheet.create({
  sliderSection: {
    paddingTop: wp('2%'),
    paddingBottom: wp('4%'),
    borderRadius: 10,
    width: '94%',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 20,
	},

  tournamentsSection: {
    marginBottom: 100,
  },

  titleWrapper: {
    position: 'relative',
    paddingTop: 6,
    width: '98%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    marginBottom: 6,
    borderRadius: 6,
  },

  title: {
    fontSize: wp('5.3%'),
    marginBottom: 12,
    marginTop: 6,
    color: ThemeColors.blue,
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  expandButton: {
    backgroundColor: ThemeColors.blue,
    borderRadius: wp('2%'),
    paddingTop: wp('2.5%'),
    paddingBottom: 0,
		paddingHorizontal: wp('4%'),
    marginBottom: 4,
    alignItems: 'center',
  },

  expandButtonText: {
    fontSize: wp('4.5%'),
    alignSelf: 'center',
    color: '#fff',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  slidesWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },

	...quizCard,
});
