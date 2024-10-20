import { Router } from 'express';
import { ContactController } from './controllers/ContactController';

const routes = Router();
const protectedRoutes = Router();

// Public
routes.get('/contacts/:id', new ContactController().getOneContactById);
routes.get('/contacts', new ContactController().getAllContacts);
routes.post('/contacts', new ContactController().createContact);

routes.use(protectedRoutes);

export default routes;