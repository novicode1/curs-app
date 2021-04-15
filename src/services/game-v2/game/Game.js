import GameBase from '../game-base/GameBase';
import * as settings from '../../settings';

export default class Game extends GameBase {
  constructor(...props) {
    super(...props);
    this.init();
  }

  init() {
    this.cfg = settings.get();
  }

  reaction(game) {
    const { status, messageType, question } = game;
		const action = status || messageType;

    switch (action) {
      case 'timeout':
        this.updateCallback(game); // only for update status (timeout)
				break;
      case 'next':
        if (question.isBlitz) {
          console.log('before blitz timer show');
          this.updateCallback(prev => ({ ...prev, status: 'before-blitz' }));

          setTimeout(
            () => this.updateCallback(game),
            this.cfg.beforeBlitzTimeout * 1000,
          );
        } else {
          this.updateCallback(game);
        }
        break;
      case 'game-over':
        this.updateCallback(game);
				break;

      default:
        console.log('>>> Не обработанный case (index.js)');
    }
  }
}
