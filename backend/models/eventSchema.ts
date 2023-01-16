import * as mongoose from "mongoose";

export const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    location: { type: String, required: true },
    notes: String,
    shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shift" }],
  },
  { collection: "Events" }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;
