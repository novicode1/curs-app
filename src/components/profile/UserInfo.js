import React, { useState, useEffect, useContext } from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { TextInput } from 'react-native';
import form from '../form.style';
import userInfoStyle from './user-info.style';
import { MainContext } from '../../contexts/MainContext';

import { ThemeColors, ThemeFontFamily } from '../../theme';

export default function Profile({ navigation, user }) {
	let [storeUser] = useState(useContext(MainContext).user);

  const editField = () => navigation.navigate('EditField', { editField: 'alias', editValue: user.alias });

  return (
		<View style={styles.userInfo}>
			<View style={styles.label}>
				<Text style={styles.labelText}>Name</Text>
				<View style={styles.inputWrapper}>
					<Text style={styles.inputText}>{user.fullName ? user.fullName : ''}</Text>
				</View>
			</View>

			{user._id === storeUser._id && (
				<View style={styles.label}>
					<Text style={styles.labelText}>Email</Text>
					<View style={styles.inputWrapper}>
						<Text style={styles.inputText}>{user.email}</Text>
					</View>
				</View>
			)}

			<View style={styles.label}>
				<Text style={styles.labelText}>Alias</Text>
				<View style={styles.inputWrapper}>
					<Text style={styles.inputText}>{user.alias}</Text>
				</View>

				{user._id === storeUser._id && (
					<TouchableOpacity
						onPress={editField}
						style={styles.editButton}
					>
						<Image
							source={require('./images/edit.png')}
							style={styles.editIcon}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
  );
}

const styles = StyleSheet.create({
	...form,

	...userInfoStyle,
});
