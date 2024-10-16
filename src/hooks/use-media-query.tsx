import { useState, useEffect } from "react";

//   const isDesktop = useMediaQuery("(min-width: 768px)")
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    setMatches(mediaQuery.matches);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
