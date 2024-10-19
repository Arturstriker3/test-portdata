import { AppDataSource } from "../data-source";
import { Contact } from "../entities/Contact";

export const contactRepository = AppDataSource.getRepository(Contact); {

}