import ImportGameResultService from './ImportGameResultService';

class GameResultReportService {
  async execute() {
    const importGameResultService = new ImportGameResultService();
    const games = await importGameResultService.execute();
    const ranking = [];

    console.log(' ');

    Object.keys(games).forEach((key) => {
      console.log(`Game ID: ${key}`);

      const { kills } = games[key];

      Object.keys(kills).forEach((item) => {
        const index = ranking.findIndex((findItem) => findItem.player === item);

        if (index === -1) {
          ranking.push({ player: item, kill: kills[item] });
        } else {
          const { kill } = ranking[index];
          ranking[index].kill = kill + kills[item];
        }
      });
    });

    const rankingSorted = ranking.sort((a, b) => {
      if (a.kill > b.kill) {
        return -1;
      }
      if (a.kill < b.kill) {
        return 1;
      }
      return 0;
    });
    console.log(' ');
    console.log('Ranking Geral:');
    console.log(' ');
    rankingSorted.forEach((item) => {
      console.log(`${item.player} -> ${item.kill}`);
    });
  }
}

export default GameResultReportService;
