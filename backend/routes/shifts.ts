import Shift from '../models/shiftSchema';

const express = require('express');

const lodash = require('lodash');

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
  const { event, hours, users } = req.body;
  let shift = new Shift({
    event,
    hours,
    users,
  });

  try {
    shift = await shift.save();
    console.log(shift);
    res.json(shift);
  } catch (error) {
    res.status(400).send(error);
  }
});

/* deletes event by id */
router.delete('/:shiftid', async (req: any, res: any) => {
  try {
    const temp = await Shift.findByIdAndDelete(req.params.shiftid);
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

/* patches existing event in databse with any
   information passed through req body */
router.patch('/:shiftid', async (req: any, res: any) => {
  try {
    const updatedShift = req.body;
    const shiftInDb = await Shift.findById(req.params.shiftid);

    /* lodash used to easily combine the new event
    json object witht the existing one in the db */
    let patchedShift = shiftInDb;
    lodash.forIn(updatedShift, (value: any, key: string) => {
      patchedShift[key] = value;
    });

    patchedShift = await patchedShift.save();
    res.json(patchedShift);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
