import React from "react";
import { User } from "./types";

const defaultFields = {
  currentUser: {} as User,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (() => {}) as (user: User) => void,
};

// init with default value
const UserContext = React.createContext(defaultFields);

export default UserContext;
