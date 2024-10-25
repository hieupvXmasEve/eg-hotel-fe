import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderHistorySkeleton() {
  return (
    <>
      {[1, 2].map((index) => (
        <Card key={index} className="mb-4">
          <div className="flex items-center">
            <div className="relative aspect-square w-28 flex-shrink-0 p-2">
              <Skeleton className="h-full w-full rounded-lg" />
            </div>
            <CardContent className="flex flex-1 flex-col p-1 md:flex-row md:items-start md:justify-between md:pr-4">
              <div className="w-full">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-2 h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div>
                <Skeleton className="h-6 w-20" />
              </div>
            </CardContent>
          </div>
          <div className="border-t p-2">
            <Skeleton className="h-8 w-full" />
          </div>
        </Card>
      ))}
    </>
  );
}
