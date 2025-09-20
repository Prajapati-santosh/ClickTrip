
import React, { createContext, useState } from "react";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripPlan, setTripPlan] = useState(null);

  return (
    <TripContext.Provider value={{ tripPlan, setTripPlan }}>
      {children}
    </TripContext.Provider>
  );
};
