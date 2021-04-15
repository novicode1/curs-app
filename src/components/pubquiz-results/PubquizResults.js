import React, { useState, useEffect, useContext } from 'react';

import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import table from '../table.style';

import pubquizResutsStyle from './pubquiz-results.style';
import { getQuizRankings } from '../../api/session';
import { MainContext } from '../../contexts/MainContext';

const moment = require('moment');
import distance from '../../utils/distance';

export default function PubquizResuts({ navigation }) {
	let { user }  = useContext(MainContext);
	let quizType = navigation.state.params && navigation.state.params.quizType;
	let quizData = navigation.state.params && navigation.state.params.quizData;
	let hostData = navigation.state.params && navigation.state.params.hostData;

	let [rankings, setRankings] = useState([]);

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

  useEffect(() => {
    navigation.setParams({
      showBackButton: true,
    });

		getQuizRankings({quizId: quizData._id, quizType})
		.then(setRankings)
		.catch(err => console.log(`Error in getHostQuizes: ${err.message}`));
	}, []);

  let tournamentItem = (item, index) => {
		index = index + 1;
    return (
      <View
        onPress={() => {
          navigation.navigate('bubquizResults');
        }}
        style={[
          styles.prizeItem,
          index % 2 === 0 ? styles.tableEverySecondChild : {},
        ]}
        key={item._id}>
        <View style={[styles.tableTextColumn, styles.tableRankingColumn]}>
          {index <= 3 && (
            <Image
              source={require('./images/trophy.png')}
              style={[
                styles.topPrizeImage,
                {
                  opacity: parseFloat(
                    '0.' + (10 - index * 1.75),
                    10,
                  ),
                },
              ]}
              resizeMode="contain"
            />
          )}
          <Text
            style={[
              styles.tableText,
              index <= 3 ? styles.tableTextWhite : {},
            ]}>
            {index}
          </Text>
        </View>
        <View style={[styles.tableTextColumn, styles.tableUserNameColumn]}>
          <Text style={styles.tableText}>{item.player.fullName}</Text>
        </View>
				{item.reward && (
					<View style={[styles.tableTextColumn, styles.tablePrizeColumn]}>
						<Text style={styles.tableTextPrize}>Prize</Text>
							<Text style={styles.tableText}>{item.reward.name}</Text>
					</View>
				)}
      </View>
    );
  };

  function distanceBadge() {
		return (
			<View style={styles.locationButton}>
				<Image
					source={require('./images/map-location.png')}
					style={styles.locationButtonIcon}
					resizeMode="contain"
				/>
				<Text style={styles.locationButtonText}>
					{distance(
						[
							user.latestLocation.coordinates[0],
							user.latestLocation.coordinates[1],
						],
						[
							hostData.location.coordinates[0],
							hostData.location.coordinates[1],
						],
					)}
					</Text>
			</View>
		)
	}
  function renderItems() {
		return (
			<View style={styles.tabsSection}>
				<Text style={styles.tableTitle}>Ranking board</Text>

				<View style={styles.tableWrapper}>
					<ScrollView style={styles.table}>
						{rankings.map((item, index) =>
							tournamentItem(item, index)
						)}
					</ScrollView>
				</View>
			</View>
		);
	}

	return (
		<React.Fragment>
			<View style={styles.tournamentsSection}>
				<View style={[styles.titleWrapper]}>
					<View style={styles.date}>
						<Text style={styles.dateText}>{moment(quizData.endDate).format('DD')}</Text>
						<Text style={styles.dateMonth}>{moment(quizData.endDate).format('MMM')}</Text>

					</View>

					<Text style={styles.title}>{quizData.name}</Text>

					{hostData.location && distanceBadge()}
				</View>

				<View style={styles.tournamentDetails}>
					<View style={[styles.quizDetailsRow, styles.borderSeparator]}>
						<Text style={styles.quizCategory}>
							<Text style={styles.boldText}>Description:</Text> {quizData.description}
						</Text>
					</View>
				</View>

				{rankings.length && renderItems()}
				{!rankings.length && renderHostSkeleton()}

			</View>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	...table,

	...pubquizResutsStyle,
});
