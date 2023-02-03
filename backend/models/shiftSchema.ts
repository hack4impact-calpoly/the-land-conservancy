import * as mongoose from "mongoose";

const ShiftSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    hours: { type: Number, required: true },
    user: { type: String, required: true },
    userName: { type: String, required: true },
    notes: { type: String, required: false },
  },
  { collection: "Shifts" }
);

const Shift = mongoose.model("Shift", ShiftSchema);
export default Shift;
