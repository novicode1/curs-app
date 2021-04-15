import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';
import { avatars } from '../../resources';

export default ({ avatar, avatarName, isHost, isCurrent, points, style }) => {
  const [resolution, setResolution] = useState({ width: 100, height: 100 });

  const detectResolution = event => {
    const { width, height } = event.nativeEvent.layout;
    setResolution({ width, height });
  };

  const hostLabel = (
    <View style={styles.label}>
      <Text style={[styles.hostText, styles.labelText]}>Host</Text>
    </View>
  );

  const currentLabel = (
    <View style={styles.label}>
      <Text style={[styles.currentText, styles.labelText]}>Me</Text>
    </View>
  );

  const pointsLabel = (
    <View style={styles.pointsLabel}>
      <Text style={styles.pointsText}>{Number(points)}</Text>
    </View>
  );
  const showPoints = points !== undefined ? pointsLabel : null;

  const playerAvatar = avatar || avatars[avatarName];

  // const getLabel = (
  //   <View style={styles.label}>
  //     {isHost && <Text style={[styles.currentText, styles.labelText]}>Me</Text>}
  //     {isCurrent && (
  //       <Text style={[styles.hostText, styles.labelText]}>Host</Text>
  //     )}
  //   </View>
  // );

  return (
    <View
      onLayout={detectResolution}
      style={{ ...styles.playerWrapper, ...style }}>
      <Image
        key={1}
        resizeMode="contain"
        style={styles.image}
        source={avatar ? {
					uri: avatar
				} : playerAvatar}
      />
      {showPoints}
      {isHost ? hostLabel : isCurrent ? currentLabel : null}
    </View>
  );
};

const styles = StyleSheet.create({
  playerWrapper: {
    borderWidth: 5,
    borderRadius: 20,
    borderColor: ThemeColors.blue,
    alignSelf: 'baseline',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,
    height: 72,
    width: 72,
  },
  label: {
    backgroundColor: ThemeColors.blue,
    paddingVertical: 1,
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 2,
    flexDirection: 'row',
  },
  hostText: {
    color: 'white',
  },
  currentText: {
    color: 'yellow',
    paddingRight: 4,
  },
  labelText: {
    fontWeight: '800',
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily: ThemeFontFamily.NeuronBlack,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 15,
  },
  pointsLabel: {
    backgroundColor: ThemeColors.blue,
    paddingVertical: 7,
    paddingHorizontal: 12,
    textAlign: 'center',
    position: 'absolute',
    bottom: -8,
    right: -8,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pointsText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 17,
    fontFamily: ThemeFontFamily.NeuronBlack,
  },
});
