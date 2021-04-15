import { normalizeData } from './normalize';
import GameEmitter from './emitter';

export default class GameBase {
  constructor({ gameId, userId, isHost }) {
    this.gameId = gameId;
    this.userId = userId;
    this.isHost = isHost;
    this.game = {};

    this.emit = new GameEmitter({ gameId, userId, isHost });
    this.emit.on('game:update:timeout', this.updateTimeutHandler.bind(this));
    this.emit.on('game:update:next', this.updateNextHandler.bind(this));
    this.emit.on('game:update:players', this.defaultUpdateHandler.bind(this));
    this.emit.on('lobby:update:timeout', this.defaultUpdateHandler.bind(this));
    this.emit.on('game:ping', this.gamePong.bind(this));

    this.updateCallback = () => {};

    this.lastUpdateAt = new Date();
    this.emit.answer = this.answer;
    // this.ping();
  }

  // ping() {
  //   const intervalId = setInterval(() => {
  //     const diff = (new Date() - this.lastUpdateAt) / 1000;

  //     if (!this.emit.ws.isOpen) {
  //       clearInterval(intervalId);
  //     }

  //     if (diff > 10) {
  //       this.emit.ping();
  //     }
  //   }, 5000);
  // }

  gamePong() {
    this.lastUpdateAt = new Date();
  }

  defaultUpdateHandler({ type, message }) {
    const { game } = message;
    this.updateGame({ ...game, messageType: type });
  }

  gameStartHandler({ message }) {
		console.log('receive start game');
		alert('receive start game');
    const { game } = message;
    this.updateGame({ ...game, status: 'game-start' });
  }

  updateTimeutHandler({ message }) {
    const { game } = message;
    this.updateGame({ ...game, status: 'timeout' });
  }

  updateNextHandler({ message }) {
    const { game } = message;
    this.updateGame({ ...game, status: 'next' });
  }

  updateGame(game) {
    this.game = normalizeData(game, this.userId);
    this.reaction(this.game);
  }

  answer = answerIndex => {
    this.emit.sendAnswer(answerIndex, this.game.question);
  };

  setUpdateCallback = fn => (this.updateCallback = fn);
  removeUpdateCallback = () => (this.updateCallback = () => {});
  get = () => this.game;
}
