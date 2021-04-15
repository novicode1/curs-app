import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

export default ({ onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={styles.exitButton}>
      <Image
        source={require('../../../../assets/img/exit-btn.png')}
        style={{ ...styles.buttonImage, ...style }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonImage: {
    width: 44,
    height: 44,
	},

	exitButton: {
		position: 'absolute',
		top: 0,
		right: 4
	}
});
