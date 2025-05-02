import React, { createContext, useState, useContext } from 'react';

// Create a Context
const UserContext = createContext();

// Custom Hook to access the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [profilePic, setProfilePic] = useState(null);

  return (
    <UserContext.Provider value={{ profilePic, setProfilePic }}>
      {children}
    </UserContext.Provider>
  );
};
