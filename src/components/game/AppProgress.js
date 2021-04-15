import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { ThemeColors, ThemeFontFamily } from '../../theme';
import { icons } from '../../resources';

export default function({ time, isBlitz }) {
  const [counter, setCounter] = useState({ progress: 1, seconds: time });

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(({ progress, seconds }) => {
        if (progress <= 0) {
          clearInterval(timer);
          return { progress, seconds };
        }

        const step = 1 / time;
        const newProgress = Number((progress - step).toFixed(2));
        const newSeconds = seconds - 1;
        return { progress: newProgress, seconds: newSeconds };
      });
    }, 1000);

    return () => {
      console.log('timer unload');
      clearInterval(timer);
    };
  }, []);

  const imageSource = isBlitz ? icons.timerLighting : icons.timerClock;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.timerWrap}>
          <View style={[styles.iconWrap, isBlitz ? styles.blitzIconWrap : {}]}>
            <Image style={styles.icon} source={imageSource} />
          </View>
          <ProgressBar
            progress={counter.progress}
            color={isBlitz ? ThemeColors.orangeDarken : ThemeColors.blue}
            height={9}
            style={styles.progressBar}
          />
        </View>
        <Text style={[styles.timeText, isBlitz ? styles.blitzTimeText : {}]}>
          Time: {counter.seconds}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
  },
  progressContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    margin: 5,
  },
  progressBar: {
    borderColor: 'white',
    backgroundColor: 'white',
    position: 'relative',
    left: -10,
  },
  timeText: {
    color: ThemeColors.blue,
    fontWeight: '600',
    fontSize: 19,
    position: 'relative',
    top: -15,
    fontFamily: ThemeFontFamily.NeuronDemiBold,
  },
  blitzTimeText: {
    color: ThemeColors.orangeDarken,
  },
  iconWrap: {
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 2,
    padding: 2,
    borderColor: ThemeColors.blue,
    zIndex: 1,
  },
  blitzIconWrap: {
    borderColor: ThemeColors.orangeDarken,
  },
});
