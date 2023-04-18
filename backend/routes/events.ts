import express from "express";
import Event from "../models/eventSchema";
import { deleteShift } from "./shifts";

export {};

const router = express.Router();

/* gets all events or events based on search/filter query parameter */
router.get("/", async (req: any, res: any) => {
  try {
    const temp = await Event.find({});
    const searchQuery = req.query.search;
    const filterQuery = req.query.filter;

    /* if a filter query was given */
    if (filterQuery !== undefined) {
      /* returns whole string match by location, case insensitive */
      const query = await Event.find({
        location: { $regex: `^${filterQuery}$`, $options: "i" },
      });
      res.send(query);
      return;
    }

    /* if search query was given */
    if (searchQuery !== undefined) {
      /* filters events by date if query is a full valid date */
      const timestamp = Date.parse(searchQuery);
      const filteredDates: any = [];
      if (Number.isNaN(timestamp) === false) {
        /* filters events by date if only given MM/DD */
        if ((searchQuery.match(/\//g) || []).length === 1) {
          const date = new Date(searchQuery).toISOString().substring(5, 10);
          temp?.forEach((event) => {
            const startTime = event.start.toISOString().substring(5, 10);
            const endTime = event.end.toISOString().substring(5, 10);
            if (date === startTime && date === endTime) {
              filteredDates.push(event);
            }
          });
        } else {
          /* filters events by date if given MM/DD/YYYY */
          temp?.forEach((event) => {
            const startTime = event.start.toISOString().substring(0, 10);
            const endTime = event.end.toISOString().substring(0, 10);
            const date = new Date(timestamp).toISOString();
            if (date.startsWith(startTime) && date.startsWith(endTime)) {
              filteredDates.push(event);
            }
          });
        }
        res.send(filteredDates);
      } else {
        /* find all events with query in location or notes field */
        const search = await Event.find({
          $or: [
            { location: { $regex: searchQuery, $options: "$i" } },
            { notes: { $regex: searchQuery, $options: "$i" } },
          ],
        });
        res.send(search);
      }
    } else {
      res.send(temp);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

/* gets the one event given by eventid */
router.get("/:eventid", async (req: any, res: any) => {
  try {
    const temp = await Event.findOne({ _id: req.params.eventid });
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.use(express.json());

/* posts an event to the database */
router.post("/", async (req: any, res: any) => {
  try {
    const { title, start, end, location, notes, shifts } = req.body;
    let event = new Event({ title, start, end, location, notes, shifts });

    event = await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// should put new shift into shifts array
router.put("/:eventId", async (req: any, res: any) => {
  try {
    const event = req.params.eventId;
    const shift = req.body;
    const updateEvent = await Event.findByIdAndUpdate(event, {
      $push: { shifts: shift.shiftId },
    });
    res.json(updateEvent);
  } catch (error) {
    res.status(400).send(error);
    console.log(`Could not add `);
  }
});

// delete event by id
router.delete("/:eventId", async (req: any, res: any) => {
  try {
    const { eventId } = req.params;
    const thisEvent = await Event.findById(eventId);
    const { shifts } = thisEvent;

    // delete all the shifts + their references
    await Promise.all(
      shifts.map((shiftId: string) => deleteShift(`${shiftId.valueOf()}`))
    );

    // delete the event
    const temp = await Event.findByIdAndDelete(eventId);

    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

// edit event by id
router.patch("/:eventId", async (req: any, res: any) => {
  try {
    const { eventId } = req.params;
    const update = req.body;

    // finds event and updates it
    const updatedEvent = await Event.findByIdAndUpdate(eventId, update, {
      new: true,
    });
    await updatedEvent.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).send(error);
    console.log(`Could not edit `);
  }
});

export default router;
