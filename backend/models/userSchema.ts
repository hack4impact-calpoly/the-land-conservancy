import * as mongoose from 'mongoose';

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


const User = mongoose.model('User', UserSchema);
export default User;
