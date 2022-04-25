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
  userName: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  pastShifts: Shift[];
  phone: string;
  totalHours: number;
}

export type { Event, Shift, User };
