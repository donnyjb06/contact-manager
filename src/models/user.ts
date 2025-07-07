import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: [true, "Email address already exists"],
    validate: {
      validator: (v: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    minlength: [4, "Password must be at least 4 characters"],
    maxlength: [64, "Password must be less than 64 characters"],
    required: [true, "Please provide the user's password"]
  }
}, {timestamps: true})

export const User = model("user", userSchema)