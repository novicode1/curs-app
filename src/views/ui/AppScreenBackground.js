import React from 'react';
import { StyleSheet, Image, ImageBackground, SafeAreaView } from 'react-native';

export default ({ children, style = {} }) => {
  const headerImage = (
    <Image
      source={require('../../../assets/img/bg-header.png')}
      style={styles.headerImage}
      resizeMode="contain"
    />
  );

  const footerImage = (
    <Image
      source={require('../../../assets/img/bg-footer.png')}
      style={styles.footerImage}
      resizeMode="contain"
    />
  );

  return (
    <ImageBackground
      source={require('../../../assets/img/bg.jpg')}
      style={{ ...styles.backgroundImage, ...style }}>
      {headerImage}
      {footerImage}
      <SafeAreaView style={styles.safeAreaView}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  headerImage: {
    position: 'absolute',
    width: 800,
    height: 500,
    left: -100,
    top: -240,
  },
  footerImage: {
    position: 'absolute',
    width: 800,
    height: 500,
    bottom: -150,
  },
});
