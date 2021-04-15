import React, { useState, useEffect } from 'react';

import {
  View,
  Modal,
  Image,
  Text,
  StyleSheet,
	Pressable,
  TouchableOpacity,
	ImageBackground,
	Linking,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import table from '../table.style';
const moment = require('moment');
import { getUserRewards, claimReward } from '../../api/session';
import SwipeButton from 'rn-swipe-button';
import titleWrapper from '../titleWrapper.style';

import { ThemeColors, ThemeFontFamily } from '../../theme';
import rewardDetailsStyle from './reward-details.style';
let swipeIcon = require('./images/swipe-icon.png');
import QRCode from 'react-native-qrcode-svg';

export default function Profile({ navigation }) {
	let rewardId = navigation.state.params && navigation.state.params.rewardId;

  let [reward, setReward] = useState({
    // expiryDate: new Date(2020, 10, 26),
    // earnedDate: new Date(2020, 10, 22),
    // location: '22b Mount Maunganui Rd, Los Italy, AU, 90001',
	});

	reward.quizData = reward.tournamentId || reward.pubquizId || {
		quizData: {
			name: '',
			hostId: {
				name: ''
			}
		}
	}

	let [buttonSwiped, setButtonSwiped] = useState(false);

	function getNumberWithOrdinal(n) {
		var s = ["th", "st", "nd", "rd"],
				v = n % 100;
		return n + (s[(v - 20) % 10] || s[v] || s[0]);
	}

	let activeReward = new Date(reward.expiryDate) > new Date() && !reward.usedDate;

  useEffect(() => {
    navigation.setParams({
      showBackButton: true,
      hideHeaderAvatar: true,
		});

		if (rewardId) {
			getUserRewards({rewardId})
      .then(setReward)
      .catch(error => console.log(error));
		}
	}, []);

  return (
    <React.Fragment>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>My Rewards</Text>
      </View>

      <View style={styles.pageWrapper}>
        <View style={styles.subtitleWrapper}>
          <Text style={styles.subtitle}>{reward.quizData.name}</Text>
        </View>

        <View style={styles.currentQuizDetails}>
          <View style={[styles.quizDetailsRow, styles.borderSeparator]}>
            <Text style={styles.quizFinishDate}>
              <Text style={styles.boldText}>Earned:</Text>{' '}
              {moment(reward.expiryDate).format('MM.DD.YYYY')}
            </Text>

            <Text style={styles.quizDuration}>
							<Text style={styles.boldText}>{reward.usedDate ? 'Used:' : 'Exp:'} </Text>{' '}
							{moment(reward.usedDate ? reward.usedDate : reward.expiryDate).format('MM.DD.YYYY')}
            </Text>
          </View>

          <View style={[styles.quizDetailsRow, styles.borderSeparator]}>
            <Text style={styles.quizCategory}>
              <Text style={styles.boldText}>Category:</Text> {reward.quizData && reward.quizData.hostId ? reward.quizData.hostId.name : ''}
            </Text>
          </View>

					{reward.location && (
						<View style={styles.quizDetailsRow}>
							<Image
								source={require('./images/map-location.png')}
								style={styles.locationIcon}
								resizeMode="contain"
								/>
							<Text style={styles.quizCategory}>{reward.location}</Text>
						</View>
					)}
        </View>

        <ImageBackground
          source={require('./images/reward-background.png')}
          style={styles.card}>
          <Image
            source={require('./images/gift.png')}
            style={styles.giftIcon}
            resizeMode="contain"
          />
          <Text style={styles.cardTitle}>
            Congratulations on getting{' '}
						<Text style={styles.textPink}>{reward.name}</Text> for the{' '}
            <Text style={styles.textOrange}>{getNumberWithOrdinal(reward.position)} place</Text> in the Quiz.
          </Text>
        </ImageBackground>

					<View style={[styles.ctaSection, {paddingBottom: wp('2%')}]}>
						{/* Expired */}
						{new Date(reward.expiryDate) < new Date() && (
							<Text style={styles.claimUrlText}>
								Reward expired on{moment(reward.claimedDate).format(' MMM MM.DD.YYYY  h:mm A')}
							</Text>
						)}

						{/* Used */}
						{reward.usedDate && (
							<Text style={styles.claimUrlText}>
								Claimed on{moment(reward.claimedDate).format(' MMM MM.DD.YYYY  h:mm A')}
							</Text>
						)}

						{/* Pubquiz confirm button */}
						{!reward.claimUrl && activeReward && !buttonSwiped && (
							<React.Fragment>
								<Text style={styles.ctaText}>
									Show this screen to the manager to claim the reward.
								</Text>
								<SwipeButton
									thumbIconImageSource={swipeIcon}
									thumbIconBorderColor={'#fff'}
									thumbIconBackgroundColor={'#FFA100'}
									railBorderColor={'transparent'}
									width={220}
									height={60}
									railBackgroundColor={'#fff'}
									title="            Swipe to claim"
									onSwipeSuccess={() =>
										setTimeout(() => {
											setButtonSwiped(true);
										}, 400)
									}
									containerStyles={{
										padding: 4,
									}}
									railStyles={{
										backgroundColor: '#fff',
										borderColor: '#fff',
										borderLeftWidth: 0,
									}}
									titleStyles={{
										fontSize: wp('4.1 %'),
										color: '#FFA100',
										textTransform: 'uppercase',
										fontFamily: ThemeFontFamily.NeuronBlack,
									}}
								/>
							</React.Fragment>
						)}

						{/* barcode */}
						<Modal visible={!reward.claimUrl && buttonSwiped} transparent={true} animationType="fade">
							<View style={styles.qrCodeModal}>
								<Text style={styles.ctaText}>
									Show this screen to the manager to claim the reward.
								</Text>
								<QRCode
									size={wp('60%')}
									value={'https://client.getquizcast.com/#/scan-qr?id=' + reward._id}
								/>
								<TouchableOpacity onPress={() => setButtonSwiped(false)} style={styles.doneButton}>
									<Text style={styles.doneButtonText}>Done</Text>
								</TouchableOpacity>
							</View>
						</Modal>

						{/* claimUrl */}
						{reward.claimUrl && activeReward && (
							<React.Fragment>
								<Text style={styles.ctaText}>
									Push the button to go online {'\n'} and claim your rewards.
								</Text>
								<TouchableOpacity
									style={styles.ctaButton}
									onPress={() => {
										Linking.openURL(reward.claimUrl).catch(err =>
											console.error('An error occurred', err),
										);
									}}
								>
									<Text style={styles.ctaButtonText}>Redeem</Text>
								</TouchableOpacity>
							</React.Fragment>
						)}
					</View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  ...titleWrapper,
  ...table,

  ...rewardDetailsStyle,
});
