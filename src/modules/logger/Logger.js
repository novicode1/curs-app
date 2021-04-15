import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Overlay, Text } from 'react-native-elements';

const isNormalObject = obj => typeof obj === 'object' && obj !== null;

export default function({ data, setter }) {
  if (!data) {
    return <></>;
  }

  const lines = Object.entries(data).map(printElements);

  function printElements([key, v]) {
    let value = isNormalObject(v) ? JSON.stringify(v) : v;
    value = value === null ? 'null' : value.toString();

    return (
      <Text style={styles.line} key={key}>
        {key}: {value}
      </Text>
    );
  }

  return (
    <Overlay isVisible={true} onBackdropPress={() => setter(null)}>
      <View style={styles.container}>{lines}</View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  line: {
    fontSize: 12,
  },
  container: {
    padding: 20,
  },
});
