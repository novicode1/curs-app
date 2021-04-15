import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import textParserStyle from './text-parser.style';
const reactStringReplace = require('react-string-replace');

export default function Profile({ text, navigation }) {
  function replaceText() {
    let replacedText = text;

    // match bold text
    replacedText = reactStringReplace(replacedText, /\*(.*)\*/gim, (match, i) => (
      <Text style={styles.boldText}>{match}</Text>
    ));

    // match links
    replacedText = reactStringReplace(
      replacedText,
      /\[(.*)\]/gim,
      (match, i) => {
        let matchArray = match.split(',');
        let linkTitle = matchArray[0];
        let linkRoute =
          matchArray[1].charAt(0).toUpperCase() + matchArray[1].slice(1);

        return (
          <Text
            onPress={() => {
              navigation.navigate(linkRoute, { profileId: matchArray[2] });
            }}
            style={styles.winnerText}>
            {linkTitle}
          </Text>
        );
      },
    );
    return replacedText;
  }

  return (
    <Text style={styles.rowText}>
      {replaceText()}
    </Text>
  );
}

const styles = StyleSheet.create({
  ...textParserStyle,
});
