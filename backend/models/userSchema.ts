import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: String,
    isAdmin: Boolean,
    name: String,
    email: String,
    phone: String,
    pastShifts: [mongoose.Schema.Types.ObjectId],
    totalHours: Number,
  },
  { collection: 'Users' }
);

const User = mongoose.model('User', UserSchema);
export default User;
