import User from '../models/userSchema';

const express = require('express');

const lodash = require('lodash');

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
    const temp = await User.findOne({ _id: req.params.userId });
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
router.patch('/patch/:userid', async (req: any, res: any) => {
  try {
    const updatedUser = req.body;
    const userInDb = await User.findById(req.params.userid);

    let patchedUser = userInDb;
    lodash.forIn(updatedUser, (value: any, key: string) => {
      patchedUser[key] = value;
    });

    patchedUser = await patchedUser.save();
    res.json(patchedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete user by id
router.delete('/delete/:userId', async (req: any, res: any) => {
  try {
    const temp = await User.deleteOne({ _id: req.params.userId });
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
