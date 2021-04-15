import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import notificationsStyle from './notifications.style';
import { MainContext } from '../../contexts/MainContext';

export default function({ propStyles, navigation }) {
	let { notificationCount } = useContext(MainContext);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Notifications');
      }}
      style={[styles.notificationIconWrapper, propStyles]}>
      <Image
        source={require('./img/bell.png')}
        style={styles.notificationIcon}
        resizeMode="contain"
      />

			{notificationCount > 0 && (
				<View style={styles.unreadBadgeWrapper}>
        	<Text style={styles.unreadBadge}>{notificationCount}</Text>
      	</View>
			)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	...notificationsStyle,
});
