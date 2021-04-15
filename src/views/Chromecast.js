import React, { useContext, useEffect } from 'react';
import GoogleCast, { CastButton } from 'react-native-google-cast';

import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
	Alert,
} from 'react-native';
import NavigationService from '../NavigationService';
import AppMenuButton from './ui/AppMenuButton';

import ActionCard from '../components/ActionCard/ActionCard';
import { MainContext } from '../contexts/MainContext';

import playersImage from './images/players.jpeg';
import helpIcon from './images/help.png';
import disconnectIcon from './images/disconnect.png';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AppNetworkError from '../components/AppNetworkError';
import AppScreenBackground from './ui/AppScreenBackground';
import { ThemeFontFamily } from '../theme';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function ChromecastView({ navigation, screenProps }) {

  let { updateUserData } = useContext(MainContext);
	navigation.addListener('didFocus', payload => { updateUserData() });

  const {
    isHost,
    isInitChannel,
    isCastConnected,
    error,
  } = screenProps.appState;
  const props = navigation.state.params;

  const { loading } = screenProps;

  useEffect(() => {
    if (props && props.newGame) {
      gameHandler();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const connectHandler = () => {
		GoogleCast.showCastPicker();
  }

  const disconnectHandler = async () => {
    await GoogleCast.endSession();
    const { gameProcess, setAppState } = screenProps;
    if (gameProcess?.emit) {
      gameProcess.emit.off();
    }
    setAppState(prev => ({
      ...prev,
      isCastConnected: false,
      gameId: null,
      hostId: null,
      isHost: null,
    }));
  };

  const gameHandler = async () => {
    const { getGame } = screenProps;
    await getGame();
  };

  const helpHandler = () => {
    NavigationService.replace('Help');
  };

  const gameBtnText = isHost ? 'New Game' : 'Join Game';

  return (
		<AppScreenBackground style={{ flex: 1 }}>
			<Header navigation={navigation} />
			<AppNetworkError gameProcess={screenProps.gameProcess} />
			<ActionCard
				navigation={navigation}
				image={playersImage}
				title={'Play chromecast game'}
				onPress={connectHandler}
				description={['Play trivia with your friend on ', <Text style={styles.bold}>TV.</Text>]}
			/>

			<View style={styles.buttonsRow}>

				{!isCastConnected && (
					<TouchableOpacity
						style={styles.actionButton}
						onPress={helpHandler}
					>
						<Image
							source={helpIcon}
							style={styles.actionIcon}
							resizeMode="contain"
						/>
						<Text style={styles.actionButtonText}>Help</Text>
					</TouchableOpacity>
				)}


				{isCastConnected && (
					<AppMenuButton
						title={gameBtnText}
						onPress={gameHandler}
						isLoading={loading}
					/>
				)}

				{isCastConnected && (
					<TouchableOpacity
						style={styles.actionButton}
						onPress={disconnectHandler}
					>
						<Image
							source={disconnectIcon}
							style={styles.actionIcon}
							resizeMode="contain"
						/>
						<Text style={styles.actionButtonText}>Disconnect</Text>
					</TouchableOpacity>
				)}
			</View>

			<Footer navigation={navigation} />
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
	bold: {
		fontFamily: ThemeFontFamily.NeuronBlack,
	},

	buttonsRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		maxWidth: wp('90%'),
		alignSelf: 'center',
		paddingTop: wp('8%'),
	},

	actionButton: {
		paddingVertical: wp('5%'),
		paddingHorizontal: wp('4%'),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
		shadowRadius: 10,
		backgroundColor: '#fff',
		borderRadius: wp('5%'),
		minWidth: '40%',
		textAlign: 'center'
	},

	actionIcon: {
		width: wp('7%'),
		height: wp('7%'),
		marginRight: wp('3%'),
	},

	actionButtonText: {
		fontSize: wp('5%'),
		textTransform: 'uppercase',
		color: '#444444',
		fontFamily: ThemeFontFamily.NeuronBlack,
	}
});
