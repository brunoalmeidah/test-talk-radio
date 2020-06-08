import express from 'express';
import GameResultReportService from './services/GameResultReportService';

const gameResultReportService = new GameResultReportService();

gameResultReportService.execute();

const app = express();

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
