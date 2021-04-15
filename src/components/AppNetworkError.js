import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import NavigationService from '../NavigationService';
import { StyleSheet, View, Text } from 'react-native';

export default function({ gameProcess }) {
  const [networkError, setNetworkError] = useState([]);
  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const status = state.isInternetReachable
        ? []
        : ['Check your network connection'];

      setNetworkError(status);
    });

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (gameProcess?.emit) {
      setNetworkError([]);
      gameProcess.emit.setErrorCallback(setNetworkError);
    }
  }, [gameProcess]);

  useEffect(() => {
    if (networkError.length) {
      const id = setTimeout(() => {
        //NavigationService.replace('Home');
      }, 5000);
      clearTimeout(timerId);
      setTimerId(id);
    } else {
      clearTimeout(timerId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkError]);

  if (!networkError.length) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      {networkError.map((message, i) => (
        <Text key={i} style={styles.text}>
          {message}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
    paddingBottom: 10,
    opacity: 1,
    position: 'absolute',
    bottom: 55,
    zIndex: 1000,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
  },
});
