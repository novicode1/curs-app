import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../theme';
import { avatars } from '../resources';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default ({ avatar, avatarName, style, propStyles }) => {
	const guestAvatar = avatars[avatar];

  return (
    <View style={[styles.playerWrapper, propStyles]}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={guestAvatar ? guestAvatar : {
					uri: avatar
				}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playerWrapper: {
		borderWidth: wp('1.5%'),
    borderRadius: 200,
    borderColor: ThemeColors.blue,
		backgroundColor: 'white',
		overflow: 'hidden',
    height: wp('20%'),
    width: wp('20%'),
	},
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 20,
  },
});
