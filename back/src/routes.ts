import { Router } from 'express';
import { BookController } from './controllers/BookController';


const routes = Router();
const protectedRoutes = Router();

// Public


routes.use(protectedRoutes);

export default routes;