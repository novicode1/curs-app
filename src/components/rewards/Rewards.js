/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';

import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';

import Tabs from 'react-native-tabs';
import titleWrapper from '../titleWrapper.style';
import tabs from '../tabs.style';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const moment = require('moment');

import { MainContext } from '../../contexts/MainContext';
import { getUserRewards } from '../../api/session';

import rewardsStyle from './rewards.style';

export default function Profile({ navigation }) {
  let { user } = useContext(MainContext);
  let [loading, setLoading] = useState(true);
  let [tabName, setTabName] = useState('past');
  let [activeRewards, setActiveRewards] = useState([]);
  let [pastRewards, setPastRewards] = useState([]);

  function setRewards(rewards) {
    const activeRewardsItems = rewards.filter(
      item => new Date(item.expiryDate) > new Date() && !item.usedDate,
    );

    const pastRewardsItems = rewards.filter(
      item => new Date(item.expiryDate) < new Date() || item.usedDate,
    );

    setActiveRewards(activeRewardsItems);
    setPastRewards(pastRewardsItems);
  }

  useEffect(() => {
    navigation.setParams({
      showBackButton: true,
      hideHeaderAvatar: true,
    });

    if (user._id) {
      getUserRewards({ profileId: user._id })
        .then(result => {
          setRewards(result);
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (activeRewards.length > 0 || pastRewards.length === 0) {
      setTabName('current');
    } else {
      setTabName('past');
    }
  }, [activeRewards]);

  useEffect(() => {
    if (user._id && !activeRewards.length) {
      getUserRewards({ profileId: user._id })
        .then(result => {
          setRewards(result);
          setLoading(false);
        })
        .catch(error => console.log(error));
    }
  }, [user]);

  let tournamentItem = (item, index) => {
    let activeReward = new Date(item.expiryDate) > new Date() && !item.usedDate;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('RewardDetails', { rewardId: item._id });
        }}
        key={item._id}
        style={styles.reward}>
        <ImageBackground
          source={require('./images/reward-background.png')}
          style={styles.rewardBackground}>
          <View style={styles.hostNameWrapper}>
            <Text style={styles.hostName}>
              {item.pubquizId
                ? item.pubquizId.hostId.name
                : item.tournamentId
                ? item.tournamentId.hostId.name
                : ''}
            </Text>
          </View>

          <View style={styles.prizeFooter}>
            <View style={styles.prizeWrapper}>
              <Image
                source={require('./images/gift.png')}
                style={styles.prizeIcon}
                resizeMode="contain"
              />
              <Text style={styles.prizeName}>{item.name}</Text>
            </View>

            {!activeReward && (
              <View
                style={[
                  styles.dateWrapper,
                  item.expiryDate && !item.usedDate
                    ? styles.dateWrapperTranparentBg
                    : {},
                ]}>
                <Image
                  source={require('./images/separator.png')}
                  style={styles.separatorIcon}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.date,
                    item.expiryDate && !item.usedDate ? styles.dateBrown : {},
                  ]}>
                  {item.expiryDate &&
                    !item.usedDate &&
                    'Expired \n' + moment(item.expiryDate).format('MM.DD.YYYY')}
                  {item.expiryDate &&
                    item.usedDate &&
                    'Used \n' + moment(item.usedDate).format('MM.DD.YYYY')}
                </Text>
              </View>
            )}

            {activeReward && (
              <TouchableOpacity
                onPress={() => {
                  item.claimUrl
                    ? Linking.openURL(item.claimUrl)
                    : navigation.navigate('RewardDetails', {
                        rewardId: item._id,
                      });
                }}
                style={[styles.dateWrapper, styles.primaryOrangeBg]}>
                <Image
                  source={require('./images/separator.png')}
                  style={styles.separatorIcon}
                  resizeMode="contain"
                />
                <Text style={styles.redeemText}>Redeem</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  function renderItems() {
    if (loading) {
      return (
        <View style={styles.tabContentWrapper}>
          <ContentLoader
            width={wp(100)}
            viewBox={'0 0 400 130'}
            height="130"
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede">
            <Rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
            <Rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
            <Rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
            <Rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
          </ContentLoader>
        </View>
      );
    }

    if (tabName === 'current') {
      return (
        <View style={styles.tabContentWrapper}>
          <ScrollView style={styles.table}>
            {activeRewards.length ? (
              activeRewards.map((item, index) => tournamentItem(item, index))
            ) : (
              <Text style={styles.emptyList}>
                No active rewards so far. Earn more by playing pubquiz or online
                tournament.
              </Text>
            )}
          </ScrollView>
        </View>
      );
    }

    if (tabName === 'past') {
      return (
        <View style={styles.tabContentWrapper}>
          <ScrollView style={styles.table}>
            {pastRewards.length ? (
              pastRewards.map((item, index) => tournamentItem(item, index))
            ) : (
              <Text style={styles.emptyList}>No past rewards so far.</Text>
            )}
          </ScrollView>
        </View>
      );
    }
  }

  return (
    <React.Fragment>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>My Rewards</Text>
      </View>

      <View style={styles.tabsSection}>
        <Tabs
          selected={tabName}
          style={styles.tabsWrapper}
          selectedIconStyle={[styles.selectedTab, styles.selectedTabWrapper]}
          selectedStyle={styles.selectedTabTitle}
          iconStyle={styles.tab}
          onSelect={el => setTabName(el.props.name)}>
          <Text name="current" style={styles.tabTitle}>
            Current
          </Text>
          <Text name="past" style={styles.tabTitle}>
            Past
          </Text>
        </Tabs>

        {renderItems()}
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  ...tabs,
  ...titleWrapper,
  ...rewardsStyle,
});
