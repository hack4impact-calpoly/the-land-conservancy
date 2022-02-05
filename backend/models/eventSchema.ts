import * as mongoose from 'mongoose';

// export interface IEvent extends mongoose.Document {
//     title: String,
//     start: Date,
//     end: Date,
//     location: String,
//     notes: String,
//     shifts: [],
// };

export const EventSchema = new mongoose.Schema(
  {
    title: String,
    start: Date,
    end: Date,
    location: String,
    notes: String,
    shifts: Array,
  },
  { collection: "Events" }
);

const Event = mongoose.model('Event', EventSchema);
export default Event;
