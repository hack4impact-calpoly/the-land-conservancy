import User from '../models/userSchema';

const express = require('express');

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

router.put('/:userId/test', async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    console.log(userId.totalHours);
    console.log(updates.numHours);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $inc: { totalHours: updates.numHours },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// put new shift into user's past shifts
router.put('/:userId', async (req: any, res: any) => {
  try {
    const user = req.params.userId;
    console.log(user);
    const shift = req.body;
    const updatedUser = await User.findByIdAndUpdate(user, {
      $push: { pastShifts: shift.shiftId },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).send(error);
    console.log(`Could not add x`);
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

module.exports = router;
