import { LocalStorage } from 'node-localstorage';

class FindGameByIdService {
  constructor({ localStoragePath }) {
    this.localStoragePath = localStoragePath;
  }

  execute(id) {
    const localstorage = new LocalStorage(this.localStoragePath);
    const game = localstorage.getItem(id);
    if (!game) {
      throw new Error('Game not found');
    }

    return JSON.parse(game);
  }
}

export default FindGameByIdService;
