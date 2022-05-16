import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    isAdmin: Boolean,
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    pastShifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }],
  },
  { collection: 'Users' }
);

const User = mongoose.model('User', UserSchema);
export default User;
