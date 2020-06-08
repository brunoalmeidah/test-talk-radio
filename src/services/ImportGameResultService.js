import fs from 'fs';
import path from 'path';
import logParser from '../utils/LogParser';

class ImportGameResultService {
  async execute() {
    const filePath = path.resolve(__dirname, '..', 'tmp', 'games.log');

    const readLogStream = fs.createReadStream(filePath);

    const parseLog = readLogStream.pipe(logParser);

    parseLog.on('data', (data) => {
      console.log(data);
    });

    await new Promise((resolve) => {
      readLogStream.on('end', resolve);
    });
  }
}

export default ImportGameResultService;
