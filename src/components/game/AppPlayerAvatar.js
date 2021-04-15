import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { avatars } from '../../resources';

export default ({ player }) => (
  <>
    <View style={styles.container}>
      <Image style={styles.avatar} source={avatars[player.avatar]} />
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 80,
    height: 80,
    margin: 5,
  },
});
