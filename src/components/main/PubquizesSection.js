import React, { useState, useEffect, useContext } from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { ThemeColors, ThemeFontFamily } from '../../theme';

import styles from './slider.style';

import Carousel from 'react-native-snap-carousel';

import { getPubquizHosts } from '../../api/session';
import distance from '../../utils/distance';
import { MainContext } from '../../contexts/MainContext';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SLIDER_WIDTH = Dimensions.get('window').width;

export default function PubquizesSection({ navigation }) {
  let { user } = useContext(MainContext);
  let [activeIndex, setActiveIndex] = useState(false);
  let [pubquizes, setPubquizes] = useState([
    {
      name: 'Loading',
      location: {
        coordinates: [
          user.latestLocation.coordinates[0],
          user.latestLocation.coordinates[1],
        ],
      },
      totalPlayers: 0,
      onlinePlayers: 0,
    },
  ]);

  useEffect(() => {
    getPubquizHosts()
      .then(setPubquizes)
      .catch(err => console.warn(`Error in getPubquizHosts: ${err.message}`));
  }, []);

  function renderItem({ item, index }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View style={styles.cardRow}>
          <Image
            source={require('../../../assets/img/location.png')}
            style={styles.rowIcon}
            resizeMode="contain"
          />
          {user.latestLocation && (
            <Text style={styles.itemDistance}>
              {distance(
                [
                  user.latestLocation.coordinates[0],
                  user.latestLocation.coordinates[1],
                ],
                [item.lat, item.lng],
              )}{' '}
              km
            </Text>
          )}
        </View>
        <View style={styles.cardRow}>
          <Image
            source={require('../../../assets/img/user.png')}
            style={styles.rowIcon}
            resizeMode="contain"
          />
          <View style={styles.rowTextWrapper}>
            <Text style={styles.itemTotalPlayers}>
              {item.totalPlayers ? item.totalPlayers : 0} players joined
            </Text>
            <Text style={styles.itemOnlinePlayers}>
              {item.onlinePlayers ? item.onlinePlayers : 0} online
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            navigation.navigate('Host', {
              hostId: item._id,
              hostType: 'pubquiz',
            });
          }}>
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.sliderSection}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Pubquizes near me:</Text>

        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => {
            navigation.navigate('QuizzesList', { quizesType: 'pubquizes' });
          }}>
          <Text style={styles.expandButtonText}>Show all</Text>
        </TouchableOpacity>
      </View>

      <SafeAreaView style={{ flex: 1, paddingTop: 0 }}>
        <View style={{ marginLeft: 40 }}>
          <Carousel
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            ref={ref => (this.carousel = ref)}
            data={pubquizes}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={wp('40%')}
            renderItem={renderItem.bind(this)}
            activeSlideAlignment="start"
            onSnapToItem={index => setActiveIndex(index)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
