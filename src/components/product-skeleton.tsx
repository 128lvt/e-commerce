import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductSkeleton() {
  return (
    <Card className="w-full overflow-hidden rounded-lg bg-gradient-to-br from-red-50 to-green-100 shadow-lg">
      <CardHeader className="p-3 sm:p-4">
        <Skeleton className="h-5 w-3/4" />
      </CardHeader>
      <CardContent className="p-0">
        <Skeleton className="aspect-square w-full" />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-3 sm:p-4">
        <div className="flex w-full flex-col items-start justify-between gap-1 sm:flex-row sm:items-center">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-between">
          <Skeleton className="h-8 w-full sm:w-24" />
          <Skeleton className="h-8 w-full sm:w-24" />
        </div>
      </CardFooter>
    </Card>
  )
}
