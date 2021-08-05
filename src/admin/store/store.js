import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  loading: false,
  error: false,
};

const adminStoreContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'setState':
      return { ...state, ...action.payload };
    case 'systemConfig':
      return { ...state, systemConfig: action.payload };
    case 'years':
      return { ...state, years: action.payload };
    case 'loading':
      return { ...state, loading: action.payload };
    case 'error':
      return { ...state, error: action.payload };
    default:
      const err = `${action.type} action has not been asigned.`;
      throw new Error(err);
  }
};

export const AdminStoreProvider = ({ children }) => {
  const { Provider } = adminStoreContext;
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export const useAdminStore = () => {
  return useContext(adminStoreContext);
};
