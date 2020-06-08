import express from 'express';
import GameResultReportService from './services/GameResultReportService';
import routes from './routes';

const gameResultReportService = new GameResultReportService();

gameResultReportService.execute();

const app = express();

app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
