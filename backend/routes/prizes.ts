import express from 'express';
import Prize from '../models/prizeSchema';

export {};

const router = express.Router();

router.use(express.json());

// get all prizes
router.get('/', async (req: any, res: any) => {
  try {
    const temp = await Prize.find({});
    res.send(temp);
  } catch (error) {
    res.status(400).send(error);
  }
});

// put a prize into the database
// returns the updated prize
router.patch('/:id', async (req: any, res: any) => {
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

export default router;
