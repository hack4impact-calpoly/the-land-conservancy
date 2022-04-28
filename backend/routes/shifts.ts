import Shift from '../models/shiftSchema';

const express = require('express');

const router = express.Router();

// get all shifts
router.get('/', async (req: any, res: any) => {
  try {
    const temp = await Shift.find({});
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
  const { event, hours, user } = req.body;
  let shift = new Shift({
    event,
    hours,
    user,
  });

  try {
    shift = await shift.save();
    res.json(shift);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
