
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function() {
  return new Promise(async (resolve, reject) => {
    let res = await AsyncStorage.getItem('user');
		if (res !== null) {
			resolve(JSON.parse(res));
		} else {
			resolve(false);
		}
  });
}
