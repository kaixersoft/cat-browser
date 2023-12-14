import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/home";
import CatDetailsPage from "./pages/cat-details";
import { ChildrenProps } from "./components/types/children";
import { CatContextType } from "./components/types/cat-context";
import useCatImages from "./hooks/use-catimages";

const CatContext = createContext<CatContextType | undefined>(undefined);

function CatProvider({ children }: ChildrenProps) {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const { cats, loading, error, hasMore } = useCatImages(selectedBreed, page);

  return (
    <CatContext.Provider
      value={{
        cats,
        selectedBreed,
        setSelectedBreed,
        page,
        setPage,
        loading,
        error,
        hasMore,
      }}
    >
      {children}
    </CatContext.Provider>
  );
}
export function useCatContext() {
  const context = useContext(CatContext);
  if (context === undefined) {
    throw new Error("useCatContext must be used within a CatProvider");
  }
  return context;
}

function App() {
  return (
    <CatProvider>
      <Router>
        <Routes>
          <Route path="/cat/:id" element={<CatDetailsPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </CatProvider>
  );
}

export default App;
