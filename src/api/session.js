import getInstance from './server';
import * as settingsService from '../services/settings';
import { Alert } from 'react-native';

export const getQuestions = async () => {
  const instance = await getInstance();
  const result = await instance.get('/questions');

  return result.data;
};

export const getPubquizHosts = async (filter, userCoordinates) => {
  console.log('Loading pubquiz hosts - ', filter, userCoordinates);
  const instance = await getInstance();
  let params;

  switch (filter) {
    case 'proximity':
    case 'most-recent':
      params = {
        filter: filter,
        lng: userCoordinates ? userCoordinates.coordinates[0] : null,
        lat: userCoordinates ? userCoordinates.coordinates[1] : null,
      };
      break;
    default:
      params = { filter: filter ? filter : 'most-recent' };
      break;
  }

  const result = await instance.get('/pubquiz-hosts', {
    params: params,
  });

  return result.data;
};

export const getTournamentHosts = async filter => {
  console.log('Loading tournament hosts - ', filter);
  const instance = await getInstance();
  const result = await instance.get('/tournament-hosts', {
    params: { filter: filter ? filter : 'most-recent' },
  });

  return result.data;
};

export const getHost = async (hostId, hostType) => {
  const instance = await getInstance();

  const result = await instance.get('/host-data', {
    params: { hostId, hostType },
  });

  return result.data;
};

export const getHostQuizes = async (hostId, hostType, limit) => {
  const instance = await getInstance();

  const result = await instance.get('/host-quizes', {
    params: { hostId, hostType, limit },
  });

  return result.data;
};

export const newGame = async userId => {
  const instance = await getInstance();
  const result = await instance.post('/new-game', null, { params: { userId } });
  return result.data;
};

export const joinGame = async (gameId, userId) => {
  const instance = await getInstance();
  const result = await instance.post('/join-game', null, {
    params: { gameId, userId },
  });
  return result.data;
};

export const getRankingList = async (hostType, quizId, limit) => {
  const instance = await getInstance();
  let result;
  console.log('Getting ranking list for ', quizId, hostType);

  switch (hostType) {
    case 'pubquiz':
      result = await instance.get('/ranking-list', {
        params: { pubquizId: quizId, limit },
      });
      break;

    case 'tournament':
      result = await instance.get('/ranking-list', {
        params: { tournamentId: quizId, limit },
      });
      break;
  }

  return result.data;
};
export const getUserRanking = async (hostType, quizId, profileId) => {
  const instance = await getInstance();
  console.log('Getting user ranking for ', quizId, hostType, profileId);
  let result;
  switch (hostType) {
    case 'pubquiz':
      result = await instance.get('/user-ranking', {
        params: { pubquizId: quizId, profileId },
      });
      break;

    case 'tournament':
      result = await instance.get('/user-ranking', {
        params: { tournamentId: quizId, profileId },
      });
      break;
  }

  return result.data;
};

export const getQuizRankings = async params => {
  const instance = await getInstance();
  let result = await instance.get('/quiz-rankings', { params });

  return result.data;
};

export const getUserRewards = async params => {
  const instance = await getInstance();

  let { profileId, rewardId } = params;

  let getParams = profileId ? { profileId } : { rewardId };

  const result = await instance.get('/user-rewards', {
    params: getParams,
  });

  return result.data;
};

export const joinOrCreateGame = async (profileId, tournamentId, location) => {
  if (!profileId || !tournamentId || !location) {
    return;
  }
  const instance = await getInstance();
  let result;

  result = await instance.post('/join-or-create-game', {
    params: { profileId, tournamentId, location },
  });

  return result.data;
};

export const claimReward = async rewardId => {
  if (!rewardId) {
    return;
  }
  const instance = await getInstance();
  let result;

  result = await instance.post('/claim-reward', {
    params: { rewardId },
  });

  return result.data;
};

export const subscribeOnHost = async (
  hostId,
  subscribeStatus,
  hostType,
  userId,
) => {
  const instance = await getInstance();
  let result;

  result = await instance.post('/subscribe-on-host', {
    params: { hostId, subscribeStatus, hostType, userId },
  });

  return result.data;
};
// Временная заглушка
export const lastGame = async () => {
  const instance = await getInstance();
  const result = await instance.post('/last-game');
  return result.data;
};
