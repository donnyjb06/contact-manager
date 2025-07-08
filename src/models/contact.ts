import { Schema, model } from 'mongoose';
import { Contact, Contact as ContactType } from '../types';

const contactSchema: Schema<ContactType> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      
    },
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, "Please add the contact's first name"],
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, "Please add the contact's last name"],
    },
    phoneNumber: {
      type: String,
      minlength: 10,
      maxlength: 15,
      validate: {
        validator: (v: string) => {
          return /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v);
        },
        message: (props: any) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "Please add the contact's phone number"],
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 50,
      validate: {
        validator: (v: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props: any) => `${props.value} is not a valid email address`,
      },
      required: [true, "Please add the contact's email address"],
    },
  },
  {
    timestamps: true,
  },
);

const Contact = model<ContactType>('Contact', contactSchema);

export { Contact };
