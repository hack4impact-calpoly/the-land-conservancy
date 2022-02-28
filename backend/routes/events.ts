import Event from '../models/eventSchema';

export {};

const express = require('express');

const lodash = require('lodash');

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

/* deletes event by id */
router.delete('/:eventid', async (req: any, res: any) => {
  try {
    const temp = await Event.findByIdAndDelete(req.params.eventid);
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

/* patches existing event in databse with any
   information passed through req body */
router.patch('/:eventid', async (req: any, res: any) => {
  try {
    const updatedEvent = req.body;
    const eventInDb = await Event.findById(req.params.eventid);

    /* lodash used to easily combine the new event
    json object witht the existing one in the db */
    let patchedEvent = eventInDb;
    lodash.forIn(updatedEvent, (value: any, key: string) => {
      patchedEvent[key] = value;
    });

    patchedEvent = await patchedEvent.save();
    res.json(patchedEvent);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
