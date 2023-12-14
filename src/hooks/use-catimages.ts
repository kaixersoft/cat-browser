/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { CatBreedType } from "../components/types/cat-context";

export default function useCatImages(breedId: string | null, page: number) {
  const [cats, setCats] = useState<
    Array<{ id: string; url: string; breeds: Array<CatBreedType> }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prevBreedId, setPrevBreedId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (breedId !== prevBreedId) {
      setCats([]);
      setPrevBreedId(breedId);
      setHasMore(true);
    }
    const fetchCats = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${breedId}`,
          {
            headers: {
              "x-api-key":
                "live_URd4UzKv9DOy9g6E0rcU8qfq6chbT9GOLekYc1CcwP6kElLrz6VYaNIckwajNCtp",
            },
          }
        );
        const data = await response.json();
        if (page === 1) {
          setCats(data);
        } else {
          setCats((prevCats) => {
            const prevIds = new Set(prevCats.map((cat) => cat.id));
            const newCats = data.filter(
              (cat: { id: string }) => !prevIds.has(cat.id)
            );
            if (newCats.length === 0) {
              setHasMore(false);
            }
            return [...prevCats, ...newCats];
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(
            "Apologies but we could not load new cats for you at this time! Miau!"
          );
        }
      }
      setLoading(false);
    };

    if (breedId && hasMore) {
      fetchCats();
    }
  }, [breedId, page, hasMore]);

  return { cats, loading, error, hasMore };
}
