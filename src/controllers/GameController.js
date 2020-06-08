import FindGameByIdService from '../services/FindGameByIdService';

class GameController {
  async show(req, res) {
    const { id } = req.params;
    try {
      const findGameByIdService = new FindGameByIdService();

      const game = findGameByIdService.execute(id);

      return res.json(game);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new GameController();