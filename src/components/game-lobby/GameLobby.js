/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { View, Image, Text, StyleSheet } from 'react-native';

import gameLobbyStyle from './game-lobby.style';
import AvatarContainer from '../AvatarContainer';
import Flag from 'react-native-flags';
import randomQuote from './quotes/quotes';
import { MainContext } from '../../contexts/MainContext';
import GameLobbyLogic from '../../services/game-v2/game-lobby/GameLobbyLogic';
import * as settingsService from '../../services/settings';
const moment = require('moment');

export default function GameLobby({ navigation }) {
  let tournamentId =
    navigation.state.params && navigation.state.params.tournamentId;
  let pubquizId = navigation.state.params && navigation.state.params.pubquizId;

  const [timeLeft, setTimeLeft] = useState(null);
  let { user } = useContext(MainContext);
  const [game, setGame] = useState({});
  let [instanceLobby, setInstanceLobby] = useState(null);

  async function joinOrCreateGame(profileId, location) {
    if (!profileId || (!tournamentId && !pubquizId) || !location) {
      return;
    }

    console.log('Calling joinOrCreateGame - ', profileId, location);

    const config = await settingsService.load();
    const GAME_BASE_URL = config.gameBaseUrlV2;
    const SESSION_BASE_URL = config.sessionBaseURL;
    const instance = axios.create({
      baseURL: GAME_BASE_URL,
    });

    let result;
    result = await instance.post('/join-or-create-game', {
      params: {
				profileId,
				tournamentId,
				pubquizId,
				location,
				guestData: {
					photoUrl: user.photoUrl,
					fullName: user.fullName,
				},
				baseUrl: SESSION_BASE_URL,
				isGuest: user.isGuest,
			},
    });

    return result.data;
  }

  useEffect(() => {
    console.log('### Running update for joining game');
    console.log('Current user: ',user);
    if (!user._id) {
      console.log('Missing id for the user to join the game');
      return;
    }

    (async function getRegion() {
      const config = await settingsService.load();
      let regionCode = config.region.split('-');
      regionCode = regionCode[0].toUpperCase();
      let location = { countryCode: regionCode };

      console.log('Calling to join the game');
      joinOrCreateGame(user._id, location)
        .then(gameData => {
          console.log('Joined the game -', gameData._id);

          let gameId = gameData._id;
          let userId = user._id;

          setGame(gameData);

          let newInstanceLobby = new GameLobbyLogic({
            gameId,
            userId,
          });
          newInstanceLobby.setUpdateCallback(setGame);
          setInstanceLobby(newInstanceLobby);
        })
        .catch(err =>
          console.warn(`Error in joinOrCreateGame: ${err.message}`),
        );
    })();
  }, [user._id, navigation]);

  useEffect(() => {
    if (timeLeft < 0) {
      setTimeLeft(null);
    }

    if (!timeLeft) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigation, timeLeft]);

  useEffect(() => {
    console.log('Handling game update');
    if (game.currentLobbyTimeout) {
      let lobbyTimeoutInSeconds = moment(game.currentLobbyTimeout);
      let currentTimeInSeconds = moment(new Date());

      let timeout = lobbyTimeoutInSeconds.diff(currentTimeInSeconds, 'seconds');

      setTimeLeft(timeout);
    }
  }, [game]);

  useEffect(() => {
    if (game.isStart) {
      navigation.navigate('OnlineGame', { gameData: game });
      console.log('---GAME START---');
      setGame({});
    }
  }, [game.isStart, game._id]);

  let playerItem = (player, index) => {
    return (
      <View key={player.id} style={styles.userItem}>
        <View style={{ zIndex: 2 }}>
          <AvatarContainer
            propStyles={styles.userAvatar}
            avatar={player.avatar}
          />
        </View>

        <View style={styles.userNameWrapper}>
          <View style={styles.userLocationWrapper}>
            <Flag
              code={player.location ? player.location.countryCode : ''}
              size={24}
              style={styles.countryFlag}
            />
            <Text style={styles.userLocationText}>
              {player.location ? player.location.countryCode : ''}
            </Text>
          </View>

          <Text style={styles.userName}>
            {player.fullName && player.fullName.length > 19
              ? player.fullName.slice(0, 19) + '...'
              : player.fullName}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.contentWrapper}>
      <Image
        source={require('../../../assets/img/quizcast-h1.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Waiting for players to join...</Text>

      {/* gif */}

      {game.players && game.players.map(player => playerItem(player))}

      <View style={styles.bottomContainerWrapper}>
        {game && game.players && (
          <View style={styles.timerWrapper}>
            <Text style={styles.timeDescription}>Game starts in...</Text>
            <Text style={styles.time}>{timeLeft}</Text>
          </View>
        )}

        {!game || !game.players || game.players.length < 3 ? (
          <Image
            source={randomQuote}
            style={styles.quoteImage}
            resizeMode="cover"
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...gameLobbyStyle,
});
