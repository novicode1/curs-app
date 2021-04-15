/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';
import { viewNotifications, getNotifications } from '../../api/profile';

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

const moment = require('moment');
import Tabs from 'react-native-tabs';
import tabs from '../tabs.style';
import TextParser from './TextParser';
import { MainContext } from '../../contexts/MainContext';

import notificationsStyle from './notifications.style';

let icons = {
  cup: require('./images/cup.png'),
  prize: require('./images/prize.png'),
  play: require('./images/play.png'),
  ring: require('./images/ring.png'),
  hand: require('./images/hand.png'),
};

export default function Profile({ navigation }) {
  let [tabName, setTabName] = useState('unread');
  let [isLoading, setLoading] = useState(true);
  let { notifications, setNotifications, setNotificationCount } = useContext(
    MainContext,
  );
  let [unreadNotifications, setUnreadNotifications] = useState(
    'unreadNotifications',
  );
  let { user } = useContext(MainContext);

  function renderLink(item) {
    let { link } = item;
    let linkRoute = link.screen.charAt(0).toUpperCase() + link.screen.slice(1);
    let hostType, hostId;

    switch (linkRoute) {
      case 'Host':
        hostId = link.hostId;
        hostType = link.hostType;
        break;
    }

    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => {
          navigation.navigate(linkRoute, { hostType, hostId });
        }}
        style={[
          styles.linkButton,
          link.title === 'Play' ? styles.primaryButton : {},
        ]}>
        <Text
          style={[
            styles.linkButtonText,
            link.title === 'Play' ? styles.primaryButton : {},
          ]}>
          {link.title}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderItems() {
    if (isLoading) {
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
    } else {
      if (tabName === 'unread') {
        return (
          <View style={styles.tabContentWrapper}>
            <ScrollView style={styles.table}>
              {unreadNotifications.length > 0 ? (
                notifications
                  .filter(item => !item.viewedDate)
                  .map(item => notification(item))
              ) : (
                <Text style={styles.emptyList}>No unread notifications.</Text>
              )}
            </ScrollView>
          </View>
        );
      }

      if (tabName === 'all') {
        return (
          <View style={styles.tabContentWrapper}>
            <ScrollView style={styles.table}>
              {notifications.length ? (
                notifications.map((item, index) => notification(item, index))
              ) : (
                <Text style={styles.emptyList}>
                  No notifications so far. Try playing pubquiz or online
                  tournaments to get some.
                </Text>
              )}
            </ScrollView>
          </View>
        );
      }
    }
  }

  useEffect(() => {
    navigation.setParams({
      showBackButton: true,
    });

    getNotifications(user._id)
      .then(result => {
        const unreadItems = result.filter(({ viewedDate }) => !viewedDate);
        setNotifications(result);
        setUnreadNotifications(unreadItems);
        setLoading(false);
      })
      .catch(err => console.warn(`Error in getNotifications: ${err.message}`));

    return () => {
      if (!user._id || user.isGuest) {
        return;
      }
      viewNotifications(user._id);
      setNotificationCount(0);
      setNotifications([]);
      setUnreadNotifications([]);
    };
  }, []);

  useEffect(() => {
    let unreadNotificationsLength = unreadNotifications.length;

    if (unreadNotificationsLength === 0) {
      setTabName('all');
    } else if (unreadNotificationsLength > 0) {
      setTabName('unread');
    }
  }, [notifications]);

  let notification = (item, index) => {
    return (
      <View
        onPress={() => {
          navigation.navigate('PubquizResults');
        }}
        key={item._id}
        style={styles.row}>
        <Image
          source={
            !item.icon || !icons[item.icon]
              ? require('./images/dot.png')
              : icons[item.icon]
          }
          style={styles.rowIcon}
          resizeMode="contain"
        />

        <View style={styles.rowTextWrapper}>
          <TextParser text={item.text} navigation={navigation} />
          <Text style={styles.date}>{moment(item.creationDate).fromNow()}</Text>
        </View>

        {item.link && renderLink(item)}
      </View>
    );
  };

  return (
    <View style={styles.tabsSection}>
      <Tabs
        selected={tabName}
        style={styles.tabsWrapper}
        selectedIconStyle={[styles.selectedTab, styles.selectedTabWrapper]}
        selectedStyle={styles.selectedTabTitle}
        iconStyle={styles.tab}
        onSelect={el => setTabName(el.props.name)}>
        <Text name="unread" style={styles.tabTitle}>
          Unread
        </Text>
        <Text name="all" style={styles.tabTitle}>
          All
        </Text>
      </Tabs>

      {renderItems()}
    </View>
  );
}

const styles = StyleSheet.create({
  ...tabs,
  ...notificationsStyle,
});
