import React from 'react';

import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { ThemeColors, ThemeFontFamily } from '../../theme';
import playIcon from './images/play-icon.png';

export default function ActionCard({ navigation, title, onPress, image, description, propStyles }) {
	return (
		<TouchableOpacity
			style={[styles.actionCard, propStyles]}
			onPress={onPress}
		>
			<Image
				source={image}
				style={styles.imageWrapper}
				resizeMode="cover"
			/>
			<View style={styles.textWrapper}>
				<View style={styles.titleWrapper}>
					<Text style={styles.title}>{title}</Text>
					<Image
						source={playIcon}
						style={styles.playIcon}
						resizeMode="cover"
					/>
				</View>

				<Text style={styles.description}>{description}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
  actionCard: {
		width: wp('94%'),
		display: 'flex',
		alignSelf: 'center',
		overflow: 'hidden',
		borderRadius: wp('5%'),
	},

	imageWrapper: {
		width: '100%',
		height: wp('40%'),
		backgroundColor: '#eee',
	},

	textWrapper: {
		paddingVertical: wp('6%'),
		paddingHorizontal: wp('12%'),
		backgroundColor: '#fff',
	},

	titleWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: wp('2%'),
	},

	title: {
		fontFamily: ThemeFontFamily.NeuronBlack,
		color: '#ffa000',
		fontSize: wp('6.5%'),
		textTransform: 'uppercase',
	},

	playIcon: {
		width: wp('6.5%'),
		height: wp('6.5%'),
		marginLeft: wp('3%'),
	},

	description: {
		fontFamily: ThemeFontFamily.NeuronDemiBold,
		color: '#444444',
		fontSize: wp('3.8%'),
		lineHeight: wp('4.6%'),
	}
});
