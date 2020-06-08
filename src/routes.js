import { Router } from 'express';
import GameController from './controllers/GameController';

const routes = Router();

routes.get('/games/:id', GameController.show);

export default routes;
