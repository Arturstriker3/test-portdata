import { Router } from 'express';
import { ContactController } from './controllers/ContactController';

const routes = Router();
const protectedRoutes = Router();

// Public


routes.use(protectedRoutes);

export default routes;