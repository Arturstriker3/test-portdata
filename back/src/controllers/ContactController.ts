import { NextFunction, Request, Response } from "express";
import { contactRepository } from "../repositories/contactRepositories";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";

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
      if (!id) {
        return next(new BadRequestError("Contact ID is required"));
      }

      if (Object.keys(req.params).length > 1 || !req.params.id) {
        return next(
          new BadRequestError('Invalid parameter. Only "id" is allowed.')
        );
      }

      const contact = await contactRepository.findOneBy({ id: Number(id) });

      if (!contact) {
        return next(new NotFoundError("Contact not found"));
      }

      return res.status(200).json(contact);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /contacts:
   *   get:
   *     tags:
   *       - Contacts
   *     summary: Retrieve all contacts
   *     description: Retrieve a paginated list of contacts from the database.
   *     parameters:
   *       - in: query
   *         name: page
   *         required: false
   *         description: The page number to retrieve.
   *         schema:
   *           type: integer
   *           example: 1
   *       - in: query
   *         name: limit
   *         required: false
   *         description: The number of contacts per page.
   *         schema:
   *           type: integer
   *           example: 10
   *     responses:
   *       200:
   *         description: Contacts retrieved successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 page:
   *                   type: integer
   *                   example: 1
   *                 limit:
   *                   type: integer
   *                   example: 10
   *                 total:
   *                   type: integer
   *                   example: 100
   *                 contacts:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                         example: 1
   *                       name:
   *                         type: string
   *                         example: "John Doe"
   *                       phone:
   *                         type: string
   *                         example: "+1-202-555-0143"
   *                       createdAt:
   *                         type: string
   *                         format: date-time
   *                         example: "2023-10-01T10:30:00.000Z"
   *                       updatedAt:
   *                         type: string
   *                         format: date-time
   *                         example: "2023-10-02T11:00:00.000Z"
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Error retrieving contacts"
   */

  async getAllContacts(req: Request, res: Response, next: NextFunction) {
    const { page, limit } = req.query;

    try {
      const validParams = ["page", "limit"];
      const invalidParams = Object.keys(req.query).filter(
        (param) => !validParams.includes(param)
      );

      if (invalidParams.length > 0) {
        return next(
          new BadRequestError(`Invalid parameters: ${invalidParams.join(", ")}`)
        );
      }

      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      if (page && (!Number.isInteger(pageNumber) || pageNumber < 1)) {
        return next(new BadRequestError("Page must be a positive integer."));
      }

      if (limit && (!Number.isInteger(limitNumber) || limitNumber < 1)) {
        return next(new BadRequestError("Limit must be a positive integer."));
      }

      const currentPage = pageNumber || 1;
      const currentLimit = limitNumber || 10;

      const [contacts, total] = await contactRepository.findAndCount({
        skip: (currentPage - 1) * currentLimit,
        take: currentLimit,
      });

      if (contacts.length === 0) {
        return res.status(404).json({
          message: "No contacts found.",
          page: currentPage,
          limit: currentLimit,
        });
      }

      return res.status(200).json({
        page: currentPage,
        limit: currentLimit,
        total,
        contacts,
      });
    } catch (error) {
      next(error);
    }
  }
}
