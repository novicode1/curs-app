import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    alignItems: 'center',
		flexDirection: 'row',
		position: 'relative',
    zIndex: 1,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
		marginBottom: wp('1.5%'),
  },

  userAvatarCollapsed: {
    borderWidth: 5,
    height: wp('16%'),
    width: wp('16%'),
    zIndex: 3,
  },

  userNameWrapper: {
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    left: -wp('10%'),
    padding: 15,
    paddingLeft: 46,
    zIndex: 1,
  },

  userName: {
    fontSize: wp('6%'),
    color: ThemeColors.blue,
    fontFamily: ThemeFontFamily.NeuronBlack,
  },

  userNameCollapsed: {
    fontSize: wp('5%'),
  },

  headerBackButton: {
    marginLeft: -wp('0.5%'),
    alignSelf: 'center',
    marginRight: 4,
    zIndex: 2,
  },

  notificationsCollapsed: {
    width: wp('11%'),
    height: wp('11%'),
  },
})
