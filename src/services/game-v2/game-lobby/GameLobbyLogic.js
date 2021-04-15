import * as settings from '../../settings';
import LobbyEmitter from '../emitter/LobbyEmitter';

export default class GameLobbyLogic {
  constructor({ gameId, userId }) {
    this.gameId = gameId;
    this.userId = userId;
    this.game = {};

    this.emit = new LobbyEmitter({ gameId, userId });
    this.emit.on('game:start', this.updateHandler.bind(this));
    this.emit.on('lobby:update:players', this.updateHandler.bind(this));
    this.emit.on('lobby:update:timeout', this.updateHandler.bind(this));

    this.updateCallback = () => {};

    this.lastUpdateAt = new Date();
  }

  setUpdateCallback = fn => (this.updateCallback = fn);
  removeUpdateCallback = () => (this.updateCallback = () => {});
  get = () => this.game;

  updateHandler({ message }) {
    console.log(message);
    const { game } = message;
    this.game = game;
    this.reaction(game);
  }

  init() {
    this.cfg = settings.get();
  }

  reaction(game) {
    this.updateCallback(game);
  }
}
