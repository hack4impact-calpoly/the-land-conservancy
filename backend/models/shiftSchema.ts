import * as mongoose from 'mongoose';

const ShiftSchema = new mongoose.Schema(
  {
    event: String, //{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    hours: Number,
    user: String,
  },
  { collection: 'Shifts' }
);

const Shift = mongoose.model('Shift', ShiftSchema);
export default Shift;
