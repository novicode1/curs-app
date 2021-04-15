import React, { useContext } from 'react';

import { StyleSheet } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationService from './NavigationService';

import Home from './views/Home';
import Main from './views/Main';
import Chromecast from './views/Chromecast';
import QuizzesList from './views/QuizzesList';
import Host from './views/Host';
import Profile from './views/Profile';
import Rewards from './views/Rewards';
import RewardDetails from './views/RewardDetails';
import Notifications from './views/Notifications';
import EditField from './views/EditField';
import PubquizResults from './views/PubquizResults';
import Lobby from './views/Lobby';
import GameLobby from './views/GameLobby';
import Game from './views/Game';
import GameResults from './views/GameResults';
import OnlineGame from './views/OnlineGame';
import GameOver from './views/GameOver';
import Help from './views/Help';

const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    GameResults: {
      screen: GameResults,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    Chromecast: {
      screen: Chromecast,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    GameLobby: {
      screen: GameLobby,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    QuizzesList: {
      screen: QuizzesList,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    Host: {
      screen: Host,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    Rewards: {
      screen: Rewards,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    RewardDetails: {
      screen: RewardDetails,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    EditField: {
      screen: EditField,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    PubquizResults: {
      screen: PubquizResults,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
        };
      },
    },
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
          cardStyle: styles.cardStyle,
        };
      },
    },
    Lobby: {
      screen: Lobby,
      navigationOptions: ({ navigation }) => {
        return {
          headerShown: false,
          cardStyle: styles.cardStyle,
        };
      },
    },
    Game: {
      screen: Game,
      navigationOptions: ({ navigation }) => {
        const title = 'Game!';
        return {
          title,
          headerShown: false,
          cardStyle: styles.cardStyle,
        };
      },
    },
    OnlineGame: {
      screen: OnlineGame,
      navigationOptions: ({ navigation }) => {
        const title = 'Game!';
        return {
          title,
          headerShown: false,
          cardStyle: styles.cardStyle,
        };
      },
    },
    GameOver: {
      screen: GameOver,
      navigationOptions: () => {
        const title = 'Game Over!';
        return { title, headerShown: false, cardStyle: styles.cardStyle };
      },
    },
    Help: {
      screen: Help,
      navigationOptions: () => {
        const title = 'Help!';
        return { title, headerShown: false, cardStyle: styles.cardStyle };
      },
    },
  },
  {},
);

const AppContainer = createAppContainer(AppNavigator);

// https://reactnavigation.org/docs/4.x/navigating-without-navigation-prop/
export default ({ screenProps }) => {
  return (
    <AppContainer
      screenProps={screenProps}
      ref={navigatorRef => {
				NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

const styles = StyleSheet.create({
  // cardStyle: { backgroundColor: 'transparent' },
});
