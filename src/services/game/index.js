import GameBase from './base';
import * as settings from '../settings';

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

        if (question.isBlitz) {
          console.log('after blitz timer show');
          this.updateCallback(prev => ({ ...prev, status: 'after-blitz' }));
          setTimeout(() => this.emit.next(), this.cfg.afterBlitzTimeout * 1000); // 6s
        } else {
          console.log('highlight 3 sec');
          setTimeout(() => this.emit.next(), this.cfg.highlightAnswers * 1000); // for highligh, 3s
        }
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
      case 'game-start':
        this.updateCallback(game);
        break;
      case 'game:update:players':
				this.updateCallback(prev => ({ ...game, status: prev.status }));
        break;
      default:
        console.log('>>> Не обработанный case (index.js)');
    }
  }
}
