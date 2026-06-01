import React from 'react';

import {useContext, useState} from 'react';

const MyContext = React.createContext();

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
const MyContextProvider = ({children}) => {
  const [globalProfileData, setGlobalProfileData] = useState({});

  return <MyContext.Provider value={{}}>{children}</MyContext.Provider>;
};

export default MyContextProvider;
