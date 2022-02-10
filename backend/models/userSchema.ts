import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    isAdmin: Boolean,
    name: String,
    email: String,
    phone: String,
    pastShifts: [mongoose.SchemaTypes.ObjectId],
    totalHours: Number,
  },
  { collection: 'Users' }
);

const User = mongoose.model('User', UserSchema);
export default User;
