import { Transform } from 'stream';

class LogParser extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(data, enc, cb) {
    let startIndex = 0;
    const [newLine] = Buffer.from('\n');
    let game = { total_kills: 0, players: [], kills: {} };
    let kills = {};

    for (let i = 0; i < data.length; i++) {
      const character = data[i];

      if (character === newLine) {
        const line = data.toString('utf8', startIndex, i);

        if (line.indexOf('InitGame') > -1 || i === data.length - 1) {
          if (game.players.length > 0) {
            game.kills = kills;
            this.push(game);
            game = { total_kills: 0, players: [], kills: {} };
            kills = {};
          }
        }
        if (line.indexOf('Kill') > -1) {
          const lineSplit = line.split('killed');
          const player1 = lineSplit[0].split(':')[3].trim();
          const player2 = lineSplit[1].split('by')[0].trim();

          game.total_kills++;

          if (player1 !== '<world>') {
            if (kills[player1]) {
              kills[player1]++;
            } else {
              kills[player1] = 1;
            }

            if (!kills[player2]) {
              kills[player2] = 0;
            }

            if (game.players.indexOf(player1) < 0) {
              game.players.push(player1);
            }
            if (game.players.indexOf(player2) < 0) {
              game.players.push(player2);
            }
          } else {
            if (kills[player2]) {
              kills[player2]--;
            } else {
              kills[player2] = -1;
            }

            if (game.players.indexOf(player2) < 0) {
              game.players.push(player2);
            }
          }
        }

        startIndex = i + 1;
      }
    }

    cb();
  }
}

export default new LogParser();
