import React, { useContext } from 'react';

import { Image } from 'react-native-elements';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { MainContext } from '../contexts/MainContext';
import { ThemeColors, ThemeFontFamily } from '../theme';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AppNetworkError from '../components/AppNetworkError';
import AppScreenBackground from './ui/AppScreenBackground';

import EditField from '../components/edit-field/EditField';

export default function EditFieldView({ navigation, screenProps }) {
  let { updateUserData } = useContext(MainContext);
	navigation.addListener('didFocus', payload => { updateUserData() });

  return (
    <AppScreenBackground style={{ flex: 1 }}>
      <AppNetworkError gameProcess={screenProps.gameProcess} />
      <Header navigation={navigation} />
			<EditField navigation={navigation} />
      <Footer navigation={navigation} />
    </AppScreenBackground>
  );
}
