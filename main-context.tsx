import React, { createContext, useContext, useState } from "react";

const MyContext = createContext(null);

export function MyProvider({ children }) {
  const [value, setValue] = useState("initial value");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
