import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';

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

import { getTournamentHosts } from '../../api/session';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Carousel from 'react-native-snap-carousel';
import styles from './slider.style';

const SLIDER_WIDTH = Dimensions.get('window').width;

export default function TournamentsSection({ navigation }) {
  let [tournaments, setTournaments] = useState([
    {
      category: 'Loading',
      type: '',
      totalPlayers: 0,
      onlinePlayers: 0,
    },
  ]);

  useEffect(() => {
    getTournamentHosts()
      .then(setTournaments)
      .catch(err =>
        console.warn(`Error in getTournamentHosts: ${err.message}`),
      );
  }, []);

  function renderItem({ item, index }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={styles.itemName}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.itemSubtitle}>
            {item.name && item.name.length > 20
              ? item.name.slice(0, 20) + '...'
              : item.name}
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Image
            source={require('../../../assets/img/user.png')}
            style={styles.rowIcon}
            resizeMode="contain"
          />
          <View style={styles.rowTextWrapper}>
            <Text style={styles.itemTotalPlayers}>
              {item.totalPlayers ? item.totalPlayers : 0} played
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
              hostType: 'tournament',
            });
          }}>
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.sliderSection, styles.tournamentsSection]}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Tournaments:</Text>

        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => {
            navigation.navigate('QuizzesList', { quizesType: 'tournaments' });
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
            data={tournaments}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={wp('40%')}
            renderItem={renderItem.bind(this)}
            activeSlideAlignment="start"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
