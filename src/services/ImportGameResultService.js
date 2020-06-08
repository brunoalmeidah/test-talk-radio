import fs from 'fs';
import path from 'path';
import hash from 'object-hash';
import { LocalStorage } from 'node-localstorage';
import logParser from '../utils/LogParser';

class ImportGameResultService {
  async execute(fileName) {
    const filePath = path.resolve(__dirname, '..', 'tmp', fileName);

    const localstorage = new LocalStorage('./src/tmp/store');
    localstorage.clear();
    const readLogStream = fs.createReadStream(filePath);

    const parseLog = readLogStream.pipe(logParser);

    const games = {};
    parseLog.on('data', (data) => {
      const id = hash(data);
      games[id] = data;
      localstorage.setItem(id, JSON.stringify(data));
    });

    await new Promise((resolve) => {
      readLogStream.on('end', resolve);
    });

    return games;
  }
}

export default ImportGameResultService;
