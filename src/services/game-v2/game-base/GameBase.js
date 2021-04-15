// import { normalizeData } from '../normalize';
import GameEmitter from '../emitter/GameEmitter';

export default class GameBase {
  constructor({ gameId, userId, game }) {
    this.gameId = gameId;
    this.userId = userId;
    this.game = game;

    this.emit = new GameEmitter({ gameId, userId, game });
    this.emit.on('game:update:timeout', this.updateTimeoutHandler.bind(this));
    this.emit.on('game:update:next', this.updateNextHandler.bind(this));

    this.updateCallback = () => {};

    this.lastUpdateAt = new Date();
    this.emit.answer = this.answer;
  }

  updateTimeoutHandler({ message }) {
    const { game } = message;
    this.updateGame({ ...game, status: 'timeout' });
  }

  updateNextHandler({ message }) {
		const { game } = message;

		this.updateGame({ ...game, status: 'next' });
  }

  updateGame(game) {
    // this.game = normalizeData(game, this.userId);
    this.game = game;
    this.reaction(this.game);
  }

  answer = (answerIndex, questionIndex) => {
    this.emit.sendAnswer(answerIndex, this.game.question, questionIndex);
  };

  setUpdateCallback = fn => (this.updateCallback = fn);
  removeUpdateCallback = () => (this.updateCallback = () => {});
  get = () => this.game;
}
