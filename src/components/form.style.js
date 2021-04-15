import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  label: {
    display: 'flex',
    width: 'auto',
    paddingHorizontal: wp('3%'),
    flexDirection: 'row',
    position: 'relative',
  },

  labelText: {
    color: '#444',
    width: wp('25%'),
    fontSize: wp('4.25%'),
    paddingVertical: wp('2.5%'),
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  inputWrapper: {
    borderColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 1,
    textAlign: 'left',
    paddingVertical: wp('2.5%'),
    width: '100%',
    display: 'flex',
    alignContent: 'flex-start',
  },

  inputText: {
    color: '#fff',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
    fontSize: wp('4.25%'),
  },
});
