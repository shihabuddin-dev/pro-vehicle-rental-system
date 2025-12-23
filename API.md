# API Reference — Pro Vehicle Rental System

Base path: `/api/v2`

---

## Authentication
- POST `/auth/login`
  - Body: `{ "email": string, "password": string }`
  - Success: 200 `{ success: true, message: 'Logged in', data: { token } }`

---

## Users (Admin / Customer)

- POST `/auth/register` — Create user
  - Body:
    ```json
    {
      "name": "Alice",
      "email": "alice@example.com",
      "password": "secret",
      "phone": "0123456789",
      "role": "Customer"
    }
    ```
  - Success: 201 `{ success: true, message: 'User created', data: { ...user } }`

- GET `/get-all-users` (Admin only)
  - Success: 200 `{ success: true, data: [ ...users ] }`

- GET `/get-single-users/:user_id` (Admin, Customer)
  - Success: 200 `{ success: true, data: user }`

- PUT `/update-single-user/:user_id` (Admin, Customer)
  - Body: partial user fields
  - Success: 200 `{ success: true, data: updatedUser }`

- DELETE `/delete-single-user/:user_id` (Admin)
  - Note: Fails with 400 if user has active bookings (status = `active`).

---

## Vehicles

- POST `/add-vehicle` (Admin)
  - Body:
    ```json
    {
      "name": "Toyota Corolla",
      "type": "car",
      "model": 2023,
      "registration_number": "ABC-123",
      "rental_price": 1000,
      "status": "available"
    }
    ```
  - Success: 201 `{ success: true, data: vehicle }`

- GET `/get-all-vehicle`
  - Success: 200 `{ success: true, data: [ ...vehicles ] }`

- GET `/get-all-available-vehicle/:type` (e.g., `car`)
  - Success: 200 `{ success: true, data: [ ...vehicles ] }`

- GET `/get-single-vehicle/:vehicle_id`
  - Success: 200 `{ success: true, data: vehicle }`

- PUT `/update-single-vehicle/:vehicle_id` (Admin)
  - Success: 200 `{ success: true, data: updatedVehicle }`

- DELETE `/delete-single-vehicle/:vehicle_id` (Admin)
  - Note: Fails with 400 if vehicle has active bookings (status = `active`).

---

## Bookings

- POST `/add-new-booking`
  - Body:
    ```json
    {
      "user_id": 1,
      "vehicle_id": 2,
      "start_date": "2025-12-28",
      "end_date": "2025-12-30"
    }
    ```
  - Behavior:
    - Validates vehicle is `available`.
    - Inserts booking and sets vehicle `status = 'booked'`.
  - Success: 201 `{ success: true, message: 'Booking Added Successfully', data: { ...booking } }`

- GET `/get-all-booking`
  - Response columns: `booking_id, customer_name, vehicle_name, start_date, end_date, status`
  - Success: 200 `{ success: true, data: [ ...bookings ] }`

- POST `/:id/return` — Mark booking returned
  - Success: 200 `{ success: true, message: 'Booking marked returned', data: updatedBooking }`
  - Behavior: vehicle set to `available` if no other `active` or `booked` bookings exist for that vehicle.

- POST `/:id/cancel` — Cancel booking
  - Success: 200 `{ success: true, message: 'Booking cancelled', data: updatedBooking }`
  - Behavior: vehicle set to `available` if no other `active` or `booked` bookings exist for that vehicle.

---

## Booking Lifecycle (Scheduler)
- On server startup and then hourly, the system runs a lifecycle job which:
  1. Activates bookings with `start_date <= today` (status -> `active`) and sets vehicles to `rented`.
  2. Marks bookings with `end_date < today` as `returned` and sets vehicles to `available` when appropriate.

---

## Notes & Error Patterns
- Standard error response: `400 { success: false, message: '...' }`.
- Deletion constraints return a clear message (e.g., `Cannot delete user with active bookings`).

---

## Example cURL

Create booking:

```bash
curl -X POST https://pro-vehicle-rental-system.vercel.app/api/v2/add-new-booking \
  -H "Content-Type: application/json" \
  -d '{"user_id":1, "vehicle_id":2, "start_date":"2025-12-28", "end_date":"2025-12-30"}'
```

Fetch bookings:

```bash
curl https://pro-vehicle-rental-system.vercel.app/api/v2/get-all-booking
```

Mark returned:

```bash
curl -X POST https://pro-vehicle-rental-system.vercel.app/api/v2/1/return
```

---

If you want, I can also add an OpenAPI spec or Postman collection for these endpoints. Would you like that next?