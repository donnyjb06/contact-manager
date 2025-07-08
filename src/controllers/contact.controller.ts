import { RequestHandler } from 'express';
import { Contact as ContactType, DecodedUser } from '../types';
import { Contact } from '../models/contact';
import asyncHandler from 'express-async-handler';
import { STATUS_CODES } from '../utils/constants';
import HttpError from '../types/Error/HttpError';
import { User } from '../models/user';

const _getAllContacts: RequestHandler = async (req, res) => {
  const contacts: ContactType[] | [] = await Contact.find({});
  res.status(200).json({ contacts });
};
const getAllContacts = asyncHandler(_getAllContacts);

const _getContact: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const contact: ContactType | null = await Contact.findById(id);
  if (!contact) {
    throw new HttpError(
      `Contact with id of ${id} does not exist`,
      STATUS_CODES.NOT_FOUND,
    );
  }

  res.status(200).json({ contact });
};
const getContact = asyncHandler(_getContact);

const _postNewContact: RequestHandler = async (req, res) => {
  const { firstName, lastName, phoneNumber, email } = req.body;
  if (!firstName || !lastName || !phoneNumber || !email) {
    throw new HttpError(
      `Error when creating contact`,
      STATUS_CODES.VALIDATION_ERROR,
    );
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
    throw new HttpError('Contact Id needed', STATUS_CODES.NOT_FOUND);
  }

  const deletedContact = await Contact.findByIdAndDelete(id).orFail();
  res.status(200).json(deletedContact);
};
const deleteContact = asyncHandler(_deleteContact);

const _updateContact: RequestHandler = async (req, res ) => {
  const { id } = req.params;

  if (!id) {
    throw new HttpError("Update failed due to missing contact ID", 400)
  }

  const allowedProperties = ["firstName", "lastName", "phoneNumber", "email"]
  const updates: Record<string, any> = {}

  for (const key of Object.keys(req.body)) {
    if (allowedProperties.includes(key)) {
      updates[key] = req.body[key]
    }
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, updates, { new: true, runValidators: true })

  res.status(200).json(updatedContact)
};
const updateContact = asyncHandler(_updateContact);

export {
  getAllContacts,
  getContact,
  deleteContact,
  updateContact,
  postNewContact,
};
