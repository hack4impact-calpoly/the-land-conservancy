import * as mongoose from 'mongoose';

const PrizeSchema = new mongoose.Schema(
  {
    _id: Number,
    itemName: String,
    sponsorName: String,
    sponsorImage: String,
  },
  { collection: 'Prizes' }
);

const Prize = mongoose.model('Prize', PrizeSchema);
export default Prize;
