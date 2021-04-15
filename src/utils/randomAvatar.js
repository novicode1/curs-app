import { avatars } from '../resources';

let keys = Object.keys(avatars);
let randomAvatarIndex = Math.floor(Math.random() * keys.length);

export default keys[randomAvatarIndex];
