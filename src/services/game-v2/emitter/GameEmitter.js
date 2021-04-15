import { getWSService } from '../websocket';
import { DEVICE } from '../config';

export default class GameEmitter {
  constructor({ gameId, userId, game }) {
    this.ws = getWSService();
    this.listenerIds = [];

    this.gameId = gameId;
    this.userId = userId;
    this.game = game;

    this.errors = [];
    this.errorCallback = err => {
      console.warn('error in ws:', err);
    };

    this.ws.onOpen(this.handshake);
    this.ws.onError(this.errorCallback);
  }

  handshake = () => {
    const { gameId, userId } = this;
    this.errors = [];

    if (DEVICE === 'mobile') {
      this.ws.sendMessage('message', { gameId, userId });
    } else {
      this.ws.sendMessage('initDevice', { gameId, deviceId: userId }); // players update
    }
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

  // Emitters
  sendAnswer(answerIndex, question, questionIndex) {
    const data = {
      userId: this.userId,
      gameId: this.gameId,
      isBlitz: question.isBlitz,
      questionIndex: questionIndex,
      answerIndex,
    };
    console.log('emmiter answer');
    this.ws.sendMessage('gameAnswer', data);
  }

  disconnect() {
    this.ws.sendMessage('playerDisconnect', {
      gameId: this.gameId,
      userId: this.userId,
    });
  }

  updateState(data) {
    this.update({ state: data });
  }

  update(data) {
    if (this.isHost) {
      this.ws.sendMessage('gameUpdate', {
        gameId: this.gameId,
        data,
      });
    }
  }

  setErrorCallback = fn => (this.errorCallback = fn);
}
