import { LocalStorage } from 'node-localstorage';

class FindGameByIdService {
  execute(id) {
    const localstorage = new LocalStorage('./src/tmp/store');
    const game = localstorage.getItem(id);
    if (!game) {
      throw new Error('Game not found');
    }

    return JSON.parse(game);
  }
}

export default FindGameByIdService;
