import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

  return (
    <UserContext.Provider value={{  }}>
      {children}
    </UserContext.Provider>
  );
};
