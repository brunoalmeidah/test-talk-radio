class GameController {
  async show(req, res) {
    return res.json({ message: 'ok' });
  }
}

export default new GameController();
