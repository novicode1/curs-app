import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { ThemeFontFamily } from '../../theme';

export default ({ title, onPress, isLoading, children }) => {
  const spinner = (
    <View style={[styles.spinner]}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.5}>
      <ImageBackground
        source={require('../../../assets/img/main-menu-btn.png')}
        resizeMode="stretch"
        style={styles.buttonImage}>
        {isLoading ? (
          spinner
        ) : (
          <View style={styles.textWrap}>
            {children}
            <Text style={styles.text}>{title}</Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const imageResHelper = (cnt = 2.5) => {
  return {
    width: 701 / cnt,
    height: 191 / cnt,
  };
};
const imageRes = imageResHelper();

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 40,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontFamily: ThemeFontFamily.NeuronBlack,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
  },
  textWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  buttonImage: {
    textAlign: 'center',
    width: imageRes.width,
    maxHeight: imageRes.height,
    height: '100%',
  },

  wrapper: {
    width: imageRes.width,
    maxHeight: imageRes.height,
    flex: 1,
    marginBottom: 15,
  },

  spinner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

// {/* <View>
//   <View style={styles.headerLine} />
//   <View style={styles.footerLine} />
//   <Text style={{ position: 'absolute', top: 13 }}>Button</Text>
// </View> */}
// headerLine: {
//   backgroundColor: '#4fd1da',
//   flex: 1,
//   width: 300,
//   borderTopLeftRadius: borderRadius,
//   borderTopRightRadius: borderRadius,
// },
// footerLine: {
//   backgroundColor: '#0eb2bc',
//   flex: 1,
//   width: 300,
//   borderBottomLeftRadius: borderRadius,
//   borderBottomRightRadius: borderRadius,
// },
