# Project overview

This project is the frontend interface for a hotel room booking system, aimed at providing a seamless and user-friendly experience for customers of `Eg Hotel`. The interface allows users to easily browse, select, and book rooms, enhancing their overall booking journey.

## Key Goals

- Offer a clean, intuitive user interface for easy room selection and booking.
- Improve user engagement with visually appealing design and straightforward navigation.
- Enable responsive design for optimal use on both desktop and mobile devices.

## Key Features

- Room Browsing: Users can browse rooms with filters for date, room type, amenities, and price.
- Booking Process: A simple, multi-step booking flow guides users through selecting a room, providing details, and confirming the booking.
- User Authentication: Allows users to log in, create profiles, and view their booking history.
- Responsive Design: Ensures usability and a consistent experience across devices.

## Core functionalities

1. Room Search and Filtering

   - Users can search for available rooms based on check-in and check-out dates, room type, and number of guests.
   - Advanced filters allow users to narrow down options by amenities, price range, and other preferences.

2. Room Details and Gallery

   - Detailed room descriptions with high-quality images, amenities, and guest reviews for each room type.
   - Users can view pricing information and room availability in real-time.

3. Booking Process

   - A user-friendly booking flow guiding users through room selection, date confirmation, and res ervation details.
   - A summary of booking details for final review before confirming the reservation.

4. Online Payment via Stripe

   - Secure and seamless payment integration using Stripe.
   - Allows users to pay with various payment methods, providing receipts and payment confirmations.

5. Booking History and Profile Management

   - Registered users can view their past bookings, manage upcoming reservations, and cancel or modify bookings (if allowed by hotel policy).
   - Profile management enables users to update personal details, view loyalty points, and redeem discounts.

6. Loyalty Program (Optional)

   - Users can earn loyalty points for each booking, which can be redeemed for discounts on future reservations.
   - Display loyalty level and benefits on the user profile page.

7. Special Offers and Discounts

   - Display current promotions, special offers, or packages available for select room types or dates.
   - Allows users to apply discount codes during the booking process for a customized pricing experience.

8. Multi-language and Multi-currency Support

   - Provides options for users to view content in their preferred language.
   - Currency conversion based on user location to show accurate pricing.

9. Feedback and Review System

   - Allows guests to leave feedback after their stay, helping new users make informed decisions.
   - Hotel staff can moderate and respond to reviews to improve customer satisfaction.

10. Real-Time Notifications

    - Sends notifications for booking confirmations, payment receipts, and reminders for upcoming stays.
    - Provides updates on special deals and last-minute availability for loyal customers.

## System Requirements

- NodeJS 18 or higher
- NextJS 14

## Current file structure

- `src/app/components` is the folder for reusable components
- `src/app/features` is the folder for features
- `src/app/hooks` is the folder for hooks
- `src/app/lib` is the folder for libraries
- `src/app/types` is the folder for types

## Quick Start

1. Install pnpm: `npm install -g pnpm`
2. Install dependencies: `pnpm install`
3. Run the development server: `pnpm run dev`
4. Access the application at `http://localhost:3000`
