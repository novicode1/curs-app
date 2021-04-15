import React, { useState, useContext } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';
import { avatars } from '../../resources';

import { MainContext } from '../../contexts/MainContext';

export default ({ avatar, avatarName, isHost, isCurrent, points, profileId, style }) => {
	let { user } = useContext(MainContext);
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

	const guestAvatar = avatars[avatar];

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
        resizeMode="cover"
        style={styles.image}
        source={guestAvatar ? guestAvatar : {
					uri: avatar
				}}
      />
      {showPoints}
      {isHost ? hostLabel : user._id === profileId ? currentLabel : null}
    </View>
  );
};

const styles = StyleSheet.create({
  playerWrapper: {
    borderWidth: 4,
    borderRadius: 16,
    borderColor: ThemeColors.blue,
    alignSelf: 'baseline',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,
    height: 64,
    width: 64,
  },
  label: {
    backgroundColor: ThemeColors.blue,
    paddingVertical: 0,
    paddingHorizontal: 5,
		borderRadius: 2,
		width: '100%',
		textAlign: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		display: 'flex',
		alignContent: 'center',
  },
  hostText: {
		color: 'white',
		alignSelf: 'center'
  },
  currentText: {
    color: 'yellow',
		paddingRight: 4,
  },
  labelText: {
    fontWeight: '800',
    textTransform: 'uppercase',
		fontSize: 16,
		textAlign: 'center',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 12,
  },
  pointsLabel: {
    backgroundColor: ThemeColors.blue,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
