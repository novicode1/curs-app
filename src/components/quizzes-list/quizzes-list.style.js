import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  tournamentsSection: {
    paddingTop: wp('2%'),
    paddingBottom: wp('4%'),
    borderRadius: 10,
    width: '94%',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 80,
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
    alignItems: 'center',
  },

  emptyList: {
    backgroundColor: 'white',
    padding: 50,
    textAlign: 'center',
    borderRadius: 5,
  },

  emptyListText: {
    marginBottom: 20,
  },

  title: {
    fontSize: wp('6%'),
    marginBottom: 12,
    marginTop: 6,
    color: '#424242',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },

  dropdownWrapper: {
    display: 'flex',
    width: '100%',
    padding: 0,
    marginBottom: wp('7%'),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },

  filtersList: {
    backgroundColor: '#b9e8f9',
    display: 'flex',
    width: '100%',
  },

  filterText: {
    color: '#333',
  },

  filterButton: {
    width: '100%',
    textAlign: 'left',
    paddingHorizontal: wp('6%'),
    paddingVertical: wp('3.5%'),
  },

  filterButtonText: {
    color: '#333',
    fontSize: wp('5%'),
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  filterButtonActive: {
    backgroundColor: '#D3F4F8',
  },

  cardsList: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  cardWrapper: {
    minWidth: wp('40%'),
    marginBottom: wp('3%'),
  },

  expandButton: {
    backgroundColor: '#A5E7F3',
    borderRadius: wp('2%'),
    paddingVertical: wp('2.5%'),
    paddingHorizontal: wp('3%'),
    marginBottom: 4,
    alignItems: 'center',
    //TODO: Implement the sorting later
    //display: 'flex',
    display: 'none',
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: wp('1.5%'),
  },

  expandButtonText: {
    fontSize: wp('4.4%'),
    color: '#444444',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },

  expandButtonIcon: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    marginLeft: wp('1.5%'),
    marginBottom: wp('1%'),
    transform: [{ rotate: '60 deg' }],
  },

  expandButtonIconOpened: {
    transform: [{ rotate: '0 deg' }],
  },

  filterDropdownButton: {
    borderRadius: wp('2%'),
    marginBottom: 4,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },

  filterDropdownButtonIcon: {
    width: wp('9%'),
    height: wp('9%'),
  },
});
