import React, { useContext } from 'react';

import AppNetworkError from '../components/AppNetworkError';

import GameLobby from '../components/game-lobby/GameLobby';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet } from 'react-native';
import { MainContext } from '../contexts/MainContext';
// import Footer from '../components/footer/Footer';

export default function GameLobbyView({ navigation, screenProps }) {
  let { updateUserData } = useContext(MainContext);
	navigation.addListener('didFocus', payload => { updateUserData() });

  return (
		<ImageBackground
      source={require('../../assets/img/bg.jpg')}
      style={styles.backgroundImage}
		>
			<SafeAreaView style={styles.safeAreaView}>
				<AppNetworkError gameProcess={screenProps.gameProcess} />
				<GameLobby navigation={navigation} />
			</SafeAreaView>
			{/* <Footer navigation={navigation}/> */}
		</ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});
