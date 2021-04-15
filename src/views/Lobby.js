/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Button, Text, Alert } from 'react-native';
import AppQuestionPack from '../components/lobby/AppQuestionPack';
import AppPlayersList from '../components/lobby/AppPlayersList';
import { getQuestions } from '../api/session';
import AppPopup from '../components/AppPopup';
import AppNavLine from './ui/AppNavLine';
import AppActionButton from './ui/AppActionButton';
import AppScreenBackground from './ui/AppScreenBackground';
import AppNetworkError from '../components/AppNetworkError';
import { MainContext } from '../contexts/MainContext';

export default function Lobby({ navigation, screenProps }) {
  let { updateUserData } = useContext(MainContext);
	navigation.addListener('didFocus', payload => { updateUserData() });

  const { isHost } = screenProps.appState;
  const { game, gameProcess } = screenProps;

  const [questionPack, setQuestionPack] = useState(null);
  const [questionPacks, setQuestionPacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupOptions, setPopupOptions] = useState({ preset: null });

  useEffect(() => {
    gameProcess.emit.handshake();

    if (isHost) {
      getQuestions()
        .then(setQuestionPacks)
        .catch(err => console.warn(`Error in getQuestions: ${err.message}`));
    }

    return () => {
      setLoading(false);
      // gameProcess.removeUpdateCallback();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('use effect lobby game');
  }, [game]);

  useEffect(() => {
    if (questionPack) {
      const title = questionPacks.find(q => q._id === questionPack).title;
      gameProcess.emit.update({
        questionPackTitle: title,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionPack]);

  useEffect(() => {
    console.log('game status lobby', game.status);
    if (game.status === 'game-start') {
      navigation.replace('Game');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.status]);

  useEffect(() => {
    if (game.isEnded) {
      gameProcess.emit.off();
      navigation.replace('Home');
    }
  }, [game.isEnded]);

  const startHandler = () => {
    if (!questionPack) {
      return Alert.alert('Please select question pack');
    }
    setLoading(true);
    gameProcess.emit.start(questionPack);
  };

  const backHandler = () => {
    gameProcess.emit.off();
    navigation.replace('Home');
  };

  const navTitle = isHost ? 'New game' : 'Join game';
  const disableStart = !questionPack || !game.players;

  return (
    <AppScreenBackground style={styles.wrapper}>
      <AppNetworkError gameProcess={screenProps.gameProcess} />
      <AppNavLine title={navTitle} onPress={backHandler} />
      <View style={styles.contentWrapper}>
        <View style={styles.main}>
          {isHost && (
            <AppQuestionPack
              selectedId={questionPack}
              setter={setQuestionPack}
              options={questionPacks}
            />
          )}

          <AppPlayersList players={game.players || []} />
        </View>
        <View style={styles.footer}>
          {isHost && (
            <AppActionButton
              disabled={disableStart}
              title="Start"
              isLoading={loading}
              onPress={startHandler}
            />
          )}
        </View>
      </View>
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentWrapper: {
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
  main: {
    flex: 1,
  },
  footer: {
    marginBottom: '5%',
  },
});
