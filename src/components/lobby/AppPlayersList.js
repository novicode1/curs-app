import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppPlayerAvatar from '../ui/AppPlayerAvatar';
import { ThemeFontFamily } from '../../theme';

const avatars = {
  banana: require('../../../assets/img/avatars/banana.jpg'),
  cherries: require('../../../assets/img/avatars/cherries.jpg'),
  garnet: require('../../../assets/img/avatars/garnet.jpg'),
  pepper: require('../../../assets/img/avatars/pepper.jpg'),
  tomato: require('../../../assets/img/avatars/tomato.jpg'),
  pumpkin: require('../../../assets/img/avatars/pumpkin.png'),
};

export default function({ players }) {
  return (
    <>
      <Text style={styles.title}>Players:</Text>

      <View style={styles.playersSection}>
        {players.map(player => (
          <AppPlayerAvatar
            avatar={avatars[player.avatar]}
            isHost={player.isHost}
            isCurrent={player.isCurrent}
            style={styles.AppPlayerAvatar}
            key={player.id}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    marginBottom: 15,
    marginTop: 15,
    color: 'white',
    fontWeight: '500',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },
  playersSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  AppPlayerAvatar: {
    marginBottom: 10,
    marginRight: 10,
  },
});
