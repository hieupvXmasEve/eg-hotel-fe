"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Mock data for invoices
const invoices = [
  {
    id: 1,
    orderReference: "PDTTCFXRA",
    date: "2023-07-01",
    totalPrice: 1200,
    status: "payment accepted",
    details: [
      {
        roomImage: "/images/room-1.jpg",
        roomName: "Deluxe Ocean View",
        hotelName: "Egerton Hotel",
        roomCapacity: "2 adults",
        checkIn: "2023-07-01",
        checkOut: "2023-07-05",
        totalPrice: 1200,
      },
    ],
  },
];
interface Invoice {
  id: number;
  orderReference: string;
  date: string;
  totalPrice: number;
  status: string;
  details: InvoiceDetail[];
}
interface InvoiceDetail {
  roomImage: string;
  roomName: string;
  hotelName: string;
  roomCapacity: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}
export default function OrderHistory() {
  const [currentInvoice, setCurrentInvoice] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [invoiceDetail, setInvoiceDetail] = useState<Invoice | null>(null);
  const handlePrevious = () => {
    setCurrentInvoice((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentInvoice((prev) => (prev < invoices.length - 1 ? prev + 1 : prev));
  };
  const handleShowDetail = (id: number) => {
    setShowDetail(true);
    setInvoiceDetail(invoices.find((invoice) => invoice.id === id) || null);
  };
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-700">Order History</h2>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-base font-semibold text-gray-700">
              Order Reference
            </TableHead>
            <TableHead className="text-base font-semibold text-gray-700">
              Date
            </TableHead>
            <TableHead className="text-base font-semibold text-gray-700">
              Total Price
            </TableHead>
            <TableHead className="text-base font-semibold text-gray-700">
              Status
            </TableHead>
            <TableHead className="w-20 text-base font-semibold text-gray-700"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.orderReference}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.totalPrice}</TableCell>
              <TableCell>
                <Badge className="capitalize">{invoice.status}</Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShowDetail(invoice.id)}
                >
                  Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentInvoice === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Invoice {currentInvoice + 1} of {invoices.length}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentInvoice === invoices.length - 1}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      {showDetail && <OrderDetail invoice={invoiceDetail} />}
    </div>
  );
}

function OrderDetail({ invoice }: { invoice: Invoice | null }) {
  console.log(invoice);
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 shadow-md">
        <p className="uppercase">Guest Details</p>
        <ul>
          <li>
            <div className="flex items-center justify-start gap-5">
              <p>Name</p>
              <p>John Doe</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
