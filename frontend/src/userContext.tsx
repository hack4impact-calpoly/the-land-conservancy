import React from 'react';
import { User } from './types';
// init with default value
// TODO: change later to empty object when we load user instead of string
const userContext = React.createContext({} as User);

export default userContext;
