/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';

import { StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AppNetworkError from '../components/AppNetworkError';
import AppScreenBackground from './ui/AppScreenBackground';
import ActionCard from '../components/ActionCard/ActionCard';
import { MainContext } from '../contexts/MainContext';

import tournamentImage from './images/tournament.jpg';
import pubquizImage from './images/pubquiz.jpg';

import PushNotification from 'react-native-push-notification';
export default function Main({ navigation, screenProps }) {
  let {
    updateUserData,
    setNotificationToken,
    setNotificationCount,
    notificationCount,
  } = useContext(MainContext);

  navigation.addListener('didFocus', payload => {
    updateUserData();
  });

  useEffect(() => {
    //TODO: EXAMPLE OF SETTING BADGE NUMBER IN IOS
    PushNotification.getApplicationIconBadgeNumber(function(number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    PushNotification.configure({
      onRegister: function(token) {
        //TODO: SAVE THIS TOKEN TO THE DATABASE WHEN RECEIVED IF USER IS LOGGED IN IN PROFILE
        console.log('NOTIFICATION TOKEN:', token);
        setNotificationToken(token.token);
      },

      onNotification: function(notification) {
        console.log('NOTIFICATION RECEIVED/OPENED:', notification);
        setNotificationCount(notification.data.notificationCount);
      },
    });

    PushNotification.popInitialNotification(notification => {
      if (notification) {
        if (notification.data.notificationCount > 1) {
          setNotificationCount(notification.data.notificationCount);
        }
        let link = JSON.parse(notification.data.link);
        if (link) {
          let linkRoute =
            link.screen.charAt(0).toUpperCase() + link.screen.slice(1);
          navigation.navigate(linkRoute, { ...link });
        }
      }
    });
  }, []);

  return (
    <AppScreenBackground style={{ flex: 1, position: 'relative' }}>
      <AppNetworkError gameProcess={screenProps.gameProcess} />
      <Header navigation={navigation} />
      <ScrollView style={styles.cardsWrapper}>
        <ActionCard
          navigation={navigation}
          image={pubquizImage}
          propStyles={styles.pubquizCard}
          title={'Pubquiz game'}
          onPress={() =>
            navigation.navigate('QuizzesList', { quizesType: 'pubquizes' })
          }
          description={['Play trivia at your favorite pub and win prizes.']}
        />

        <ActionCard
          navigation={navigation}
          image={tournamentImage}
          title={'Play online'}
          onPress={() =>
            navigation.navigate('QuizzesList', { quizesType: 'tournaments' })
          }
          description={[
            'Play trivia online with your friends or random players around the world.',
          ]}
        />
      </ScrollView>
      <Footer navigation={navigation} />
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  cardsWrapper: {
    padding: wp('4%'),
  },
  pubquizCard: {
    marginBottom: wp('6%'),
  },
});
