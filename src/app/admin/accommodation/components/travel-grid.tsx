import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, StarIcon, UsersIcon } from "lucide-react"
import placeholder from '@/assets/placeholder.png';
export default function Component() {
  const adventures = [
    {
      title: "Majestic Mountain Adventures",
      price: 83.74,
      rating: 4.2,
      location: "United States",
      dates: "14 - 15 Sep 2024",
      booked: 12,
      mainImage: placeholder.src,
      subImage1: placeholder.src,
      subImage2: placeholder.src,
    },
    // Add more adventure objects here for additional cards
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adventures.map((adventure, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={adventure.mainImage}
                  alt={adventure.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-semibold">
                  ${adventure.price}
                </div>
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-semibold flex items-center">
                  <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                  {adventure.rating}
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                  <img
                    src={adventure.subImage1}
                    alt="Sub image 1"
                    className="w-1/2 h-16 object-cover rounded-md"
                  />
                  <img
                    src={adventure.subImage2}
                    alt="Sub image 2"
                    className="w-1/2 h-16 object-cover rounded-md"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold mb-2">{adventure.title}</CardTitle>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <MapPinIcon className="w-4 h-4 mr-1" />
                {adventure.location}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <CalendarIcon className="w-4 h-4 mr-1" />
                {adventure.dates}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-500">
                <UsersIcon className="w-4 h-4 mr-1" />
                {adventure.booked} Booked
              </div>
              <Badge variant="secondary">Details</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}