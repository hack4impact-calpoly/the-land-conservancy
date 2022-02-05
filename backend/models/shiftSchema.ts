import * as mongoose from 'mongoose';

const ShiftSchema = new mongoose.Schema(
  {
    id: Number,
    hours: Number,
  },
  { collection: "Shifts" }
);


const Shift = mongoose.model('Shift', ShiftSchema);
export default Shift;
