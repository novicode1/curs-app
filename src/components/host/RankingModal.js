
import React, { useState, useContext, useEffect } from 'react';

import {
	View,
	Text,
	StyleSheet,
	Modal,
	TouchableOpacity,
	ScrollView
} from 'react-native';

import modalStyles from './modal.style';

import { MainContext } from '../../contexts/MainContext';

import { getRankingList } from '../../api/session';

export default function RankingModal({
	hostType,
	currentQuizId,
	userItem,
	toggleRankingModal
}) {
	let user = useContext(MainContext).user;
	const maxUsersInList = 1000;

  let [users, setUsers] = useState([
    {
      gameRankingPosition: 0,
      _id: '',
      playerId: {
        fullName: '',
      },
      score: 0,
    },
  ]);

  useEffect(() => {
		getRankingList(
			hostType,
			currentQuizId,
			maxUsersInList
		).then(users => {setUsers([...users])});
  }, []);

	return (
		<React.Fragment>
			<Modal visible={true} transparent={true} animationType="fade" style={styles.modal}>
				<TouchableOpacity
					onPress={() => {
						toggleRankingModal(false)
					}}
					style={styles.modalBackground}
				/>

				<View style={styles.modalContent}>
					<ScrollView>
						{users.map((item, index) => userItem(item, index + 1))}
					</ScrollView>
				</View>
			</Modal>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	...modalStyles,
});
