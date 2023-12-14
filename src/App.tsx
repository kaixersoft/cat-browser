import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import { ChildrenProps } from "./components/types/children";
import { ContextTypes } from "./components/types/context";

// Create a context
const MyContext = createContext<ContextTypes | null>(null);

// Create a provider component
export function MyProvider({ children }: ChildrenProps) {
  const [value, setValue] = useState("initial value");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

// Create a hook to use the context
export function useMyContext() {
  return useContext(MyContext);
}

function App() {
  return (
    <MyProvider>
      <Router>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </MyProvider>
  );
}

export default App;
