import React, { useState, useEffect, useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  DrawerLayout,
} from 'react-native';

import BackButton from '../BackButton/BackButton';
import AvatarContainer from '../AvatarContainer';
import Notifications from './Notifications';
import Dropdown from './Dropdown';

import { MainContext } from '../../contexts/MainContext';
import headerStyle from './header.style';

export default function Header({ navigation }) {
  let [showDropdown, setShowDropdown] = useState(false);

  const { user } = useContext(MainContext);

  function changeDropdownState() {
		if (!user.isGuest) {
			setShowDropdown(!showDropdown);
		}
	}

  useEffect(() => {
    if (user.isGuest === false && showDropdown === true) {
			changeDropdownState();
    }
  }, [user.isGuest]);

  let showBackButton =
    navigation.state.params && navigation.state.params.showBackButton;
  let hideHeaderAvatar =
    navigation.state.params && navigation.state.params.hideHeaderAvatar;

  return (
    <React.Fragment>
      <View style={styles.header}>
        {showBackButton && (
          <BackButton
            navigation={navigation}
            propStyles={styles.headerBackButton}
          />
        )}

        {!hideHeaderAvatar && (
          <React.Fragment>
            <TouchableOpacity
              style={{ zIndex: 2 }}
              onPress={() => {
                changeDropdownState();
              }}>
              <AvatarContainer
                style={styles.userAvatar}
                avatar={user ? user.photoUrl : null}
                propStyles={showBackButton ? styles.userAvatarCollapsed : {}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.userNameWrapper}
              onPress={() => {
                changeDropdownState();
              }}>
              <Text
                style={[
                  styles.userName,
                  showBackButton ? styles.userNameCollapsed : {},
                ]}>
                {showBackButton
                  ? user.fullName.slice(0, 15) + '...'
                  : user.fullName && user.fullName.length > 19
                  ? user.fullName.slice(0, 19) + '...'
                  : user.fullName}
              </Text>
            </TouchableOpacity>
          </React.Fragment>
        )}

				{!user.isGuest && (
					<React.Fragment>
						<Notifications
							navigation={navigation}
							propStyles={showBackButton ? styles.notificationsCollapsed : {}}
							/>

						<Modal visible={showDropdown} transparent={true} animationType="fade">
							<Dropdown
								changeDropdownState={changeDropdownState.bind(this)}
								headerCollapsed={showBackButton}
								navigation={navigation}
								/>
						</Modal>
					</React.Fragment>
				)}
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  ...headerStyle,
});
