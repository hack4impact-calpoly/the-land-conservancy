interface Event {
  _id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  notes: string;
  shifts: string[];
}

interface Shift {
  _id: string;
  event: Event;
  hours: number;
  user: string;
}

export type { Event, Shift };
