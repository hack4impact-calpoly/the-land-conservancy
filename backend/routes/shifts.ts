import Shift from '../models/shiftSchema';
import Event from '../models/eventSchema';
import User from '../models/userSchema';

const express = require('express');

const router = express.Router();

// get all shifts
router.get('/', async (req: any, res: any) => {
  try {
    const temp = await Shift.find({}).populate('event');
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get specific shift
router.get('/:shiftId', async (req: any, res: any) => {
  try {
    const temp = await Shift.findOne({ _id: req.params.shiftId });
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.use(express.json());

// posts a new shift to the database
router.post('/', async (req: any, res: any) => {
  const { event, hours, user, userName } = req.body;
  let shift = new Shift({
    event,
    hours,
    user,
    userName,
  });

  try {
    shift = await shift.save();
    console.log(shift);
    res.json(shift);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update a shift in the database
router.patch('/:id', async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const newShift = await Shift.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.json(newShift);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete shift by id + its references
router.delete('/:shiftId', async (req: any, res: any) => {
  try {
    const { shiftId } = req.params;
    const temp = await Shift.findByIdAndDelete(shiftId);
    // also remove this shift reference from the event's shifts
    await Event.findByIdAndUpdate(temp.event, {
      $pull: { shifts: { _id: shiftId } },
    });
    // and from the user's pastShifts
    await User.findByIdAndUpdate(temp.user, {
      $pull: { pastShifts: { _id: shiftId } },
    });
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
