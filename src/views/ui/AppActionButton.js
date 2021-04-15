import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { ThemeFontFamily } from '../../theme';

const icon = require('../../../assets/img/orange-btn.png');

export default ({ title, onPress, style, disabled, isLoading }) => {
  useEffect(() => {
    // Image.getSize('https://reactjs.org/logo-og.png', (srcWidth, srcHeight) => {
    //   const maxHeight = Dimensions.get('window').height;
    //   const maxWidth = Dimensions.get('window').width;
    //   const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    //   console.log({
    //     ratio,
    //     height: srcHeight * ratio,
    //     width: srcWidth * ratio,
    //     maxWidth,
    //   });
    // this.setState({ height: srcHeight * ratio})
    // });
  }, []);

  const spinner = (
    <View style={[styles.spinner]}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );

  const imageStyle = disabled ? styles.disabledImage : {};
  const textStyle = disabled ? styles.disabledText : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.wrapper, ...style }}
      disabled={isLoading}>
      <ImageBackground
        source={icon}
        resizeMode="contain"
        imageStyle={imageStyle}
        style={styles.imageButton}>
        {isLoading ? (
          spinner
        ) : (
          <View style={styles.textWrap}>
            <Text style={[styles.title, textStyle]}>{title}</Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: 'white',
    // alignSelf: 'baseline',
  },
  title: {
    color: 'white',
    fontSize: 40,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontFamily: ThemeFontFamily.NeuronBlack,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    elevation: 5,
  },
  imageButton: {
    height: 80,
    justifyContent: 'center',
    width: '100%',
  },
  textWrap: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabledImage: {
    tintColor: '#00000040',
  },
  disabledText: {
    color: '#ffffffcf',
  },

  spinner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
