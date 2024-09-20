import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function RoomCardSkeleton() {
  return (
    <Card className="w-full mx-auto">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="w-full md:w-1/3 aspect-square rounded-md" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-4 h-4 rounded-full" />
              ))}
              <Skeleton className="h-4 w-24 ml-2" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-10 w-32" />
      </CardFooter>
    </Card>
  )
}