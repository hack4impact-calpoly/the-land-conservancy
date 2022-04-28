import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema(
  {
    title: String,
    start: Date,
    end: Date,
    location: String,
    notes: String,
    shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }],
  },
  { collection: 'Events' }
);

const Event = mongoose.model('Event', EventSchema);
export default Event;
