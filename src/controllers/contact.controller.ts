import { RequestHandler } from "express";

const getAllContacts: RequestHandler = (req, res) => {
  res.status(200).json({message: "Get all contacts"})
}

const getContact: RequestHandler = (req, res) => {
  res.status(200).json({message: "Get individual contact"})
}

const postNewContact: RequestHandler = (req, res) => {
  res.status(200).json({message: "Post new contact"})
}

const deleteContact: RequestHandler = (req, res) => {
  res.status(200).json({message: "Delete contact"})
} 

const updateContact: RequestHandler = (req, res) => {
  res.status(200).json({message: "Update contact"})
} 


module.exports = {
  getAllContacts,
  getContact,
  deleteContact,
  updateContact,
  postNewContact
}