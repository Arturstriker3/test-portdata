import { NextFunction, Request, Response } from 'express';
import { contactRepository } from "../repositories/contactRepositories";
import { BadRequestError, NotFoundError } from '../helpers/api-errors';

export class ContactController {

    /**
* @swagger
* /contacts/{id}:
*   get:
*     tags:
*       - Contacts
*     summary: Retrieve a contact by ID
*     description: Retrieve a specific contact from the database using its ID.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The ID of the contact to retrieve.
*         schema:
*           type: integer
*           example: 1
*     responses:
*       200:
*         description: Contact retrieved successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   example: 1
*                 name:
*                   type: string
*                   example: "John Doe"
*                 phone:
*                   type: string
*                   example: "+1-202-555-0143"
*                 createdAt:
*                   type: string
*                   format: date-time
*                   example: "2023-10-01T10:30:00.000Z"
*                 updatedAt:
*                   type: string
*                   format: date-time
*                   example: "2023-10-02T11:00:00.000Z"
*       404:
*         description: Contact not found.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Contact not found"
*       500:
*         description: Internal server error.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Error retrieving contact"
*/

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