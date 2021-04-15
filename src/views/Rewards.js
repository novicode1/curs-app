/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AppNetworkError from '../components/AppNetworkError';
import AppScreenBackground from './ui/AppScreenBackground';
import { MainContext } from '../contexts/MainContext';

import Rewards from '../components/rewards/Rewards';

export default function rewardsView({ navigation, screenProps }) {
  let { updateUserData } = useContext(MainContext);
  navigation.addListener('didFocus', payload => {
    updateUserData();
  });

  return (
    <AppScreenBackground style={{ flex: 1 }}>
      <AppNetworkError gameProcess={screenProps.gameProcess} />
      <Header navigation={navigation} />
      <Rewards navigation={navigation} />
      <Footer navigation={navigation} />
    </AppScreenBackground>
  );
}
