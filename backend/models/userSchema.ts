import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    isAdmin: Boolean,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    pastShifts: [],
    totalHours: Number,
  };

const UserSchema = new mongoose.Schema(
  {
    isAdmin: Boolean,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    pastShifts: Array,
    totalHours: Number,
  },
  { collection: "Users" }
);


const User = mongoose.model<IUser>('User', UserSchema);
export default User;
