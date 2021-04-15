import React, { useContext } from 'react';

import { Image } from 'react-native-elements';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ThemeColors, ThemeFontFamily } from '../theme';
import { MainContext } from '../contexts/MainContext';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AppNetworkError from '../components/AppNetworkError';
import AppScreenBackground from './ui/AppScreenBackground';

import Host from '../components/host/Host';

export default function HostView({ navigation, screenProps }) {
  let { updateUserData } = useContext(MainContext);
	navigation.addListener('didFocus', payload => { updateUserData() });

  return (
    <AppScreenBackground style={{ flex: 1 }}>
      <AppNetworkError gameProcess={screenProps.gameProcess} />
      <Header navigation={navigation} />
			<Host navigation={navigation} />
      <Footer navigation={navigation} />
    </AppScreenBackground>
  );
}
