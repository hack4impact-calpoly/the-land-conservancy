import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Shift from "../models/shiftSchema";
import Event from "../models/eventSchema";
import User from "../models/userSchema";

dotenv.config();
const router = express.Router();

// connect to s3 bucket
const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY!;
const secretAccessKey = process.env.SECRET_ACCESS_KEY!;

const s3Client = new S3Client({
  region,
  endpoint: `https://s3.${region}.amazonaws.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// set up multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// eslint-disable-next-line consistent-return
router.post("/upload", upload.single("file"), async (req: any, res: any) => {
  const { file } = req;
  // return error if file not found
  if (file === null) {
    return res.status(400).send("No file uploaded.");
  }

  const fileName = `shift_${Date.now()}`;

  const params = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: fileName,
    ContentType: file.mimetype,
  };
  try {
    // put object into s3 bucket
    await s3Client.send(new PutObjectCommand(params));
    // returns key of the image
    const url = `https://land-conservancy.s3.us-west-1.amazonaws.com/${fileName}`;
    // return url
    res.send(url);
  } catch (error) {
    res.send(error);
  }
});

// get all shifts
router.get("/", async (req: any, res: any) => {
  try {
    const temp = await Shift.find({}).populate("event");
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get specific shift
router.get("/:shiftId", async (req: any, res: any) => {
  try {
    const temp = await Shift.findOne({ _id: req.params.shiftId });
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.use(express.json());

// posts a new shift to the database
router.post("/", async (req: any, res: any) => {
  const { event, hours, user, userName, notes, image } = req.body;
  let shift = new Shift({
    event,
    hours,
    user,
    userName,
    notes,
    image,
  });

  try {
    shift = await shift.save();
    const final = await shift.populate("event");
    res.json(final);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update a shift in the database
router.patch("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const options = { new: true };
    // returns the updated document
    const newShift = await Shift.findByIdAndUpdate(
      id,
      updates,
      options
    ).populate("event");

    res.json(newShift);
  } catch (error) {
    res.status(400).send(error);
  }
});

// to be used for deleting an event
export async function deleteShift(shiftId: string) {
  const temp = await Shift.findByIdAndDelete(shiftId);
  // remove this shift reference from the event's shifts
  await Event.findByIdAndUpdate(temp.event, {
    $pull: { shifts: { $in: [shiftId] } },
  });
  // and from the user's pastShifts
  await User.findByIdAndUpdate(temp.user, {
    $pull: { pastShifts: { $in: [shiftId] } },
  });
  return temp;
}

// delete shift by id + its references
router.delete("/:shiftId", async (req: any, res: any) => {
  try {
    const { shiftId } = req.params;
    const temp = deleteShift(shiftId);

    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
