import Event from '../models/eventSchema';

export {};

const express = require('express');

const router = express.Router();

/* gets all events */
router.get('/', async (req: any, res: any) => {
  try {
    const temp = await Event.find({});
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

/* gets the one event given by eventid */
router.get('/:eventid', async (req: any, res: any) => {
  try {
    const temp = await Event.findOne({ _id: req.params.eventid });
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.use(express.json());

/* posts an event to the database */
router.post('/', async (req: any, res: any) => {
  try {
    const { title, start, end, location, notes, shifts } = req.body;
    let event = new Event({ title, start, end, location, notes, shifts });

    event = await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
