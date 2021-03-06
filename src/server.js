import express from 'express';
import GameResultReportService from './services/GameResultReportService';
import ImportGameResultService from './services/ImportGameResultService';
import routes from './routes';

const importGameResultService = new ImportGameResultService({
  localStoragePath: './src/tmp/store',
  fileName: 'games.log',
});

const gameResultReportService = new GameResultReportService();

const app = express();

app.use(routes);

importGameResultService.execute().then((games) => {
  gameResultReportService.execute(games).then(() => {
    app.listen(3333, () => {
      console.log('\nServer started on port 3333');
    });
  });
});
