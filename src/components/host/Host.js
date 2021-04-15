/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';

import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Tabs from 'react-native-tabs';
import tabs from '../tabs.style';
import table from '../table.style';
import hostStyle from './host.style';
import BottomContainer from './BottomContainer';
import RankingModal from './RankingModal';

import {
  getHostQuizes,
  getHost,
  getRankingList,
  getUserRanking,
  subscribeOnHost,
} from '../../api/session';
import distance from '../../utils/distance';
import { MainContext } from '../../contexts/MainContext';

import { ThemeColors, ThemeFontFamily } from '../../theme';
const moment = require('moment');

export default function HostView({ navigation }) {
  let [maxQuizesInList, setMaxQuizesInList] = useState(3);
  let [loading, setLoading] = useState(true);
  let [rankingLoading, setRankingLoading] = useState(true);

  let [quizes, setQuizes] = useState([]);
  let [rankingModal, toggleRankingModal] = useState(false);

  let [currentQuiz, setCurrentQuiz] = useState({
    endDate: null,
    startDate: null,
    distance: '',
  });

  const maxUsersInList = 5;
  let [tabName, setTabName] = useState('history');

  let hostId = navigation.state.params && navigation.state.params.hostId;
  let hostType = navigation.state.params && navigation.state.params.hostType;

  let storeUser = useContext(MainContext).user;
  let { latestLocation } = useContext(MainContext);
  let [user, setUser] = useState(useContext(MainContext).user);

  let [host, setHost] = useState({});

  let [users, setUsers] = useState([]);

  function retryGeolocation() {
    MainContext.updateGeolocation();
  }

  function searchCurrentQuiz() {
    if (currentQuiz.endDate || !hostType) {
      return;
    }

    for (let quiz of quizes) {
      if (moment(quiz.endDate) > moment()) {
        setCurrentQuiz(quiz);

        getRankingList(hostType, quiz._id, maxUsersInList)
          .then(result => {
            console.log('Ranking list loaded', result);
            //setUsers(result);
            setRankingLoading(false);
          })
          .catch(err =>
            console.warn(`Error in getRankingList: ${err.message}`),
          );

        getUserRanking(hostType, quiz._id, storeUser._id)
          .then(userRanking => {
            setUser({ ...user, ...userRanking });
          })
          .catch(err =>
            console.warn(`Error in getUserRanking: ${err.message}`),
          );

        setTabName('ranking-board');

        break;
      }
    }
  }

  useEffect(() => {
    console.log(`Loading host details for ${hostId} ${hostType}...`);

    getHost(hostId, hostType)
      .then(result => {
        setHost(result);
        if (result.ranking) {
          console.log('Got ranking list from the host details');
          setUsers(result.ranking);
          setRankingLoading(false);
        }
        setUser({ ...user, ...result.ranking });
        setLoading(false);
      })
      .catch(err => console.warn(`Error in getHost: ${err.message}`));

    navigation.setParams({
      showBackButton: true,
    });

    getHostQuizes(hostId, hostType)
      .then(setQuizes)
      .catch(err => console.log(`Error in getHostQuizes: ${err.message}`));
  }, [hostId, hostType]);

  useEffect(() => {
    if (hostType && user._id) {
      if (quizes.length) {
        searchCurrentQuiz();
      } else {
        setRankingLoading(false);
      }
    }
  }, [hostType, user._id, quizes]);

  let userItem = (item, index, type) => {
    console.log(item.playerId);
    if (user.playerId && item.playerId._id === user.playerId._id) {
      type = 'primaryRow';
    }
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile', { profileId: item.playerId._id });
        }}
        style={[
          styles.endedQuiz,
          index % 2 === 0 ? styles.tableEverySecondChild : {},
          styles[type],
        ]}
        key={index}>
        <View style={[styles.tableTextColumn, styles.tableRankingColumn]}>
          <Text style={[styles.tableText, styles[type]]}>{index}</Text>
        </View>
        <View style={[styles.tableTextColumn, styles.tableUserNameColumn]}>
          <Text style={[styles.tableText, styles[type]]}>
            {item.playerId.fullName}
          </Text>
        </View>
        <View style={[styles.tableTextColumn, styles.tableScoreColumn]}>
          <Text style={[styles.tableText, styles[type]]}>{item.score}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  let quizItem = (item, rankingPosition, type) => {
    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => {
          navigation.navigate('PubquizResults', { quizData: item, quizType: hostType, hostData: host });
        }}
        style={[
          styles.endedQuiz,
          rankingPosition % 2 === 0 ? styles.tableEverySecondChild : {},
        ]}>
        <View style={[styles.tableTextColumn, styles.tableDateColumn]}>
          <Text style={styles.tableText}>
            {moment(item.endDate).format('DD.MM')}
          </Text>
        </View>
        <View style={[styles.tableTextColumn, styles.tableCategoryColumn]}>
          <Text style={styles.tableText}>{item.name}</Text>
        </View>
        <View style={[styles.tableTextColumn, styles.tableWinnerColumn]}>
          <Text style={styles.tableText}>{item.winner}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  let interval = moment.duration(
    moment(currentQuiz.endDate).diff(moment(currentQuiz.startDate)),
  );
  let duration = Math.floor(interval.asDays()) + ' days';

  function rankingTab() {
    let userAlreadyInList;
    if (user.playerId) {
      userAlreadyInList = users.find(userRanking => {
        return userRanking.playerId._id === user.playerId._id;
      });
      console.log('User is already in list: ', userAlreadyInList);
    }

    return (
      <View style={styles.tableWrapper}>
        {rankingModal && currentQuiz && (
          <RankingModal
            currentQuizId={currentQuiz._id}
            hostType={hostType}
            userItem={userItem}
            toggleRankingModal={toggleRankingModal}
          />
        )}
        <ScrollView style={styles.table}>
          {users.length > 0 ? (
            users.map((item, index) => userItem(item, index + 1))
          ) : (
            <Text style={styles.noUsersText}>
              No users in the game. Be the first to the top!
            </Text>
          )}

          {user.gameRankingPosition && !userAlreadyInList
            ? userItem(user, user.rankingPosition + 1)
            : React.Fragment}
        </ScrollView>

        {users.length >= maxUsersInList ? (
          <TouchableOpacity
            style={styles.expandTableButton}
            onPress={() => {
              toggleRankingModal(true);
            }}>
            <Text style={styles.expandTableButtonText}>
              {users.length > maxUsersInList ? 'Hide' : 'Expand'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  function historyTab() {
    const pastQuizes = quizes
      .filter((item, index) => moment(item.endDate) < moment())
      .slice(0, maxQuizesInList);

    return (
      <View style={styles.tableWrapper}>
        <ScrollView>
          <View style={styles.tableTitleWrapper}>
            <View style={[styles.tableColumn, styles.tableDateColumn]}>
              <Image
                source={require('../../../assets/img/tabs/date.png')}
                style={styles.tableColumnIcon}
                resizeMode="contain"
              />
              <Text style={styles.tableColumnTitle}>Closed</Text>
            </View>

            <View style={[styles.tableColumn, styles.tableCategoryColumn]}>
              <Image
                source={require('../../../assets/img/tabs/date.png')}
                style={styles.tableColumnIcon}
                resizeMode="contain"
              />
              <Text style={styles.tableColumnTitle}>Category</Text>
            </View>

            <View style={[styles.tableColumn, styles.tableWinnerColumn]}>
              <Image
                source={require('../../../assets/img/tabs/trophy.png')}
                style={styles.tableColumnIcon}
                resizeMode="contain"
              />
              <Text style={styles.tableColumnTitle}>Winner</Text>
            </View>
          </View>

          <ScrollView style={styles.table}>
            {pastQuizes && pastQuizes.length > 0
              ? pastQuizes.map((item, index) => quizItem(item, index))
              : null}
          </ScrollView>

          {(!pastQuizes || pastQuizes.length === 0) && (
            <View style={styles.emptyQuizList}>
              <Text>No past quizes.</Text>
            </View>
          )}
        </ScrollView>

        {quizes.length >= 5 ? (
          <TouchableOpacity
            style={styles.expandTableButton}
            onPress={() => {
              setMaxQuizesInList(
                quizes.length > maxQuizesInList ? maxQuizesInList + 1000 : 3,
              );
            }}>
            <Text style={styles.expandTableButtonText}>
              {quizes.length > maxQuizesInList ? 'Hide' : 'Expand'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  function tabsSection() {
    return (
      <View style={styles.tabsSection}>
        <Tabs
          selected={tabName}
          style={styles.tabsWrapper}
          selectedIconStyle={[styles.selectedTab, styles.selectedTabWrapper]}
          selectedStyle={styles.selectedTabTitle}
          iconStyle={styles.tab}
          onSelect={el => setTabName(el.props.name)}>
          {currentQuiz.endDate && (
            <Text name="ranking-board" style={styles.tabTitle}>
              Ranking board
            </Text>
          )}
          <Text name="history" style={styles.tabTitle}>
            History
          </Text>
        </Tabs>

        {tabName === 'ranking-board' && currentQuiz.endDate && rankingTab()}

        {tabName === 'history' && historyTab()}
      </View>
    );
  }

  function tabsSkeleton() {
    return (
      <ContentLoader viewBox="0 0 400 360" height={360} width={wp(100)}>
        <Rect x="10" y="3" rx="4" ry="4" width="180" height="30" />
        <Rect x="10" y="40" rx="4" ry="4" width="380" height="10" />
        <Rect x="10" y="55" rx="4" ry="4" width="380" height="10" />
        <Rect x="10" y="60" rx="4" ry="4" width="380" height="10" />
        <Rect x="10" y="75" rx="4" ry="4" width="380" height="10" />
        <Rect x="10" y="90" rx="4" ry="4" width="380" height="10" />
        <Rect x="10" y="105" rx="4" ry="4" width="380" height="10" />
      </ContentLoader>
    );
  }

  let isFollowing =
    host && host.subscribers
      ? host.subscribers.some(subscriberId => {
          return subscriberId === user._id;
        })
      : false;

  function subscribeAction() {
    subscribeOnHost(hostId, !isFollowing, hostType, user._id)
      .then(newHostData => {
        setHost({ ...host, ...newHostData });
      })
      .catch(error => {
        console.log(error);
      });
  }

  function renderHostDetails() {
    return (
      <React.Fragment>
        <View style={styles.quizesSection}>
          <View
            style={[
              styles.titleWrapper,
              !currentQuiz.endDate ? styles.titleWrapperMarginBottom : {},
            ]}>
            <Text style={styles.title}>
              {currentQuiz.name ? currentQuiz.name : host.name}
            </Text>
            {console.log('User latest location: ', latestLocation)}
            {host.location && latestLocation && (
              <View style={styles.locationButton}>
                <Image
                  source={require('./images/map-location.png')}
                  style={styles.locationButtonIcon}
                  resizeMode="contain"
                />
                <Text style={styles.locationButtonText}>
                  {distance(
                    [
                      latestLocation.coordinates[0],
                      latestLocation.coordinates[1],
                    ],
                    [
                      host.location.coordinates[0],
                      host.location.coordinates[1],
                    ],
                  )}
                  <Text style={styles.distanceMetricSystem}>km</Text>
                </Text>
              </View>
            )}
          </View>

          {currentQuiz.endDate && (
            <View style={styles.currentQuizDetails}>
              <View
                style={[
                  styles.quizDetailsRow,
                  currentQuiz.category ? styles.borderSeparator : '',
                ]}>
                <Text style={styles.quizFinishDate}>
                  <Text style={styles.boldText}>Finishes:</Text>{' '}
                  {moment(currentQuiz.endDate).fromNow(false)}
                </Text>

                <Text style={styles.quizDuration}>
                  <Text style={styles.boldText}>Duration:</Text> {duration}
                </Text>
              </View>

              {currentQuiz.category && (
                <View style={styles.quizDetailsRow}>
                  <Text style={styles.quizCategory}>
                    <Text style={styles.boldText}>Category:</Text>{' '}
                    {currentQuiz.category}
                  </Text>
                </View>
              )}
            </View>
          )}

          {!rankingLoading ? tabsSection() : tabsSkeleton()}

          {!latestLocation && (
            <View style={styles.quizGpsWarning}>
              <Text>
                Please enable the GPS geolocation to checkin and play.
              </Text>
              <Button title="Try Again" onPress={retryGeolocation} />
            </View>
          )}
        </View>
        {latestLocation && (
          <BottomContainer
            onlinePlayers={host.onlinePlayers}
            navigation={navigation}
            currentQuizId={currentQuiz._id}
            isCurrentQuiz={currentQuiz.endDate ? true : false}
            hostLocation={host.location ? host.location.coordinates : null}
            isInaccessibleThruDistance={
              host.location
                ? distance(
                    [
                      latestLocation.coordinates[0],
                      latestLocation.coordinates[1],
                    ],
                    [
                      host.location.coordinates[0],
                      host.location.coordinates[1],
                    ],
                  ) > host.locationProximity
                  ? true
                  : false
                : false
            }
            isFollowing={isFollowing}
            subscribeAction={subscribeAction}
          />
        )}
      </React.Fragment>
    );
  }

  function renderHostSkeleton() {
    return (
      <ContentLoader viewBox="0 0 400 360" height={360} width={wp(100)}>
        <Rect x="10" y="3" rx="4" ry="4" width="380" height="30" />
        <Rect x="10" y="40" rx="4" ry="4" width="380" height="10" />
        <Rect x="10" y="55" rx="4" ry="4" width="380" height="10" />
        <Rect x="10" y="79" rx="4" ry="4" width="380" height="200" />
      </ContentLoader>
    );
  }

  return loading ? renderHostSkeleton() : renderHostDetails();
}

const styles = StyleSheet.create({
  ...hostStyle,
  ...table,
  ...tabs,
});
