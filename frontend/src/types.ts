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
  notes?: string;
  image?: string;
}

// user interface for lifting state of user,
// all optional so we can clear a user on sign out

interface User {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  pastShifts: Shift[];
  phone: string;
}

interface Prize {
  _id: number;
  itemName: string;
  sponsorName: string;
  sponsorImage: string;
}

export type { Event, Shift, User, Prize };

export type DaysSelected = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];
