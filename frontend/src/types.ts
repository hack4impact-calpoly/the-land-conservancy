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

interface User {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  pastShifts: Shift[];
  phone: string;
  totalHours: number;
}

interface Prize {
  _id: number;
  itemName: string;
  sponsorName: string;
  sponsorImage: string;
}

export type { Event, Shift, User, Prize };
