import React, { useContext } from 'react';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AppNetworkError from '../components/AppNetworkError';
import AppScreenBackground from './ui/AppScreenBackground';
import { MainContext } from '../contexts/MainContext';

import RewardDetails from '../components/reward-details/RewardDetails';

export default function rewardDetailsView({ navigation, screenProps }) {
	let { updateUserData } = useContext(MainContext)
	navigation.addListener('didFocus', payload => { updateUserData() });

  return (
    <AppScreenBackground style={{ flex: 1 }}>
      <AppNetworkError gameProcess={screenProps.gameProcess} />
      <Header navigation={navigation} />
			<RewardDetails navigation={navigation} />
      <Footer navigation={navigation} />
    </AppScreenBackground>
  );
}
