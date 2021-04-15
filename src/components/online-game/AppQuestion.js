import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function({ question, style, questionsLength, questionIndex }) {
  return (
		<View style={[{ ...styles.wrapper, ...style }, !question.imageUrl ? styles.wrapperLong : {}]}>
			<View style={styles.questionProgress}>
				<Text style={styles.questionProgressText}>{questionIndex + 1}/{questionsLength}</Text>
			</View>

			{question.imageUrl && (
				<Image
					resizeMode="cover"
					style={styles.questionImage}
					source={{
						uri: question.imageUrl
					}}
				/>
			)}
			<Text style={styles.title}>{question.questionTitle}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff7a',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
		position: 'relative',
  },
	wrapperLong: {
		paddingVertical: wp('20%'),
	},
  title: {
    color: '#0d6c72',
    fontWeight: '600',
    paddingHorizontal: 15,
    fontSize: 30,
    marginBottom: 15,
    marginTop: 15,
    fontFamily: ThemeFontFamily.NeuronDemiBold,
    textAlign: 'center',
	},
	questionProgress: {
		position: 'absolute',
		top: -20,
		right: -4,
		backgroundColor: '#BCE9F0',
		paddingVertical: 12,
		paddingHorizontal: 7,
		borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
		elevation: 5,
		minWidth: 24,
	},

	questionImage: {
		width: '100%',
		height: wp('55%'),
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},

	questionProgressText: {
		color: ThemeColors.blue,
		fontSize: 16,
    fontFamily: ThemeFontFamily.NeuronBlack,
    textAlign: 'center',
	}
});
