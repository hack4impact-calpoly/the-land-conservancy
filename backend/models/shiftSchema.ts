import * as mongoose from 'mongoose';

const ShiftSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Events' },
    hours: Number,
    user: mongoose.Schema.Types.ObjectId,
  },
  { collection: 'Shifts' }
);

const Shift = mongoose.model('Shift', ShiftSchema);
export default Shift;
