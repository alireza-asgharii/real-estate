import { models, model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verifiedEmail: {
    type: Boolean,
  },
  profileImage: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const User = models.User || model("User", userSchema);

export default User;
