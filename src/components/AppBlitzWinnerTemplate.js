import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { ThemeFontFamily } from '../theme';

const imagePath = '../../assets/img/popupBlitzDone.png';
const blitzDoneTemplate = require(imagePath);
import { icons } from '../resources';

export default function({ title, avatarSource }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={icons.winnerBg}
        style={styles.blitzTemplate}
        resizeMode="contain">
        <View style={styles.avatarWrap}>
          <LottieView
            source={avatarSource}
            // source={require('../../assets/animation/banana.json')}
            autoPlay
            loop
          />
        </View>
      </ImageBackground>
      <View style={styles.ribbonWrap}>
        <ImageBackground source={icons.ribbon} style={{}} resizeMode="stretch">
          <View style={styles.titleWrap}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const getResolution = source => {
  const { width, height } = Image.resolveAssetSource(source);
  const maxHeight = Dimensions.get('window').height;
  const maxWidth = Dimensions.get('window').width;
  const ratio = Math.min(maxWidth / width, maxHeight / height);
  return { width: width * ratio, height: height * ratio };
};

const resRibbon = getResolution(icons.ribbon);
// const resBg = getResolution(blitzDoneTemplate);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: resRibbon.width,
  },
  blitzTemplate: {
    width: resRibbon.width / 1.5,
    height: resRibbon.width / 1.3,

    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatarWrap: {
    width: resRibbon.width / 1.5,
    height: resRibbon.width / 1.5 + 30,
    marginBottom: 10,
    // backgroundColor: 'blue',
  },
  titleWrap: {
    paddingVertical: 10,
    // flexDirection: 'column',
    alignSelf: 'center',
  },
  title: {
    lineHeight: 37,
    marginBottom: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 37,
    fontWeight: '800',
    color: 'white',
    width: resRibbon.width - resRibbon.width * 0.3,
    flexWrap: 'wrap',
    fontFamily: ThemeFontFamily.NeuronBlack,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  ribbonWrap: {
    width: '100%',
    paddingHorizontal: 10,
    position: 'relative',
    top: -30,
  },
});
