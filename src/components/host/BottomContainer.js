import React, { useState, useContext } from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Tabs from 'react-native-tabs';

import bottomContainerStyle from './bottom-container.style';

import { ThemeColors, ThemeFontFamily } from '../../theme';
import { MainContext } from '../../contexts/MainContext';

export default function BottomContainer({
	navigation,
	onlinePlayers,
	isCurrentQuiz,
	isInaccessibleThruDistance,
	isFollowing,
	currentQuizId,
	subscribeAction,
	hostLocation
}) {
	let [tabName, setTabName] = useState('filter');
  let hostType = navigation.state.params && navigation.state.params.hostType;
  let user = useContext(MainContext).user;

	return (
		<View style={styles.bottomContainer}>
			{onlinePlayers > 0 && isCurrentQuiz && !isInaccessibleThruDistance && (
				<View style={styles.descriptionWrapper}>
					<Text style={styles.descriptionText}>
						{onlinePlayers} players are nearby.
					</Text>
				</View>
			)}

			{onlinePlayers === 0 && isCurrentQuiz && !isInaccessibleThruDistance && (
				<View style={styles.descriptionWrapper}>
					<Image
						source={require('./images/robot.png')}
						style={styles.robotIcon}
						resizeMode="contain"
					/>
					<Text style={styles.descriptionText}>
						There're no players are nearby. You'll we playing with a bot.
					</Text>
				</View>
			)}

			{!isInaccessibleThruDistance && isCurrentQuiz && (
				<TouchableOpacity style={styles.primaryButton} onPress={() => {
					navigation.navigate('GameLobby', hostType === 'tournament' ? { tournamentId: currentQuizId } : { pubquizId: currentQuizId });
				}}>
					<Text style={styles.primaryButtonText}>Play</Text>
				</TouchableOpacity>
			)}

			{!isCurrentQuiz && user.isGuest !== true && (
				<React.Fragment>
					<View style={styles.descriptionWrapper}>
						<Text style={[styles.descriptionText, styles.subscribeText]}>
							{!isFollowing ? 'Subscribe to receive notifications when a new game starts.' : ''}
						</Text>
					</View>

					<TouchableOpacity
						style={[
							styles.primaryButton,
							styles.primaryButtonBlue,
							isFollowing ? styles.secondaryButton : {},
						]}
						onPress={subscribeAction}>
						<Text
							style={[
								styles.primaryButtonText,
								isFollowing ? styles.secondaryButtonText : {},
							]}>
							{isFollowing ? 'Unfollow' : 'Follow'}
						</Text>
					</TouchableOpacity>
				</React.Fragment>
			)}

			{isCurrentQuiz && isInaccessibleThruDistance && hostLocation && (
				<React.Fragment>
					<View style={styles.descriptionWrapper}>
						<Text style={styles.descriptionText}>
							You have to check-in to play.
						</Text>
					</View>

					<TouchableOpacity
						style={styles.primaryButton}
						onPress={() => {
							Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${hostLocation[1]},${hostLocation[0]}`).catch(err =>
								console.error('error occurred', err),
							);
						}}>
						<Text style={styles.primaryButtonText}>Directions</Text>
					</TouchableOpacity>
				</React.Fragment>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	...bottomContainerStyle,
});
