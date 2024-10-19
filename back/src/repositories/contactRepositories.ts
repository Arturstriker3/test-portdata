import { AppDataSource } from "../data-source";
import { Contact } from "../entities/Contact";

export const bookRepository = AppDataSource.getRepository(Contact); {

}