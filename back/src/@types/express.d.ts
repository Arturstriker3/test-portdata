import { Contact } from '../entities/Contact';

declare global {
    namespace Express {
        interface Request {
            contact?: Partial<Contact>;
        }
    }
}
