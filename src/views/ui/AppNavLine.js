import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppBackButton from './AppBackButton';
import { ThemeColors, ThemeFontFamily } from '../../theme';

export default ({ onPress, title }) => {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.leftBlock}>
          <AppBackButton onPress={onPress} />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightBlock} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: ThemeColors.orange,
    fontWeight: '500',
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },
  leftBlock: {
    marginLeft: 10,
    width: 50,
  },
  rightBlock: {
    width: 50,
    marginRight: 10,
  },
});
