import { LocalStorage } from 'node-localstorage';
import FindGameByIdService from './FindGameByIdService';

describe('Find Game By Id', () => {
  beforeAll(() => {
    const localstorage = new LocalStorage('./src/tmp/teststoragefindbyId');
    localstorage.setItem(
      1,
      JSON.stringify({
        total_kils: 10,
        players: ['Isgalamido', 'Mocinha'],
        kills: {
          Isgalamido: 5,
          Mocinha: 2,
        },
      })
    );
  });

  afterAll(() => {
    const localstorage = new LocalStorage('./src/tmp/teststoragefindbyId');
    localstorage.clear();
  });
  it('should be able to return from localstorage a game result searched by id', async () => {
    const findGameById = new FindGameByIdService({
      localStoragePath: './src/tmp/teststoragefindbyId',
    });

    const game = await findGameById.execute(1);

    expect(game).toEqual(
      expect.objectContaining({
        total_kils: 10,
        players: ['Isgalamido', 'Mocinha'],
        kills: {
          Isgalamido: 5,
          Mocinha: 2,
        },
      })
    );
  });

  it('should be able return a error if not found a game', () => {
    const findGameById = new FindGameByIdService({
      localStoragePath: './src/tmp/teststoragefindbyId',
    });

    expect(findGameById.execute(2)).rejects.toBeInstanceOf(Error);
  });
});
