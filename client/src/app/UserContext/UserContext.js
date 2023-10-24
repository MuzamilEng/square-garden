import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGetHomeContentQuery } from '../store/storeApi';

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { data } = useGetHomeContentQuery();
  const [content, setContent] = useState([]);
  const [handleresult, setHandleResult] = useState(null)
  const [contentdetails, setContentdetails] = useState({
    headerTitle: '',
    headerText: '',
    headerImage: '',
    rentRoom: '',
    privateRoom: '',
    mainImage1: '',
    mainImage2: '',
    mainImage3: '',
    mainImage4: '',
    mainDescription: '',
    mainLocation: '',
    mainCommunity: '',
    mainPara: '',
    bannerText: '',
    bannerButton: '',
    sectionTitle: '',
    sectionText: '',
    footerLinks: [],
    footerDescription: '',
    footerText: '',
    footerLogoImage: '',
  })

  useEffect(() => {
    setContent(data);
    // console.log(content, 'data');
  }, [data, content, contentdetails]);
  useEffect(() => {
  }, [handleresult]);

  // console.log(content, 'data');

  return (
    <UserContext.Provider value={{ content, setContent, contentdetails, setContentdetails, setHandleResult }}>
      {children}
    </UserContext.Provider>
  );
};
