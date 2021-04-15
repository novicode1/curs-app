/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef, useContext } from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MainContext } from '../../contexts/MainContext';

import gameResultsStyle from './game-results.style';
import AvatarContainer from '../AvatarContainer';
import Flag from 'react-native-flags';
import goldCupIcon from './images/gold-cup.png';
import silverCupIcon from './images/silver-cup.png';
import bronzeCupIcon from './images/bronze-cup.png';
import backIcon from './images/back.png';
import repeatIcon from './images/repeat.png';

export default function GameResults({ navigation }) {
  let [resultExpanded, setResultExpanded] = useState(false);
  let { user } = useContext(MainContext);
  let propsGameData =
		navigation.state.params && navigation.state.params.propsGameData;

	let currentUserResult = propsGameData.players.find(player => user._id === player.id);
	let blitzAnswers = currentUserResult.answers.filter(answer => answer && answer.isCorrect && answer.isBlitz);
	let blitzScore = blitzAnswers.length;
	let correctAnswers = currentUserResult.answers.filter(answer => answer && answer.isCorrect).length;


  let playerItem = player => {
    let position = player.position;
    let selfResult = user._id === player.id;

    return (
      <View
        key={player._id}
        style={[
          styles.userItem,
          selfResult ? { borderBottomLeftRadius: 10 } : {},
        ]}>
        <View style={styles.mainContentWrapper}>
          <View style={{ zIndex: 2 }} style={styles.userAvatarWrapper}>
            <AvatarContainer
              propStyles={styles.userAvatar}
              avatar={player.avatar}
            />

            {selfResult && (
              <View style={styles.selfLabel}>
                <Text style={styles.selfLabelText}>Me</Text>
              </View>
            )}
          </View>

          <View style={styles.userInfoWrapper}>
            <Image
              source={
                position === 1
                  ? goldCupIcon
                  : position === 2
                  ? silverCupIcon
                  : position === 3
                  ? bronzeCupIcon
                  : null
              }
              style={styles.cupIcon}
              resizeMode="contain"
            />

            <View style={styles.userNameWrapper}>
              <View style={styles.userLocationWrapper}>
                <Flag
                  code={player.location ? player.location.countryCode : ''}
                  size={24}
                  style={styles.countryFlag}
                />
                <Text style={styles.userLocationText}>
                  {player.location && player.location.city ? player.location.city + ', ' : ''}
                  {player.location ? player.location.countryCode : ''}
                </Text>
              </View>

              <Text style={styles.userName}>
                {selfResult
                  ? player.fullName
                  : player.fullName.length > 14
                  ? player.fullName.slice(0, 14) + '...'
                  : player.fullName}
              </Text>
            </View>

            <View style={styles.userScore}>
              <Text style={styles.userScoreText}>{player.playerScore}</Text>
            </View>
          </View>
        </View>

        {selfResult && (
          <View style={styles.selfResultTableWrapper}>
            <ScrollView
              style={[
                resultExpanded ? styles.selfResultTableExpanded : styles.selfResultTable,
              ]}>
              <View style={styles.resultRow}>
                <Text style={[styles.resultTitle, { color: '#99cc99' }]}>
                  Correct answers
                </Text>
                <View style={styles.resultValue}>
                  <Text
                    style={[
                      styles.resultValueText,
                      { backgroundColor: '#99cc99', color: '#fff' },
                    ]}>
                    {correctAnswers}
                  </Text>
                </View>
              </View>

							<React.Fragment>
								{ currentUserResult.bonusPoints.map(bonus => (
									<View style={styles.resultRow} key={bonus.title}>
										<Text style={styles.resultTitle}>
											{bonus.title}
										</Text>

										<View style={styles.resultValue}>
											<Text style={styles.resultValueText}>+{bonus.points}</Text>
										</View>
									</View>
								))}

							</React.Fragment>
            </ScrollView>

            <TouchableOpacity
              style={styles.expandTableButton}
              onPress={() => {
                setResultExpanded(!resultExpanded);
              }}>
              <Text style={styles.expandTableButtonText}>
                {!resultExpanded ? 'Expand' : 'Hide'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.contentWrapper}>
      <View style={styles.viewTitle}>
        <Text style={styles.viewTitleText}>Game over</Text>
      </View>

      {resultExpanded &&
        playerItem(propsGameData.players.find(player => user._id === player.id))}

      {!resultExpanded && propsGameData.players.map(player => playerItem(player))}

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            navigation.navigate('Host', {
							tournamentId: propsGameData.tournamentId,
							pubquizId: propsGameData.pubquizId,
						});
          }}>
          <Image
            source={backIcon}
            style={styles.actionIcon}
            resizeMode="contain"
          />
          <Text style={styles.actionButtonText}>Back</Text>
        </TouchableOpacity>

				<TouchableOpacity
					style={styles.actionButton}
					onPress={() => {
						navigation.navigate('GameLobby', {
							tournamentId: propsGameData.tournamentId,
							pubquizId: propsGameData.pubquizId,
						});
					}}
				>
          <Image
            source={repeatIcon}
            style={styles.actionIcon}
            resizeMode="contain"
          />
          <Text style={styles.actionButtonText}>Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...gameResultsStyle,
});
