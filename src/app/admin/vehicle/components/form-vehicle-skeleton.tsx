"use client"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FormVehicleSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-3">
        <Card className="w-full max-w-7xl mx-auto col-span-3">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-64 mt-2" />
              </div>
              <Skeleton className="w-32 h-10" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <footer className="col-span-full mt-3">
          <Skeleton className="w-full h-10" />
        </footer>
      </div>
    </div>
  );
}
