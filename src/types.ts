import { JwtPayload } from "jsonwebtoken"
import { Schema } from "mongoose"

interface Contact {
  user: Schema.Types.ObjectId | DecodedUser
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string
}

interface DecodedUser extends JwtPayload {
  username: string,
  email: string,
  id: string
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser
    }
  }
}

export { Contact, DecodedUser }