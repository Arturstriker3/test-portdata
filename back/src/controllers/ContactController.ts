import { NextFunction, Request, Response } from 'express';
import { contactRepository } from "../repositories/contactRepositories";
import { BadRequestError, NotFoundError } from '../helpers/api-errors';

class ContactController {
    async getOneContactById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            const contact = await contactRepository.findOneBy({ id: Number(id) });

            if (!contact) {
                return next(new NotFoundError('Contact not found'));
            }

            return res.status(200).json(contact);
        } catch (error) {
            return next(new BadRequestError('Error retrieving contact'));
        }
    }
}