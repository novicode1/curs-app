import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

export default ({ onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
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
    width: 50,
    height: 50,
  },
});
