import React, { createContext, useContext, useState } from 'react';

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedNavCity, setSelectedNavCity] = useState();

  const selectCity = (city) => setSelectedNavCity(city);

  return (
    <CityContext.Provider value={{ selectedNavCity, selectCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
