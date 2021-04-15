import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import AppPlayerAvatar from '../ui/AppPlayerAvatar';
import AppProgress from './AppProgress';
import AppExitButton from './ui/AppExitButton';

export default function({ settings, question, inProgress, player, onExit }) {
  const progressBar = (
    <AppProgress
      inProgress={inProgress}
      time={question.isBlitz ? settings.blitzTimer : settings.timer}
      isBlitz={question.isBlitz}
    />
  );

  return (
    <View style={styles.container}>
      <AppPlayerAvatar
        avatarName={player.avatar}
        points={player.points}
        style={styles.avatar}
      />

      {inProgress && progressBar}

      <AppExitButton onPress={onExit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginBottom: 20,
    height: 100,
  },
  avatar: {
    marginRight: 2,
  },
});
