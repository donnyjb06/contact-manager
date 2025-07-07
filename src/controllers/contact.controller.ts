import { RequestHandler } from 'express';
import { Contact as ContactType } from '../types';
import {Contact} from '../models/contact';
import asyncHandler from 'express-async-handler';
import {STATUS_CODES} from '../utils/constants';

const _getAllContacts: RequestHandler = async (req, res) => {
  const contacts: ContactType[] | [] = await Contact.find({});
  res.status(200).json({ contacts });
};
const getAllContacts = asyncHandler(_getAllContacts);

const _getContact: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const contact: ContactType | null = await Contact.findById(id);
  if (!contact) {
    const error: any = new Error(`Contact with id of ${id} does not exist`);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  res.status(200).json({ contact });
};
const getContact = asyncHandler(_getContact);

const _postNewContact: RequestHandler = async (req, res) => {
  const { firstName, lastName, phoneNumber, email } = req.body;
  if (!firstName || !lastName || !phoneNumber || !email) {
    const error: any = new Error(`Error when creating contact`);
    error.statusCode = STATUS_CODES.VALIDATION_ERROR;
    throw error;
  }

  const contact = await Contact.create({
    firstName,
    lastName,
    phoneNumber,
    email,
  });
  console.log(contact);
  res.status(200).json({ contact });
};
const postNewContact = asyncHandler(_postNewContact);

const _deleteContact: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    const error: any = new Error('Contact Id needed');
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  const deletedContact = await Contact.findByIdAndDelete(id).orFail();
  res.status(200).json(deletedContact);
};
const deleteContact = asyncHandler(_deleteContact);

const _updateContact: RequestHandler = async (req, res) => {
  res.status(200).json({ message: `Update contact ${req.params.id}` });
};
const updateContact = asyncHandler(_updateContact);

export {
  getAllContacts,
  getContact,
  deleteContact,
  updateContact,
  postNewContact,
};
