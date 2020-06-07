import { Transform } from 'stream';

class LogParser extends Transform {
  _transform(data, enc, cb) {
    let startIndex = 0;
    const [newLine] = Buffer.from('\n');

    for (let i = 0; i < data.length; i++) {
      const character = data[i];

      if (character === newLine) {
        const line = data.toString('utf8', startIndex, i);

        this.push(line);

        startIndex = i + 1;
      }
    }

    cb();
  }
}

export default new LogParser();
