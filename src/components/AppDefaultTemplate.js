import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../theme';

export default function({ timerCount, title, avatarSource, iconSource }) {
  const hasTimer = Boolean(timerCount);
  const timerElement = <Text style={styles.timer}>{timerCount}</Text>;

  const iconElement = (
    <Image source={iconSource} style={styles.icon} resizeMode="contain" />
  );

  const avatarElement = (
    <Image source={avatarSource} style={styles.avatar} resizeMode="contain" />
  );

  return (
    <View style={styles.overlayStyle}>
      <View style={styles.container}>
        {hasTimer && timerElement}
        {avatarSource && avatarElement}
        <Text style={styles.title}>{title}</Text>
        {iconSource && iconElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  avatar: {
    height: 200,
    width: 200,
  },
  timer: {
    textAlign: 'center',
    fontSize: 90,
    color: ThemeColors.blue,
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },
  icon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  overlayStyle: {
    borderRadius: 25,
    borderWidth: 10,
    borderColor: ThemeColors.blue,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 60,
    fontWeight: '900',
    marginBottom: 15,
    marginTop: 15,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: ThemeColors.orange,
    fontFamily: ThemeFontFamily.NeuronBlack,
    lineHeight: 54,
  },
});
