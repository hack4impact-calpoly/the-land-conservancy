import express from 'express';
import User from '../models/userSchema';

const router = express.Router();

// get all users
router.get('/', async (req: any, res: any) => {
  try {
    const temp = await User.find({});
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get specific user
router.get('/:userId', async (req: any, res: any) => {
  try {
    const temp = await User.findById(req.params.userId).populate({
      path: 'pastShifts',
      populate: 'event',
    });
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.use(express.json());

// posts a new user to the database
router.post('/', async (req: any, res: any) => {
  const { _id, isAdmin, name, email, phone, pastShifts, totalHours } = req.body;
  let user = new User({
    _id,
    isAdmin,
    name,
    email,
    phone,
    pastShifts,
    totalHours,
  });

  try {
    user = await user.save();
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// patch a user (will replace the fields passed in through the req.body)
router.patch('/:userId', async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updates);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// put new shift into user's past shifts + update hours
router.put('/:userId', async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $inc: { totalHours: updates.numHours },
      $push: { pastShifts: updates.shiftId },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete user by id
router.delete('/:userId', async (req: any, res: any) => {
  try {
    const temp = await User.findByIdAndDelete(req.params.userId);
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
