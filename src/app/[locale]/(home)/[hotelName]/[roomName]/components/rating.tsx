import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

export default function Rating({ value }: { value: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= Math.floor(value) ? (
            <StarFilledIcon className="h-4 w-4" />
          ) : star === Math.ceil(value) && !Number.isInteger(value) ? (
            <div className="relative">
              <StarIcon className="h-4 w-4" />
              <div
                className="absolute left-0 top-0 overflow-hidden"
                style={{ width: `${(value % 1) * 100}%` }}
              >
                <StarFilledIcon className="h-4 w-4" />
              </div>
            </div>
          ) : (
            <StarIcon className="h-4 w-4" />
          )}
        </span>
      ))}
    </div>
  );
}
