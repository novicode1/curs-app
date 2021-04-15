import getInstance from './server';

export const getUser = async params => {
  const instance = await getInstance();
  let result;
  let { userId, facebookId } = params;

  let getParams = userId ? { userId } : { facebookId };

  result = await instance.get('/profile', {
    params: getParams,
  });

  return result.data;
};
export const setUser = async (newProfileData, userId) => {
  const instance = await getInstance();
  let profileId = userId;
  let result;
  result = await instance.post('/edit-profile', {
    params: { newProfileData, profileId },
	});

  return result.data;
};

export const setDatabaseProfile = async user => {
  const instance = await getInstance();
  let result;

  result = await instance.post('/set-profile', {
    params: { user: user },
  });

  return result.data;
};

export const getUserGamesHistory = async userId => {
  const instance = await getInstance();
  let result;

  result = await instance.get('/user-games-history', {
    params: { playerId: userId },
  });

  return result.data;
};

export const getNotifications = async userId => {
  const instance = await getInstance();
  let result;

  result = await instance.get('/notifications', {
    params: { profileId: userId },
  });

  return result.data;
};

export const viewNotifications = async userId => {
  const instance = await getInstance();
  let result;

  result = await instance.post('/view-notifications', {
    params: { profileId: userId },
  });

  return result.data;
};
