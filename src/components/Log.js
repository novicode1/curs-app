import GoogleCast from 'react-native-google-cast';

export const logEvents = () => {
  const events = `
    SESSION_STARTING SESSION_STARTED SESSION_START_FAILED SESSION_SUSPENDED
    SESSION_RESUMING SESSION_RESUMED SESSION_ENDING SESSION_ENDED
    MEDIA_STATUS_UPDATED MEDIA_PLAYBACK_STARTED MEDIA_PLAYBACK_ENDED
    MEDIA_PROGRESS_UPDATED
    CHANNEL_CONNECTED CHANNEL_DISCONNECTED CHANNEL_MESSAGE_RECEIVED
  `
    .trim()
    .split(/\s+/);
  //console.log('GoogleCast events - ', events);

  events.forEach(event => {
    GoogleCast.EventEmitter.addListener(GoogleCast[event], function(...args) {
      console.log('date: ', new Date());
      console.log('GoogleCast event handler - ', event, arguments);
    });
  });
};
