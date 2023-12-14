import React from "react";

export type CatBreedType = {
  name: string;
  origin: string;
  temperament: string;
  description: string;
};

export type CatContextType = {
  cats: Array<{ id: string; url: string; breeds: Array<CatBreedType> }>;
  selectedBreed: string | null;
  setSelectedBreed: React.Dispatch<React.SetStateAction<string | null>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
};
