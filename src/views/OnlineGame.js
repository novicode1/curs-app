/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Alert, ScrollView, Text } from 'react-native';
import AppQuestion from '../components/online-game/AppQuestion';
import AppAnswers from '../components/online-game/AppAnswers';
import GameHeader from '../components/online-game/GameHeader';
import AppPopup from '../components/AppPopup';
import AppScreenBackground from './ui/AppScreenBackground';
import AppNetworkError from '../components/AppNetworkError';
import Game from '../services/game-v2/game/Game';
import { MainContext } from '../contexts/MainContext';

import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// helpers
const getWinner = game => {
  const { index } = game.question;
  return game.players.find(player => {
    const answer = player.answers[index];
    return answer ? answer.isCorrect : null;
  });
};

export default function OnlineGame({ navigation, screenProps }) {
	navigation.addListener('didFocus', payload => { updateUserData() });

  let propsGameData =
    navigation.state.params && navigation.state.params.gameData;

  const [game, setGame] = useState({});
  let [instanceGame, setInstanceGame] = useState(null);
  const { settings } = screenProps;
  let { user, updateUserData } = useContext(MainContext);

  const [popupOptions, setPopupOptions] = useState({ preset: null });

  const inProgress = ['answer', 'next'].includes(game.status);
  const showProgress = game.status === 'next';

  useEffect(() => {
    setGame({ ...propsGameData, status: 'next' });

    let newInstanceGame = new Game({
      gameId: propsGameData._id,
      userId: user._id,
      game: propsGameData,
    });

    newInstanceGame.setUpdateCallback(setGame);

    setInstanceGame(newInstanceGame);
  }, [propsGameData]);

  useEffect(() => {
    if (game.isEnded) {
      console.info('Game completed - navigating to GameResults.');
      instanceGame.emit.off();
      instanceGame.emit.removeAll();
      instanceGame.removeUpdateCallback();
      navigation.replace('GameResults', { propsGameData: game });
    }
  }, [game.isEnded]);

  useEffect(() => {
    const status = game.status;
    console.info(`Handling gama status update - ${game.status}`);
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
    instanceGame.emit.answer(index, game.questionIndex);
    setGame({ ...game, status: 'answer' });
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
        {
          text: 'Yes',
          onPress: () => {
            instanceGame.emit.off();
            navigation.navigate('Main');
          },
        },
      ],
      { cancelable: true },
    );
  };

  const highlightStatus = ['timeout', 'after-blitz'];
  const isHighlight = highlightStatus.includes(game.status);

  return (
    <AppScreenBackground style={styles.container}>

			<ScrollView style={styles.scrollView}>
				<AppNetworkError gameProcess={instanceGame} />
				{/* <Text>status: {game.status}</Text> */}

				{game.players && (
					<GameHeader
						settings={settings}
						question={game.question}
						inProgress={showProgress}
						players={game.players}
						currentQuestionTimeout={game.currentQuestionTimeout}
						onExit={onExit}
					/>
				)}

				<View style={styles.questionWrapper}>
					{game.question && (
						<AppQuestion
							question={game.question}
							questionsLength={game.questions.length}
							questionIndex={game.questionIndex}
						/>
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
			</ScrollView>
		</AppScreenBackground>
  );
}

const styles = StyleSheet.create({
	questionWrapper: {
    marginHorizontal: '5%',
  },

	scrollView: {
		// flex: 1,
		maxHeight: '100%',
	}
});
