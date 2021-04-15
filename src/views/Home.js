import React, { useEffect, useContext } from 'react';
import GoogleCast, { CastButton } from 'react-native-google-cast';

import { Image } from 'react-native-elements';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { MainContext } from '../contexts/MainContext';

import AppMenuButton from './ui/AppMenuButton';
import AppScreenBackground from './ui/AppScreenBackground';
import NavigationService from '../NavigationService';
import AppNetworkError from '../components/AppNetworkError';
import AppPopup from '../components/AppPopup';
import LoggerButton from '../modules/logger/LoggerButton';

export default function Home({ navigation, screenProps }) {
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
  };

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
    <AppScreenBackground style={styles.body}>
      <AppNetworkError gameProcess={screenProps.gameProcess} />
      <View style={styles.sectionContainer}>
        {/* {
          <LoggerButton
            data={{
              ...screenProps.appState,
              isInitChannel,
              instanceGame: 'hidden',
            }}
          />
        } */}

        <View style={styles.headerImageWrap}>
          <Image
            source={require('../../assets/img/quizcast-h1.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttons}>
          {isCastConnected && (
            <AppMenuButton
              title={gameBtnText}
              onPress={gameHandler}
              isLoading={loading}
            />
          )}

          {/* {isInitChannel && gameId && (
            <AppMenuButton title="Continue" onPress={gameContinue} />
          )} */}

          {isCastConnected ? (
            <AppMenuButton title="Disconnect" onPress={disconnectHandler} />
          ) : (
            <AppMenuButton title="Connect" onPress={connectHandler}>
              <CastButton style={styles.castButton} />
            </AppMenuButton>
          )}

          <AppMenuButton title="Help" onPress={helpHandler} />
          {/* <Button
            title="Go to Lobby screen! (tmp)"
            onPress={() => this.props.navigation.push('GameOver')}
          /> */}
        </View>
      </View>
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
  // engine: {
  //   position: 'absolute',
  //   right: 0,
  // },
  headerImage: {
    width: 330,
    height: 90,
  },
  headerImageWrap: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: 200,
  },
  body: {
    flex: 1,
  },
  buttons: {
    flex: 2,
  },
  sectionContainer: {
    // marginTop: 32,
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  castButton: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
