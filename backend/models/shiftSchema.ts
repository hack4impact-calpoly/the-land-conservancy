import * as mongoose from 'mongoose';

export interface IShift extends mongoose.Document {
  id: Number,
  hours: Number,
};

const ShiftSchema = new mongoose.Schema(
  {
    id: Number,
    hours: Number,
  },
  { collection: "Shifts" }
);


const Shift = mongoose.model<IShift>('Shift', ShiftSchema);
export default Shift;
