import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    paddingTop: wp('3%'),
    paddingBottom: wp('12%'),
    marginRight: wp('2%'),
    marginLeft: 6,
    position: 'relative',
    overflow: 'hidden',
  },

  cardRow: {
    width: '100%',
    paddingHorizontal: wp('3.5%'),
    paddingVertical: wp('1%'),
    display: 'flex',
    flexDirection: 'row',
  },

  rowIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: 6,
  },

  rowTextWrapper: {
    width: '85%',
  },

  itemName: {
    fontSize: wp('4.7%'),
    lineHeight: wp('5%'),
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },
  itemDistance: {
    fontSize: wp('4%'),
  },
  itemTotalPlayers: {
    fontSize: wp('4%'),
  },
  itemOnlinePlayers: {
    fontSize: wp('4%'),
    paddingTop: 4,
    color: '#FE9500',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  playButton: {
    backgroundColor: '#FE9500',
    color: '#fff',
    padding: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },

  playButtonText: {
    fontSize: wp('6%'),
    textTransform: 'uppercase',
    color: '#fff',
    alignSelf: 'center',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },

  itemSubtitle: {
		fontSize: wp('4.2%'),
		marginTop: -wp('0.5%'),
		marginBottom: wp('0.5%'),
  },
});
