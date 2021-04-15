import React from 'react';

import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { ThemeColors, ThemeFontFamily } from '../../theme';

export default function BackButton({ navigation, propStyles }) {
	return (
		<TouchableOpacity
			style={[styles.goBackButton, propStyles]}
			onPress={() => {
				navigation.goBack();
			}}>
			<Image
				source={require('./images/arrow.png')}
				style={styles.arrowIcon}
				resizeMode="contain"
			/>
			<Text style={styles.goBackButtonText}>Back</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
  goBackButton: {
    backgroundColor: '#FFA200',
    borderRadius: wp('2%'),
    paddingTop: wp('2.5%'),
    paddingBottom: wp('2.5%'),
    paddingHorizontal: wp('4%'),
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginLeft: '3%',
    marginBottom: wp('2.5%'),
    display: 'flex',
    flexDirection: 'row',
  },

  goBackButtonText: {
    fontSize: wp('5%'),
    alignSelf: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },

  arrowIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    marginRight: wp('1.5%'),
  },
});
