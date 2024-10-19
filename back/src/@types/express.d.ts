import { User } from '../entities/User';
import { Book } from '../entities/Book';

// @ts-ignore
import { Multer } from 'multer';

declare global {
    namespace Express {
        interface Request {
            user?: Partial<User>;
            book?: Partial<Book>;
            file?: Multer.File;
            files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
        }
    }
}
