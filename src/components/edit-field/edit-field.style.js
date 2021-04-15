import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  editInfo: {
    paddingHorizontal: wp('4.5%'),
    marginVertical: wp('4%'),
	},

  inputLabel: {
    borderRadius: wp('2%'),
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingVertical: wp('2%'),
    paddingHorizontal: wp('3%'),
    marginBottom: wp('1%'),
  },

  inputLabelText: {
    fontSize: wp('4.5%'),
    color: '#333',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  inputCustomWrapper: {
    padding: wp('3%'),
    fontSize: wp('4.5%'),
  },

  doneButton: {
    backgroundColor: ThemeColors.blue,
    borderRadius: wp('2%'),
    paddingTop: wp('2.5%'),
    paddingBottom: wp('2.5%'),
    paddingHorizontal: wp('6%'),
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginLeft: '3%',
    marginBottom: wp('2.5%'),
    display: 'flex',
    flexDirection: 'row',
  },

  doneButtonText: {
    fontSize: wp('5%'),
    alignSelf: 'center',
    color: '#fff',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },

  inputDescription: {
    fontSize: wp('3.5%'),
    color: '#666',
    padding: wp('3%'),
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },
})
