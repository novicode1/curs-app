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
    padding: wp('2%'),
    paddingTop: wp('4%'),
  },

  reward: {
    backgroundColor: 'rgba(255,255,255, 0.6)',
    borderRadius: 10,
    marginBottom: wp('3%'),
    overflow: 'hidden',
  },

  rewardBackground: {
    flex: 1,
  },

  hostNameWrapper: {
    alignSelf: 'center',
    maxWidth: '55%',
    display: 'flex',
    padding: wp('3%'),
    paddingBottom: wp('1%'),
    alignItems: 'center',
    borderBottomWidth: 2,
    marginBottom: wp('3.5%'),
    borderColor: '#5f5f5f',
    minHeight: wp('12%'),
  },

  hostName: {
    textTransform: 'uppercase',
    color: '#5f5f5f',
    fontSize: wp('5.3%'),
    lineHeight: wp('5.3%'),
    textAlign: 'center',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },

  prizeFooter: {
    flexDirection: 'row',
  },

  prizeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: ThemeColors.blue,
    width: '60%',
  },

  prizeIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('1.5%'),
  },

  prizeName: {
    fontFamily: ThemeFontFamily.NeuronDemiBold,
    color: '#fff',
    fontSize: wp('5%'),
  },

  dateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: 'rgba(255,255,255, 0.5)',
    position: 'relative',
    textAlign: 'center',
    alignContent: 'center',
    width: '40%',
    marginLeft: -1,
  },

  dateWrapperTranparentBg: {
    backgroundColor: '#bca783',
  },

  primaryOrangeBg: {
    backgroundColor: '#FFA001',
  },

  redeemText: {
    color: '#fff',
    fontFamily: ThemeFontFamily.NeuronBlack,
    fontSize: wp('4.5%'),
    textAlign: 'center',
    display: 'flex',
    alignSelf: 'center',
    width: '100%',
    lineHeight: wp('8%'),
  },

  dateBrown: {
    fontFamily: ThemeFontFamily.NeuronDemiBold,
    color: '#fff',
  },

  separatorIcon: {
    position: 'absolute',
    height: wp('15%'),
    left: -wp('1.5%'),
    bottom: 0,
    top: -1,
  },

  date: {
    fontFamily: ThemeFontFamily.NeuronBlack,
    color: '#bca783',
    fontSize: wp('4%'),
    textAlign: 'center',
    display: 'flex',
    alignSelf: 'center',
    width: '100%',
  },
});
