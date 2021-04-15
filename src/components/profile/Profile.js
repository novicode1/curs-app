/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { getUserGamesHistory, getUser } from '../../api/profile';

import UserInfo from './UserInfo';
import AvatarContainer from '../AvatarContainer';
import tabs from '../tabs.style';
import table from '../table.style';
import titleWrapper from '../titleWrapper.style';

import { ThemeColors, ThemeFontFamily } from '../../theme';
import { MainContext } from '../../contexts/MainContext';

import profileStyle from './profile.style';
const moment = require('moment');

export default function Profile({ navigation }) {
  let [maxQuizzesInList, setMaxQuizzesInList] = useState(3);
  let routeProfileId =
    navigation.state.params && navigation.state.params.profileId;
  let [user, setUser] = useState(
    routeProfileId ? {} : useContext(MainContext).user,
  );

  let [quizzes, setQuizzes] = useState([
    {
      endDate: null,
      score: 0,
    },
  ]);

  useEffect(() => {
    getUser({ userId: routeProfileId })
      .then(setUser)
      .catch(err => console.warn(`Error in getUser: ${err.message}`));

    getUserGamesHistory(routeProfileId ? routeProfileId : user._id)
      .then(setQuizzes)
      .catch(err =>
        console.warn(`Error in getUserGamesHistory: ${err.message}`),
      );

    navigation.setParams({
      showBackButton: true,
      hideHeaderAvatar: true,
    });
  }, [routeProfileId]);

  let tournamentItem = (item, index) => {
    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => {
          navigation.navigate('PubquizResults');
        }}
        style={[
          styles.endedQuiz,
          index % 2 === 0 ? styles.tableEverySecondChild : {},
        ]}>
        <View style={[styles.tableTextColumn, styles.tableDateColumn]}>
          <Text style={styles.tableText}>
            {moment(item.gameDate).format('MM.DD')}
          </Text>
        </View>
        <View style={[styles.tableTextColumn, styles.tableCategoryColumn]}>
          <Text style={styles.tableText}>
            {item.pubquizId
              ? item.pubquizId.name
              : item.tournamentId
              ? item.tournamentId.name
              : ''}
          </Text>
        </View>
        <View style={[styles.tableTextColumn, styles.tableScoreColumn]}>
          <Text style={styles.tableText}>{item.score}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <AvatarContainer
        propStyles={styles.userAvatar}
        avatar={user ? user.photoUrl : null}
      />

      <UserInfo user={user} navigation={navigation} />

      <View style={styles.quizzesSection}>
        <View style={styles.tabsSection}>
          <Text style={styles.tableTitle}>Game history</Text>

          <View style={styles.tableWrapper}>
            <ScrollView>
              <View style={styles.tableTitleWrapper}>
                <View style={[styles.tableColumn, styles.tableDateColumn]}>
                  <Image
                    source={require('../../../assets/img/tabs/date.png')}
                    style={styles.tableColumnIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.tableColumnTitle}>Date</Text>
                </View>

                <View style={[styles.tableColumn, styles.tableCategoryColumn]}>
                  <Image
                    source={require('../../../assets/img/tabs/pie-chart.png')}
                    style={styles.tableColumnIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.tableColumnTitle}>Category</Text>
                </View>

                <View style={[styles.tableColumn, styles.tableScoreColumn]}>
                  <Image
                    source={require('../../../assets/img/tabs/trophy.png')}
                    style={styles.tableColumnIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.tableColumnTitle}>Score</Text>
                </View>
              </View>

              <ScrollView style={styles.table}>
                {quizzes
                  .slice(0, maxQuizzesInList)
                  .map((item, index) => tournamentItem(item, index))}
              </ScrollView>
            </ScrollView>

            {quizzes.length > 3 ? (
              <TouchableOpacity
                style={styles.expandTableButton}
                onPress={() => {
                  setMaxQuizzesInList(
                    quizzes.length > maxQuizzesInList
                      ? maxQuizzesInList + 1000
                      : 3,
                  );
                }}>
                <Text style={styles.expandTableButtonText}>
                  {quizzes.length > maxQuizzesInList ? 'Expand' : 'Hide'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  ...titleWrapper,
  ...profileStyle,
  ...tabs,
  ...table,
});
