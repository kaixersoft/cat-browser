import { useState, useEffect } from "react";

export default function useCatBreeds() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        const data = await response.json();
        const catBreeds = data.map((breed: { id: string; name: string }) => ({
          value: breed.id,
          label: breed.name,
        }));
        setBreeds(catBreeds);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setLoading(false);
    };

    fetchBreeds();
  }, []);

  return { breeds, loading, error };
}
