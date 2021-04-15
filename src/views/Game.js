import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import AppQuestion from '../components/game/AppQuestion';
import AppAnswers from '../components/game/AppAnswers';
import GameHeader from '../components/game/GameHeader';
import AppPopup from '../components/AppPopup';
import AppScreenBackground from './ui/AppScreenBackground';
import AppNetworkError from '../components/AppNetworkError';
import { MainContext } from '../contexts/MainContext';

// helpers
const getWinner = game => {
  const { index } = game.question;
  return game.players.find(player => {
    const answer = player.answers[index];
    return answer ? answer.isCorrect : null;
  });
};

export default function Game({ navigation, screenProps }) {
  let { updateUserData } = useContext(MainContext);
	navigation.addListener('didFocus', payload => { updateUserData() });

  const { game, gameProcess, setGame, settings } = screenProps;
  const [popupOptions, setPopupOptions] = useState({ preset: null });
  const [timeoutId, setTimeoutId] = useState(null);

  const inProgress = ['answer', 'next'].includes(game.status);
  const showProgress = game.status === 'next';

  useEffect(() => {
    setGame({ ...game, status: 'next' });

    return () => {
      gameProcess.emit.removeAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('timeout:', inProgress);
    if (inProgress) {
      const time = game.question.isBlitz ? settings.blitzTimer : settings.timer;
      const id = setTimeout(timerFinish, time * 1000);
      setTimeoutId(id);
    } else {
      clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inProgress]);

  useEffect(() => {
    if (game.isEnded) {
      gameProcess.emit.off();
      navigation.replace('Home');
    }
  }, [game.isEnded]);

  useEffect(() => {
    const status = game.status;

    if (status === 'game-over') {
      navigation.replace('GameOver');
    }

    if (status === 'before-blitz') {
      setPopupOptions({ preset: 'beforeBlitz' });
    }

    if (status === 'after-blitz') {
      setTimeout(() => {
        const winner = getWinner(game);

        if (winner) {
          setPopupOptions({ preset: 'blitzWinner', avatarName: winner.avatar });
        } else {
          setPopupOptions({ preset: 'blitzNoWinner' });
        }
      }, settings.afterBlitzPopupTimeout);
    }

    const popupStatuses = ['before-blitz', 'after-blitz'];
    if (!popupStatuses.includes(status) && popupOptions.preset) {
      setPopupOptions({ preset: null });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.status]);

  const emitAnswer = index => {
    gameProcess.emit.answer(index);
    setGame({ ...game, status: 'answer' });
  };

  const timerFinish = () => {
    if (inProgress) {
      gameProcess.emit.timeout();
    }
  };

  const onExit = () => {
    const description = game.isHost
      ? 'This will end the game'
      : 'You can no longer return to the game.';

    Alert.alert(
      'Are you sure?',
      description,
      [
        { text: 'Oh no', style: 'cancel' },
        { text: 'Yes', onPress: disconnect },
      ],
      { cancelable: true },
    );
  };

  const disconnect = () => {
    gameProcess.emit.off();
    navigation.replace('Home');
  };

  if (!game.player) {
    return <Text>Loading...</Text>;
  }

  const highlightStatus = ['timeout', 'after-blitz'];
  const isHighlight = highlightStatus.includes(game.status);

  return (
    <AppScreenBackground style={styles.container}>
      <AppNetworkError gameProcess={screenProps.gameProcess} />
      {/* <Text>status: {game.status}</Text> */}

      <GameHeader
        settings={settings}
        question={game.question}
        inProgress={showProgress}
        player={game.player}
        onExit={onExit}
      />

      <View style={styles.questionWrapper}>
        {game.question && (
          <AppQuestion question={game.question} style={styles.question} />
        )}

        {game.question && (
          <AppAnswers
            status={game.status}
            question={game.question}
            highlight={isHighlight}
            callback={emitAnswer}
            style={styles.answers}
          />
        )}

        <AppPopup
          options={popupOptions}
          set={setPopupOptions}
          settings={settings}
        />
      </View>
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionWrapper: {
    marginHorizontal: '5%',
    flex: 1,
  },
  question: {
    flex: 1,
  },
});
