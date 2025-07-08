import { Schema, Types } from "mongoose";
import HttpError from "../types/Error/HttpError";
import { Request } from "express";
import { STATUS_CODES } from "./constants";

export const validateReqUser = (req: Request, handlerMessage: string) => {
  if (!req.user || !req.user.id) {
    throw new HttpError(`Missing token: ${handlerMessage}`, STATUS_CODES.UNAUTHORIZED)
  }

  if (!Types.ObjectId.isValid(req.user.id)) {
    throw new HttpError(`Invalid token: ${handlerMessage}`, STATUS_CODES.VALIDATION_ERROR)
  }

  return req.user.id
}