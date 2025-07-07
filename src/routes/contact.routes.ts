import { Router } from 'express';
import { getAllContacts, getContact, deleteContact, updateContact, postNewContact } from '../controllers/contact.controller';

const router = Router();

router.route('/').get(getAllContacts).post(postNewContact);

router.route('/:id').get(getContact).delete(deleteContact).patch(updateContact);

export { router as contactRoutes }
