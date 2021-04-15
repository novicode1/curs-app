import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

export default function({ question, style }) {
  return (
    <>
      <View style={{ ...styles.wrapper, ...style }}>
        <Text style={styles.title}>{question.questionTitle}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff7a',
    borderColor: ThemeColors.blue,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    justifyContent: 'center',
    minHeight: 100,
  },
  title: {
    color: '#0d6c72',
    fontWeight: '600',
    fontSize: 30,
    marginBottom: 15,
    marginTop: 15,
    fontFamily: ThemeFontFamily.NeuronDemiBold,
    textAlign: 'center',
  },
});
