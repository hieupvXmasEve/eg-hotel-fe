import { CalendarDays, CreditCard, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ViewOrder() {
  // In a real application, you would fetch this data from an API
  const orderDetails = {
    orderNumber: "ORD-12345",
    room: {
      name: "Deluxe Ocean View",
      type: "Double Room",
      amenities: ["Ocean View", "King Bed", "Free Wi-Fi", "Room Service"],
    },
    checkIn: "2024-07-15",
    checkOut: "2024-07-20",
    guests: {
      adults: 2,
      children: 1,
    },
    payment: {
      total: 1250.0,
      status: "Paid",
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Booking Confirmation</CardTitle>
          <CardDescription>Order #{orderDetails.orderNumber}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Room Details</h3>
            <p className="text-xl font-bold">{orderDetails.room.name}</p>
            <p className="text-muted-foreground">{orderDetails.room.type}</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
              {orderDetails.room.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <div className="flex items-start justify-between">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Check-in</h3>
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5" />
                <span>{orderDetails.checkIn}</span>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Check-out</h3>
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5" />
                <span>{orderDetails.checkOut}</span>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="mb-2 text-lg font-semibold">Guests</h3>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <span>
                {orderDetails.guests.adults} Adults,{" "}
                {orderDetails.guests.children} Children
              </span>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="mb-2 text-lg font-semibold">Payment</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                <span>Total Paid</span>
              </div>
              <span className="font-bold">
                ${orderDetails.payment.total.toFixed(2)}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Status: {orderDetails.payment.status}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Modify Booking</Button>
          <Button variant="destructive">Cancel Booking</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
