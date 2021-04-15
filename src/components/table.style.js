import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  expandTableButton: {
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#CDECE8',
    paddingVertical: wp('2.5%'),
  },

  emptyQuizList: {
    textAlign: 'center',
    width: '100%',
    padding: 10,
    paddingBottom: 0,
  },

  expandTableButtonText: {
    width: '100%',
    textAlign: 'center',
    color: ThemeColors.blue,
    fontFamily: ThemeFontFamily.NeuronBlack,
    fontSize: wp('5%'),
    textTransform: 'uppercase',
  },

  tableColumnIcon: {
    width: wp('5%'),
    height: wp('5%'),
  },

  tableColumnTitle: {
    fontSize: wp('3.5%'),
    marginLeft: wp('1.8%'),
    textTransform: 'uppercase',
    alignSelf: 'center',
    marginTop: wp('0.5%'),
    color: ThemeColors.blue,
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  tableTitle: {
    fontSize: wp('5%'),
    textTransform: 'uppercase',
    fontFamily: ThemeFontFamily.NeuronBlack,
    color: ThemeColors.blue,
    paddingVertical: wp('2.5%'),
    textAlign: 'center',
  },

  quizFinishDate: {
    width: '45%',
    marginRight: '5%',
    color: '#fff',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
    fontSize: wp('4%'),
  },

  quizDuration: {
    width: '50%',
    textAlign: 'right',
    paddingRight: wp('4%'),
    color: '#fff',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
    fontSize: wp('4%'),
  },

  tableWrapper: {
    paddingBottom: wp('10%'),
    position: 'relative',
  },

  quizCategory: {
    width: '100%',
    color: '#fff',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
    fontSize: wp('4%'),
  },

  boldText: {
    color: '#333',
  },

  borderSeparator: {
    borderBottomColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 1,
  },

  currentQuizDetails: {
    display: 'flex',
    width: '100%',
  },

  quizDetailsRow: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('2.5%'),
  },

  quizGpsWarning: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#dbf4fe',
    borderRadius: 10,
  },

  endedQuiz: {
    backgroundColor: '#dbf4fe',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: wp('2.5%'),
    paddingHorizontal: wp('3%'),
  },

  tableColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  tableTextColumn: {
    width: '30%',
  },

  tableText: {
    fontSize: wp('4.5%'),
    color: '#09A4AD',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  tableEverySecondChild: {
    backgroundColor: '#cfedf9',
  },
});
