import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { avatars, icons } from '../resources';

import AppActionButton from './ui/AppActionButton';
import AppPlayerTotals from '../components/ui/AppPlayerTotals';
import { ThemeColors, ThemeFontFamily } from '../theme';
import AppScreenBackground from './ui/AppScreenBackground';

export default ({ navigation, screenProps }) => {
  const { game, gameProcess, setAppState } = screenProps;
  const { isHost } = screenProps.appState;

  useEffect(() => {
    gameProcess.emit.updateState({ isGameOver: true });
    gameProcess.emit.off();

    setAppState(prev => ({
      ...prev,
      gameId: null,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goHome = () => navigation.replace('Home');
  // const newGame = () => navigation.replace('Home', { newGame: true });

  const cups = [icons.cupGold, icons.cupSilver, icons.cupBronze];
  console.log({ players: game.players });
  return (
    <AppScreenBackground style={styles.wrapper}>
      <Text style={styles.title}>Game Over!</Text>
      <View style={styles.totalsWrap}>
        {game.players &&
          game.players.map((player, index) => {
            const cup = cups[index] || null;
            const avatar = avatars[player.avatar];

            return (
              <AppPlayerTotals
                key={player.id}
                avatarSource={avatar}
                cupSource={cup}
                player={player}
                style={styles.AppPlayerTotals}
              />
            );
          })}
      </View>

      <View style={styles.buttonsWrapper}>
        <AppActionButton
          title="Menu"
          onPress={goHome}
          style={styles.menuButton}
        />
        {/* {isHost && (
          <AppActionButton
            onPress={newGame}
            title="Start"
            style={styles.startButton}
          />
        )} */}
      </View>
    </AppScreenBackground>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 42,
    textTransform: 'uppercase',
    marginBottom: 20,
    fontWeight: '700',
    color: ThemeColors.orange,
    shadowColor: 'white',
    shadowOffset: { width: 1, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    fontFamily: ThemeFontFamily.NeuronBlack,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  menuButton: {
    flex: 1,
    marginRight: 5,
  },
  startButton: {
    flex: 1,
    marginLeft: 5,
  },
  totalsWrap: {
    flex: 1,
  },
  AppPlayerTotals: {
    marginBottom: 8,
  },
});
