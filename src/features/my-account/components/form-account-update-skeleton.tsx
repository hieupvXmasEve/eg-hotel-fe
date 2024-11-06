import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FormAccountUpdateSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          <Skeleton className="h-8 w-48" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-72" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Gender skeleton */}
          <div className="col-span-2 space-y-2">
            <Skeleton className="h-4 w-16" />
            <div className="flex space-x-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>

          {/* First name & Last name skeletons */}
          <div className="col-span-2 space-y-2 md:col-span-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="col-span-2 space-y-2 md:col-span-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Birthday & Email skeletons */}
          <div className="col-span-2 space-y-2 md:col-span-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="col-span-2 space-y-2 md:col-span-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Phone skeleton */}
          <div className="col-span-2 space-y-2 md:col-span-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Newsletter checkboxes skeleton */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>

          {/* Button skeleton */}
          <div className="col-span-2 flex items-center justify-center">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
