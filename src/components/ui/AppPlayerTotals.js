import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AppPlayerAvatar from './AppPlayerAvatar';
import { ThemeColors, ThemeFontFamily } from '../../theme';

export default ({ cupSource, avatarSource, player, style }) => {
  const { avatar, points, isHost, isCurrent } = player;
  const name = avatar.charAt(0).toUpperCase() + avatar.slice(1);

  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <AppPlayerAvatar
        style={styles.appPlayerAvatar}
        avatar={avatarSource}
        isHost={isHost}
        isCurrent={isCurrent}
      />
      <View style={styles.backgroundLine}>
        {cupSource && (
          <Image
            source={cupSource}
            style={styles.cupImage}
            resizeMode="contain"
          />
        )}
        <View style={styles.nameWrap}>
          <Text style={styles.nameText}>{name}</Text>
        </View>

        <View style={styles.pointsWrap}>
          <Text style={styles.pontsText}>{points.toString()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  backgroundLine: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 17,
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-around',
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
    paddingLeft: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  appPlayerAvatar: {
    alignSelf: 'center',
    position: 'relative',
    left: 5,
    zIndex: 1,
  },
  cupImage: {
    width: 70,
    maxHeight: 50,
  },
  nameWrap: {
    alignSelf: 'center',
  },
  nameText: {
    textTransform: 'uppercase',
    fontSize: 30,
    fontWeight: '800',
    flexWrap: 'wrap',
    maxWidth: 170,
    color: ThemeColors.blue,
    fontFamily: ThemeFontFamily.NeuronBlack,
  },
  pointsWrap: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
  },
  pontsText: {
    color: ThemeColors.orange,
    fontSize: 35,
    marginRight: 20,
    fontWeight: '800',
    fontFamily: ThemeFontFamily.NeuronBlack,
  },
});
