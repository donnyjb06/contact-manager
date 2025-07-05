import { RequestHandler } from "express";

const getAllContacts: RequestHandler = async (req, res) => {
  res.status(200).json({message: "Get all contacts"})
}

const getContact: RequestHandler = async (req, res) => {
  res.status(200).json({message: `Get individual contact ${req.params.id}`})
}

const postNewContact: RequestHandler = async (req, res) => {
  res.status(200).json({message: "Post new contact"})
}

const deleteContact: RequestHandler = async (req, res) => {
  res.status(200).json({message: `Delete contact ${req.params.id}`})
} 

const updateContact: RequestHandler = async (req, res) => {
  res.status(200).json({message: `Update contact ${req.params.id}`})
} 


module.exports = {
  getAllContacts,
  getContact,
  deleteContact,
  updateContact,
  postNewContact
}