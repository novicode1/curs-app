/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';
import { MainContext } from '../../contexts/MainContext';
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { getTournamentHosts, getPubquizHosts } from '../../api/session';
import distance from '../../utils/distance';
import quizCard from '../quizCard.style';
import tabs from '../tabs.style';
import quizzesListStyle from './quizzes-list.style';

export default function QuizzesListView({ navigation }) {
  let [tabName, setTabName] = useState('filter');
  let [filter, setFilter] = useState('most-recent');
  let [isError, setIsError] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');
  let [loading, setLoading] = useState(true);
  let {
    user,
    getLatestLocationOrFallback,
    latestLocation,
    updateGeolocation,
  } = useContext(MainContext);
  let [showSortDropdown, setShowSortDropdown] = useState(false);
  let [tournaments, setTournaments] = useState([]);
  let [pubquizes, setPubquizes] = useState([]);

  let quizesType =
    navigation.state.params && navigation.state.params.quizesType;

  function doLoadQuizes() {
    setIsError(false);
    setLoading(true);
    setErrorMessage('');

    var location = getLatestLocationOrFallback();

    if (quizesType === 'tournaments') {
      getTournamentHosts(filter, location)
        .then(result => {
          setTournaments(result);
          setLoading(false);
        })
        .catch(x => {
          setIsError(true);
          setErrorMessage(
            'Failed to load tournaments. Try again later.\n\n' + x,
          );
        });
    }
    if (quizesType === 'pubquizes') {
      console.log('getPubquizHosts', user.latestLocation, user);

      if (!location) {
        setIsError(true);
        setErrorMessage('Please enable the GPS to find the pubquizes nearby.');
        updateGeolocation();
      } else {
        getPubquizHosts(filter, location)
          .then(result => {
            setPubquizes(result);
            setLoading(false);
          })
          .catch(x => {
            setIsError(true);
            setErrorMessage(
              'Failed to load pubquizes. Try again later.\n\n' + x,
            );
          });
      }
    }
  }

  useEffect(() => {
    console.log('Filter change effect ', filter, latestLocation);
    navigation.setParams({
      showBackButton: true,
    });

    doLoadQuizes();
  }, [filter]);

  function updateFilter(filterName) {
    setFilter(filterName);
  }

  function pubquizItem(item) {
    return (
      <View style={[styles.card, styles.cardWrapper]} key={item._id}>
        <View style={styles.cardRow}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View style={styles.cardRow}>
          <Image
            source={require('../../../assets/img/location.png')}
            style={styles.rowIcon}
            resizeMode="contain"
          />
          <Text style={styles.itemDistance}>
            {user.latestLocation
              ? distance(
                  [
                    user.latestLocation.coordinates[0],
                    user.latestLocation.coordinates[1],
                  ],
                  [item.location.coordinates[0], item.location.coordinates[1]],
                )
              : 0}{' '}
            km
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

  function tournamentItem(item) {
    return (
      <View style={[styles.card, styles.cardWrapper]} key={item._id}>
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

  function loadingSkeleton(props) {
    return (
      <ContentLoader
        width={wp(100)}
        viewBox={'0 0 400 130'}
        height="130"
        backgroundColor="#f0f0f0"
        foregroundColor="#dedede">
        <Rect x="0" y="105" rx="0" ry="0" width="160" height="9" />
        <Rect x="0" y="120" rx="0" ry="0" width="160" height="6" />
        <Rect x="0" y="0" rx="0" ry="0" width="160" height="100" />
        <Rect x="190" y="105" rx="0" ry="0" width="160" height="9" />
        <Rect x="190" y="120" rx="0" ry="0" width="160" height="6" />
        <Rect x="190" y="0" rx="0" ry="0" width="160" height="100" />
      </ContentLoader>
    );
  }

  function renderItems() {
    if (!isError) {
      if (loading) {
        return loadingSkeleton();
      } else {
        if (quizesType === 'tournaments') {
          return tournaments.length > 0 ? (
            tournaments.map(item => tournamentItem(item))
          ) : (
            <View style={quizzesListStyle.emptyList}>
              <Text>
                No online tournaments in your area so far. Come back later.
              </Text>
            </View>
          );
        }

        if (quizesType === 'pubquizes') {
          return pubquizes.length > 0 ? (
            pubquizes.map(item => pubquizItem(item))
          ) : (
            <View style={quizzesListStyle.emptyList}>
              <Text>No pubquizes nearby so far. Come back later to play.</Text>
            </View>
          );
        }
      }
    } else {
      return (
        <View style={quizzesListStyle.emptyList}>
          <Text style={quizzesListStyle.emptyListText}>{errorMessage}</Text>
          <Button title="Try Again" onPress={doLoadQuizes} />
        </View>
      );
    }
  }

  return (
    <View style={styles.tournamentsSection}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          All {quizesType === 'pubquizes' ? 'Pubquizes' : 'Tournaments'}:
        </Text>
        {/* {!loading && (
          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => {
              setShowSortDropdown(!showSortDropdown);
            }}>
            <Text style={styles.expandButtonText}>Sort by</Text>
            <Image
              source={require('./images/triangle.png')}
              style={[
                styles.expandButtonIcon,
                showSortDropdown ? styles.expandButtonIconOpened : {},
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )} */}

        {/* <TouchableOpacity
					style={styles.filterDropdownButton}
					onPress={() => {
						navigation.navigate('TournamentsGrid');
					}}>
					<Image
						source={require('./images/filter.png')}
						style={styles.filterDropdownButtonIcon}
						resizeMode="contain"
					/>
				</TouchableOpacity> */}
      </View>

      {showSortDropdown && (
        <View style={styles.dropdownWrapper}>
          {/* <Tabs
						selected={tabName}
						style={styles.tabsWrapper}
						selectedIconStyle={styles.selectedTab}
						selectedStyle={styles.selectedTabTitle}
						iconStyle={styles.tab}
						onSelect={el => setTabName(el.props.name)}>
						<Text name="category" style={styles.tabTitle}>
							category
						</Text>
						<Text name="filter" style={styles.tabTitle}>
							filter
						</Text>
					</Tabs> */}

          <View style={styles.filtersList}>
            {tabName === 'filter' && (
              <React.Fragment>
                {quizesType === 'pubquizes' && (
                  <TouchableOpacity
                    style={[
                      styles.filterButton,
                      filter === 'proximity' ? styles.filterButtonActive : {},
                    ]}
                    name="proximity"
                    onPress={el => updateFilter('proximity')}>
                    <Text style={styles.filterButtonText}>Proximity</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    filter === 'most-people' ? styles.filterButtonActive : {},
                  ]}
                  name="most-people-in-the-leaderboards"
                  onPress={el => updateFilter('most-people')}>
                  <Text style={styles.filterButtonText}>
                    Most people in the leaderboards
                  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={[
                    styles.filterButton,
                    filter === 'most-people-online'
                      ? styles.filterButtonActive
                      : {},
                  ]}
                  name="most-people-online"
                  onPress={el => updateFilter('most-people-online')}>
                  <Text style={styles.filterButtonText}>
                    Most people online
                  </Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    filter === 'most-recent' ? styles.filterButtonActive : {},
                  ]}
                  name="most-recent"
                  onPress={el => updateFilter('most-recent')}>
                  <Text style={styles.filterButtonText}>Most recent</Text>
                </TouchableOpacity>
              </React.Fragment>
            )}

            {/* {tabName === 'category' && (
							<React.Fragment>
								<Text style={{fontSize:20, fontFamily: ThemeFontFamily.NeuronDemiBold}}>Category tab</Text>
							</React.Fragment>
						)} */}
          </View>
        </View>
      )}

      <SafeAreaView style={styles.cardsList}>{renderItems()}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  ...quizzesListStyle,
  ...tabs,
  ...quizCard,
});
