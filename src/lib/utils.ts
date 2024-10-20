import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface Occupancy {
  adults?: string;
  children?: string;
}

export type Result = Occupancy[] | [];

export function convertQueryStringToJson(queryString: string): Result {
  if (!queryString) return [];

  // Decode the query string
  const decodedString = decodeURIComponent(queryString);

  // Use URLSearchParams to parse the query string
  const paramsString = new URLSearchParams(decodedString);

  // Initialize the result object
  const result: { rooms: { adults?: string; children?: string }[] } = {
    rooms: [],
  };

  // Iterate through the parameters and build the JSON structure
  paramsString.forEach((value, key) => {
    const match = key.match(/rooms\[(\d+)\]\[(.+)\]/);
    if (match) {
      const index = parseInt(match[1]);
      const field = match[2];

      // Ensure the rooms array has an object for the index
      if (!result.rooms[index]) {
        result.rooms[index] = {};
      }

      // Assign the value to the appropriate field
      result.rooms[index][field as keyof Occupancy] = value;
    }
  });

  return result.rooms;
}
