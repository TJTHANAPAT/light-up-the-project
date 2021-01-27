import React, { createContext, useReducer } from 'react';

const initialState = {
  user: null,
};

const adminStore = createContext(initialState);
const { Provider } = adminStore;

const reducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      let user = action.user;
      return { ...state, user: user };
    default:
      throw new Error();
  }
};

const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { adminStore, AdminProvider };
