import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

import { ThemeColors, ThemeFontFamily } from '../theme';
import AppScreenBackground from './ui/AppScreenBackground';
import AppNavLine from './ui/AppNavLine';
import { MainContext } from '../contexts/MainContext';

export default ({ navigation }) => {
  let { updateUserData } = useContext(MainContext);
	navigation.addListener('didFocus', payload => { updateUserData() });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backHandler = () => {
    navigation.replace('Home');
  };

  return (
    <AppScreenBackground style={styles.wrapper}>
      <AppNavLine title="Help page" onPress={backHandler} />
      <WebView
        source={{ uri: 'https://www.getquizcast.com/app-help.html' }}
        style={{ marginTop: 20 }}
      />
    </AppScreenBackground>
  );
};

const styles = StyleSheet.create({});
