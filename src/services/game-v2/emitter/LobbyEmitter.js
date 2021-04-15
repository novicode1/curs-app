import { getWSService } from '../websocket';

///Connects to the websocket and sends update on the lobby events
export default class LobbyEmitter {
  constructor({ gameId, userId }) {
    this.ws = getWSService();
    this.listenerIds = [];

    this.gameId = gameId;
    this.userId = userId;

    this.errors = [];
    this.errorCallback = err => {
      console.warn('error in ws:', err);
    };

    this.ws.onOpen(this.handshake);
    this.ws.onError(this.errorCallback);
  }

  ///Initialize socket connection
  handshake = () => {
    console.log('Doing the handshake on connection open.');
    const { gameId, userId } = this;
    this.errors = [];

    this.ws.sendMessage('initPlayer', { gameId, userId }); // players update
  };

  // Listeners
  on(name, fn) {
    const id = this.ws.addMessageListener(name, fn);
    this.listenerIds.push(id);
  }

  off() {
    this.ws.close();
  }

  onError(err) {
    this.errors.push(err.message);
  }

  removeAll() {
    this.listenerIds.forEach(id => this.ws.removeMessageListener(id));
    const totalEmitters = this.listenerIds.length;
    console.log('remove all listeners', { totalEmitters });
  }

  disconnect() {
    this.ws.sendMessage('playerDisconnect', {
      gameId: this.gameId,
      userId: this.userId,
    });
  }

  setErrorCallback = fn => (this.errorCallback = fn);
}
