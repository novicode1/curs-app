/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import AppNavigator from './src/AppNavigator';
import NavigationService from './src/NavigationService';

import { StatusBar, BackHandler, Alert, StyleSheet, Platform } from 'react-native';

import { ThemeProvider } from 'react-native-elements';
import { MainContextProvider } from './src/contexts/MainContext';

import SplashScreen from 'react-native-splash-screen';
import uuid from 'uuid';
import { logEvents } from './src/components/Log';
import GoogleCast from 'react-native-google-cast';
import { GC_CHANNEL } from './config.json';
import QuizCastGame from './src/services/game';
import storage from './src/api/storage';
import { joinGame } from './src/api/session';
import * as settingsService from './src/services/settings';
import PushNotification from 'react-native-push-notification';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['ReactNative.NativeModules.LottieAnimationView']);
YellowBox.ignoreWarnings(['Animated', 'Battery state', 'GeolocationService::onError - ERROR - ']);
import AppScreenBackground from './src/views/ui/AppScreenBackground';

export default function App() {
  const [appState, setAppState] = useState({
    isCastConnected: false,
    gameId: null,
    hostId: null,
    isHost: null,
  });

  const [userId, setUserId] = useState(null);
  const [isInitChannel, setIsInitChannel] = useState(false);
  const [game, setGame] = useState({});
  const [gameProcess, setGameProcess] = useState({});
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log('>>>>> init channel was changed', isInitChannel);
  // }, [isInitChannel]);


  //TODO: CALL THIS TO GET TOKEN TO SEND PUSH FROM SERVER SIDE
  PushNotification.requestPermissions();

  PushNotification.createChannel({
		channelId: 'default-channel-id', // (required)
		channelName: 'Default channel', // (required)
		channelDescription: 'A default channel', // (optional) default: undefined.
		soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
		importance: 4, // (optional) default: 4. Int value of the Android notification importance
		vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
	},
		created =>
			console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  useEffect(() => {
		SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (userId) {
      GoogleCast.EventEmitter.addListener(
        GoogleCast.SESSION_STARTED,
        onSessionStarted,
      );

      GoogleCast.EventEmitter.addListener(
        GoogleCast.SESSION_RESUMED,
        onSessionResumed,
      );

      GoogleCast.EventEmitter.addListener(
        GoogleCast.SESSION_ENDED,
        onSessionEnded,
      );

      GoogleCast.EventEmitter.addListener(
        GoogleCast.CHANNEL_MESSAGE_RECEIVED,
        onChannelMessageReceived,
      );
    }
	}, [userId]);

  useEffect(() => {
    logEvents();

    GoogleCast.getCastState(GC_CHANNEL).then(async state => {
      const isCastConnected = state === 'Connected';
      setAppState({ ...appState, isCastConnected });

      if (isCastConnected) {
        await initChannel();
      }
    });

    BackHandler.addEventListener('hardwareBackPress', backAction);
    // NavigationService.replace('GameOver'); // for test

    const init = async () => {
      // let uid = await storage.get('userId');
      // if (!uid) {
      //   uid = uuid.v4();
      //   await storage.add('userId', uid);
      // }
      // setUserId(uid);
      // const config = await settingsService.load();
      // setSettings(config);
    };

    init();

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);

      GoogleCast.EventEmitter.removeAllListeners(GoogleCast.SESSION_STARTED);
      GoogleCast.EventEmitter.removeAllListeners(GoogleCast.SESSION_ENDED);
      GoogleCast.EventEmitter.removeAllListeners(
        GoogleCast.CHANNEL_MESSAGE_RECEIVED,
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  // useEffect(() => {
  //   checkCastState();
  // });

  // const checkCastState = () => {
  //   GoogleCast.getCastState().then(async state => {
  //     const isCastConnected = state === 'Connected';
  //     if (appState.isCastConnected !== isCastConnected) {
  //       setAppState({ ...appState, isCastConnected });

  //       if (isCastConnected) {
  //         await initChannel();
  //       }
  //     }
  //   });
  // };

  const initChannel = async () => {
    console.log('is init', isInitChannel);

    if (!isInitChannel) {
      console.log('init channel');
      await GoogleCast.initChannel(GC_CHANNEL);
      setIsInitChannel(true);
      // setAppState({ ...appState, isInitChannel: true });
    }
  };

  const getGame = async () => {
    console.log('getGame', userId);
    setLoading(true);
    try {
      const data = { method: 'connect', payload: { userId } };
      await GoogleCast.sendMessage(GC_CHANNEL, JSON.stringify(data));
    } catch (err) {
      setLoading(false);
      setAppState(prev => ({ ...prev, error: err }));
      console.warn('Error in getGame', err);
    }
  };

  // Events
  const onChannelMessageReceived = async ({ message }) => {
    console.log('channel message received', JSON.parse(message));
    console.log('appState', appState);
    console.log('userId', userId);

    const { gameId, hostId, toId } = JSON.parse(message); // error
    const isHost = userId === hostId;

    if (toId !== userId) {
      return;
    }

    if (!isHost) {
      const { error } = await joinGame(gameId, userId);

      if (error) {
        Alert.alert(error);
        setLoading(false);
        return;
      }
    }

    const instanceGame = new QuizCastGame({ gameId, userId, isHost });
    setGame({});

    instanceGame.setUpdateCallback(setGame);

    setGameProcess(prevProcess => {
      if (prevProcess.game) {
        prevProcess.emit.removeAll();
        prevProcess.emit.off();
        prevProcess.removeUpdateCallback();
      }
      return instanceGame;
    });

    const config = await settingsService.load();
    setSettings(config);

    if (!config.region) {
      Alert.alert('Check your internet connection');
      setLoading(false);
      return;
    }

    setAppState(prev => ({ ...prev, gameId, hostId, isHost }));
    NavigationService.replace('Lobby', { userId, gameId, isHost });
    setTimeout(() => setLoading(false), 1000);
  };

  const onSessionResumed = async () => {
    // setIsInitChannel(true);
    // setAppState(prev => ({ ...prev, isCastConnected: true }));
    // await GoogleCast.initChannel(GC_CHANNEL);
    // await getGame();
  };

  const onSessionStarted = async () => {
    console.log('onSessionStarted');
    setAppState(prev => ({ ...prev, isCastConnected: true }));

    await initChannel();
    await getGame();
  };

  const onSessionEnded = async ({ error }) => {
    console.log('onSessionEnded');
    setIsInitChannel(false);
    setAppState(prev => ({
      ...prev,
      isCastConnected: false,
      gameId: null,
      hostId: null,
      isHost: null,
    }));
    NavigationService.replace('Home');

    if (gameProcess?.emit) {
      gameProcess.emit.off();
    }

    const ignoreErrors = ['Application is not running'];

    if (error && !ignoreErrors.includes(error)) {
      Alert.alert(error);
    }
  };

  const content = (
    <>
      <AppNavigator
        screenProps={{
          appState: { ...appState, userId, isInitChannel },
          gameProcess,
          game,
          setGame,
          getGame,
          setAppState,
          settings,
          loading,
        }}
      />
      {/* <Text style={styles.region}>region: {settings.region}</Text> */}
    </>
  );

  return (
    <ThemeProvider>
      <MainContextProvider>
        <StatusBar barStyle="light-content" hidden />
        {content}
      </MainContextProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  region: {
    position: 'absolute',
    zIndex: -1,
    color: '#333',
    bottom: 0,
    right: 0,
    margin: 20,
  },
});

// componentDidUpdate(prevProps) {
//   this.checkCastState();
// }

// checkCastState() {
//   GoogleCast.getCastState().then(state => {
//     const isCastConnected = state === 'Connected';
//     if (this.state.isCastConnected !== isCastConnected) {
//       this.setState({ isCastConnected });
//     }
//   });
// }
