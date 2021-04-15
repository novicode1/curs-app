import { getWSService } from './websocket';
import { DEVICE } from './config';

export default class GameEmitter {
  constructor({ gameId, userId, isHost }) {
    this.ws = getWSService();
    this.listenerIds = [];

    this.gameId = gameId;
    this.userId = userId;
    this.isHost = isHost;

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

  ping() {
    const data = { userId: this.userId, gameId: this.gameId };
    this.ws.sendMessage('gamePing', data);
  }

  removeAll() {
    this.listenerIds.forEach(id => this.ws.removeMessageListener(id));
    const totalEmitters = this.listenerIds.length;
    console.log('remove all listeners', { totalEmitters });
  }

  // Emitters
  sendAnswer(answerIndex, question) {
    const isCorrectAnswer = +question.correctAnswer === +answerIndex;

    const data = {
      userId: this.userId,
      gameId: this.gameId,
      isCorrectAnswer,
      isBlitz: question.isBlitz,
      questionIndex: question.index,
      answerIndex,
    };
    console.log('emmiter answer');
    this.ws.sendMessage('gameAnswer', data);
  }

  next() {
    if (this.isHost) {
      this.ws.sendMessage('gameNext', { gameId: this.gameId });
    }
  }

  timeout() {
    if (this.isHost) {
      this.ws.sendMessage('gameAnswerTimeout', { gameId: this.gameId });
    }
  }

  disconnect() {
    this.ws.sendMessage('playerDisconnect', {
      gameId: this.gameId,
      userId: this.userId,
    });
  }

  start(questionPackId) {
    if (this.isHost) {
      this.ws.sendMessage('gameStart', {
        gameId: this.gameId,
        questionPackId,
      });
    }
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
