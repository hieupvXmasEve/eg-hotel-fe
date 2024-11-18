"use server";

import ApiClient from "@/lib/client";
import { AxiosResponse } from "axios";

const api = new ApiClient("en", "usd");

interface BookingRegisterProps {
  roomBookings: RoomBooking[];
  checkinPerson: CheckinPerson;
}

interface RoomBooking {
  roomId: number;
  checkIn: string | Date;
  checkOut: string | Date;
  adults: number;
  children: number;
  customerNote?: string;
}

interface CheckinPerson {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: number;
}
interface BookingRegisterResponse {
  booking_id: number;
  total_price: number;
  payment_status: number;
}
export async function bookingRegister(dataBody: BookingRegisterProps): Promise<{
  data: BookingRegisterResponse | null;
  success: boolean;
  status: number;
}> {
  try {
    const response: AxiosResponse<BookingRegisterResponse> = await api.fetch(
      "/api/booking/register",
      {
        method: "POST",
        headers: {
          Language: "en",
          Currency: "usd",
          Platform: "web",
        },
        data: dataBody,
      },
    );

    return {
      success: true,
      data: response.data,
      status: 1,
    };
  } catch (error) {
    console.error("Booking register failed:", error);
    return { success: false, data: null, status: 500 };
  }
}
