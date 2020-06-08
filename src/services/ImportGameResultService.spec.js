import { LocalStorage } from 'node-localstorage';
import ImportGameResultServide from './ImportGameResultService';

describe('Import Game ', () => {
  afterAll(() => {
    const localstorage = new LocalStorage('./src/tmp/teststorage');
    localstorage.clear();
  });
  it('should import game results from file', async () => {
    const importGame = new ImportGameResultServide({
      localStoragePath: './src/tmp/teststorage',
      fileName: 'testgames.log',
    });

    const games = await importGame.execute();

    expect(games).toEqual(
      expect.objectContaining({
        e41193d67f18242cec11d3a3b3b1d0f5f624da91: expect.objectContaining({
          total_kills: 11,
          players: ['Isgalamido', 'Mocinha'],
          kills: {
            Isgalamido: -5,
            Mocinha: 0,
          },
        }),
        '35945c6c01c3d4d8a6f5460fb4e078406128976b': expect.objectContaining({
          total_kills: 4,
          players: ['Isgalamido', 'Mocinha', 'Zeh', 'Dono da Bola'],
          kills: {
            Isgalamido: 1,
            Mocinha: 0,
            Zeh: -2,
            'Dono da Bola': -1,
          },
        }),
        '0fe07ccd6cf6077708d668d701db0b98c170e960': expect.objectContaining({
          total_kills: 24,
          players: ['Isgalamido', 'Zeh', 'Dono da Bola', 'Assasinu Credi'],
          kills: {
            Isgalamido: 7,
            Zeh: 3,
            'Dono da Bola': 4,
            'Assasinu Credi': 2,
          },
        }),
      })
    );
  });
});
