import * as mongoose from 'mongoose';

const ShiftSchema = new mongoose.Schema(
  {
    event: [mongoose.SchemaTypes.ObjectId],
    hours: Number,
    user: [mongoose.SchemaTypes.ObjectId]
  },
  { collection: 'Shifts' }
);

const Shift = mongoose.model('Shift', ShiftSchema);
export default Shift;
