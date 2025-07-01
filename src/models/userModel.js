import mongoose from "mongoose";

const usersCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'SUPERADMIN'],
      default: 'USER'
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'carts'
    }
  }, {
    timestamps: true
});

const userModel = mongoose.model(usersCollection, userSchema);

export default userModel;