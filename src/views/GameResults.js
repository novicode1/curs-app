import React, { useContext } from 'react';

import AppNetworkError from '../components/AppNetworkError';
import { MainContext } from '../contexts/MainContext';

import GameResults from '../components/game-results/GameResults';
import AppScreenBackground from './ui/AppScreenBackground';

export default function GameResultsView({ navigation, screenProps }) {
  let { updateUserData } = useContext(MainContext);
	navigation.addListener('didFocus', payload => { updateUserData() });

  return (
    <AppScreenBackground style={{ flex: 1 }}>
			<AppNetworkError gameProcess={screenProps.gameProcess} />
			<GameResults navigation={navigation} />
		</AppScreenBackground>
  );
}
