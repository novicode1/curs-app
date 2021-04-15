import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import AppPlayerAvatar from './AppPlayerAvatar';
import AppProgress from './AppProgress';
import AppExitButton from './ui/AppExitButton';
const moment = require('moment');

export default function({
  settings,
  question,
  inProgress,
  currentQuestionTimeout,
  players,
  onExit,
}) {
	const [questionTimeout, setQuestionTimeout] = useState(0);


  useEffect(() => {
		let questionTimeoutInSeconds = moment(currentQuestionTimeout);
		let currentTimeInSeconds = moment(new Date());
		let timeout = questionTimeoutInSeconds.diff(
			currentTimeInSeconds,
			'seconds',
		);

		// const time = question.isBlitz ? settings.blitzTimer : timeout;
		const time = timeout;
		setQuestionTimeout(time)
  }, [currentQuestionTimeout]);

  const progressBar = (
    <AppProgress
      inProgress={inProgress}
      time={
				//question.isBlitz ? settings.blitzTimer :
				questionTimeout
			}
			isBlitz={
				//question.isBlitz
				false
			}
    />
	);

	function player(item) {
		return (
			<AppPlayerAvatar
				key={item.id}
				avatar={item.avatar}
				points={item.playerScore}
				style={styles.avatar}
				profileId={item.id}
			/>
		)
	}

  return (
    <View style={styles.container}>
			{inProgress && questionTimeout > 0 && progressBar}

			<View style={styles.players}>
				{ players.map(item => player(item)) }
			</View>

      <AppExitButton onPress={onExit} style={styles.exitButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginBottom: 12,
		paddingHorizontal: 14,
  },
  avatar: {
    marginRight: 12,
	},
	players: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		height: 64,
	},
});
