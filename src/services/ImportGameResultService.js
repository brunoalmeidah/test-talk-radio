import fs from 'fs';
import path from 'path';
import hash from 'object-hash';
import logParser from '../utils/LogParser';

class ImportGameResultService {
  async execute() {
    const filePath = path.resolve(__dirname, '..', 'tmp', 'games.log');

    const readLogStream = fs.createReadStream(filePath);

    const parseLog = readLogStream.pipe(logParser);

    const games = {};
    parseLog.on('data', (data) => {
      const id = hash(data);
      games[id] = data;
    });

    await new Promise((resolve) => {
      readLogStream.on('end', resolve);
    });

    return games;
  }
}

export default ImportGameResultService;
