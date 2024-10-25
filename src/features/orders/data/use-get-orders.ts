export interface OrderHistory {
  id: string;
  roomNumber: string;
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  price: number;
  status: "Successful" | "Cancelled";
  image: string;
}
export async function getOrders(): Promise<OrderHistory[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: "1",
      roomNumber: "123455",
      hotelName: "EG Paradise Angkor Villa Hotel",
      location: "Cambodia",
      checkIn: "21/10/2024",
      checkOut: "22/10/2024",
      price: 59.99,
      status: "Successful",
      image: "/images/room-type-1.jpg",
    },
    {
      id: "2",
      roomNumber: "123455",
      hotelName: "EG Paradise Angkor Villa Hotel",
      location: "Cambodia",
      checkIn: "21/10/2024",
      checkOut: "22/10/2024",
      price: 59.99,
      status: "Cancelled",
      image: "/images/room-type-1.jpg",
    },
    {
      id: "3",
      roomNumber: "123455",
      hotelName: "EG Paradise Angkor Villa Hotel",
      location: "Cambodia",
      checkIn: "21/10/2024",
      checkOut: "22/10/2024",
      price: 59.99,
      status: "Successful",
      image: "/images/room-type-1.jpg",
    },
  ];
}
