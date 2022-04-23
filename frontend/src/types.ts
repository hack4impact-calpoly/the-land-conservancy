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

// user interface for lifting state of user,
// all optional so we can clear a user on sign out

interface User {
  _id?: string;
  isAdmin?: boolean;
  name?: string;
  email?: string;
  phone?: string;
  pastShifts?: [string];
  totalHours?: number;
}

export type { Event, Shift, User };
