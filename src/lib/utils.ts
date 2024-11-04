import { Occupancy } from "@/features/hotels/data/search-room";
import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertQueryStringToJson(
  queryString: string,
): Occupancy[] | [] {
  if (!queryString) return [];

  // Decode the query string
  const decodedString = decodeURIComponent(queryString);

  // Use URLSearchParams to parse the query string
  const paramsString = new URLSearchParams(decodedString);

  // Initialize the result object
  const result: { rooms: { adults?: number; children?: number }[] } = {
    rooms: [],
  };

  // Iterate through the parameters and build the JSON structure
  paramsString.forEach((value, key) => {
    const match = key.match(/rooms\[(\d+)\]\[(.+)\]/);
    if (match) {
      const index = parseInt(match[1]!);
      const field = match[2];

      // Ensure the rooms array has an object for the index
      if (!result.rooms[index]) {
        result.rooms[index] = {};
      }

      // Assign the value to the appropriate field
      result.rooms[index][field as keyof Occupancy] = Number(value);
    }
  });

  return result.rooms as Occupancy[] | [];
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch {
    return true;
  }
};
export const convertNewsletter = (newsletter: string[]) => {
  //if no newsletter, return 0
  // if newsletter has 2 items return 4
  // if newsletter has 1 item and item is promotion return 1
  // if newsletter has 1 item and item is event return 2
  if (newsletter.length === 0) return 0;
  if (newsletter.length === 2) return 4;
  if (newsletter.length === 1 && newsletter[0] === "Promotion") return 1;
  if (newsletter.length === 1 && newsletter[0] === "Event") return 2;
  return 0;
};
