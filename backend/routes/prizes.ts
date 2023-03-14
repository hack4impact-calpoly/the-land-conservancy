import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Prize from "../models/prizeSchema";

export {};

dotenv.config();

const router = express.Router();

router.use(express.json());

// connect to aws s3
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

// get all prizes
router.get("/", async (req: any, res: any) => {
  try {
    const temp = await Prize.find({});
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

// put a prize into the database
// returns the updated prize
router.patch("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const prizeBody = req.body;
    const newPrize = await Prize.findByIdAndUpdate(id, prizeBody, {
      new: true,
    });
    res.json(newPrize);
  } catch (error) {
    res.status(400).send(error);
  }
});

// eslint-disable-next-line consistent-return
router.post("/upload", upload.single("file"), async (req: any, res: any) => {
  const { file } = req;
  // return error if file not found
  if (file === null) {
    return res.status(400).send("No file uploaded.");
  }

  const fileName =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

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

export default router;
