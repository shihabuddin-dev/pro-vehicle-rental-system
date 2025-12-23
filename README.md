# Pro Vehicle Rental System

**Small vehicle rental REST API built with Node.js, TypeScript, Express and PostgreSQL.**

---

## 🔧 Project Summary

This is a simple backend for a vehicle rental system that supports:
- User management (Admin / Customer)
- Vehicle management and availability
- Booking lifecycle (create bookings, auto-activate, auto-return, return/cancel)
- Constraints preventing deletion of resources with active bookings

The project uses plain SQL queries with `pg` and initializes DB tables automatically on startup.

---

## ⚙️ Tech Stack

- Node.js + TypeScript
- Express
- PostgreSQL (pg)
- pnpm

## 📦 Packages

**Dependencies:**
- bcryptjs ^3.0.3
- dotenv ^17.2.3
- jsonwebtoken ^9.0.3
- pg ^8.16.3

**Dev Dependencies:**
- @types/express ^5.0.6
- @types/jsonwebtoken ^9.0.10
- @types/pg ^8.16.0
- express ^5.2.1
- tsx ^4.21.0
- typescript ^5.9.3

---

## 📁 Project Structure (important files)

- `src/server.ts` - app bootstrap and booking lifecycle scheduler
- `src/config/db.ts` - DB pool and table creation
- `src/config/index.ts` - env configuration
- `src/modules/user/*` - user controllers and services
- `src/modules/vehicle/*` - vehicle controllers and services
- `src/modules/booking/*` - booking controllers and services (booking lifecycle logic)
- `src/middleware/*` - express middleware

---

## 🔑 Environment

Create a `.env` file at project root with at least:

```
CONNECTION_STR=postgres://user:password@host:port/dbname
PORT=5000
JWT_SECRET=your_jwt_secret
```

Then install and start:

```bash
pnpm install
pnpm dev
```

The DB initialization runs on start and will create `users`, `vehicles`, and `bookings` tables if missing.

---

## 🗄 Database Schema (core parts)

Users
- id SERIAL PRIMARY KEY
- name, email, password, phone, role

Vehicles
- vehicle_id SERIAL PRIMARY KEY
- name, type, model, registration_number, rental_price
- status CHECK IN ('available','booked','rented','maintenance')

Bookings
- booking_id SERIAL PRIMARY KEY
- user_id (FK -> users)
- vehicle_id (FK -> vehicles)
- start_date, end_date
- status CHECK IN ('pending','confirmed','active','completed','returned','cancelled')
- total_cost

---

## 🚀 Booking Lifecycle & Rules

- Creating a booking:
  - Validates vehicle is `available` and computes `total_cost`.
  - Inserts booking with default status `pending` (or `confirmed` depending on flow).
  - Updates vehicle status to `booked`.

- When booking `start_date` is reached:
  - Scheduler marks it `active` and sets the vehicle status to `rented`.

- When `end_date` has passed:
  - Scheduler marks booking `returned` and sets vehicle to `available` if there are no other active/booked bookings for that vehicle.

- Manual actions available via endpoints:
  - Mark returned -> booking status becomes `returned` and vehicle may become `available`.
  - Cancel booking -> booking status becomes `cancelled` and vehicle may become `available`.

- Deletion constraints:
  - Users cannot be deleted if they have active bookings (status `active`).
  - Vehicles cannot be deleted if they have active bookings (status `active`).

---

## 📌 Important API Endpoints

> Full API reference with examples: [`API.md`](./API.md)

Base path: `/api/v2`

Users
- POST `/api/v2/users` - create user
- GET `/api/v2/users` - list users
- GET `/api/v2/users/:id` - single user
- PUT `/api/v2/users/:id` - update user
- DELETE `/api/v2/users/:id` - delete user (will fail if user has active bookings)

Vehicles
- POST `/api/v2/vehicles` - add vehicle
- GET `/api/v2/vehicles` - list vehicles
- GET `/api/v2/vehicles/:id` - single vehicle
- PUT `/api/v2/vehicles/:id` - update vehicle
- DELETE `/api/v2/vehicles/:id` - delete vehicle (will fail if vehicle has active bookings)

Bookings
- POST `/api/v2/add-new-booking` - create booking
  - Payload sample:
    ```json
    {
      "user_id": 1,
      "vehicle_id": 2,
      "start_date": "2025-12-28",
      "end_date": "2025-12-30"
    }
    ```
- GET `/api/v2/get-all-booking` - fetch bookings with customer & vehicle names
- POST `/api/v2/:id/return` - mark booking returned
- POST `/api/v2/:id/cancel` - cancel booking

---

## ✅ Example: JOIN Query (Booking info with customer & vehicle names)

The app includes a query that returns the requested columns:

```sql
SELECT b.booking_id, u.name AS customer_name, v.name AS vehicle_name,
       b.start_date, b.end_date, b.status
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
ORDER BY b.booking_id;
```

Expected result columns: `booking_id | customer_name | vehicle_name | start_date | end_date | status`.

---

## 🔁 Scheduler / Auto-Return

On server startup the app runs a lifecycle job and schedules it to run periodically (hourly by default). The job:
- Activates bookings whose `start_date` <= today (status -> `active`) and updates vehicle status -> `rented`.
- Marks bookings whose `end_date` < today as `returned` and updates vehicle to `available` if applicable.

---

## 🧪 Testing & Manual Checks

Use `curl` or Postman to exercise endpoints. Example - create a booking with `curl`:

```bash
curl -X POST https://pro-vehicle-rental-system.vercel.app/api/v2/add-new-booking \
  -H "Content-Type: application/json" \
  -d '{"user_id":1, "vehicle_id":2, "start_date":"2025-12-28", "end_date":"2025-12-30"}'
```

Check vehicle status afterwards:
- GET `/api/v2/vehicles/:id` should show `booked` after successful booking.

---

## 💡 Tips and Notes

- The DB `initDB()` creates tables on startup. If you need to change enum-like status values, update `src/config/db.ts` and reset the DB in development.
- Error messages for prevented deletions: `Cannot delete user with active bookings` or `Cannot delete vehicle with active bookings`.

---

## 🤝 Contributing

- Make changes on a feature branch, add tests where appropriate and create a PR.

---

If you'd like, I can also add a `Postman` collection and example requests or add more detailed developer notes about internal services and functions — tell me which you want next.

---

## 👨‍💻 Developer

Built by **Shihab Uddin**

- Portfolio: https://shihab-dev.web.app/
- LinkedIn: https://www.linkedin.com/in/shihab-dev

Thank you for using this project — contributions and feedback are welcome!
