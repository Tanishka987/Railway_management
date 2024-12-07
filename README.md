# Railway Management System

- This project is a Railway Management System API built with Node.js, Express.js, and MySQL. It fulfills the following requirements:
1. Register a User
2. Login User
3. Add a New Train
4. Get Seat Availability
5. Book a Seat
6. Get Specific Booking Details

## Setup

### Prerequisites

- Node.js installed on your machine
- MySQL server installed and running
- Git (optional)

### Installation

1. **Clone the repository:**

2. **Navigate to the project directory:**
   cd railway-management-system

3. **Install dependencies:**
   npm install

4. **Configure the database:**

   - Create a MySQL database named railway_management.
   - Update the database configuration in the config.js file.

5. **Start the server:**
   npm start

**The server is started at http://localhost:3000.**

### Endpoints

**Register user**: C:\Users\Tanishka>curl -X POST http://localhost:3000/api/users/register -H "Content-Type: application/json" -d "{\"username\": \"sahil\",\"email\":\"sahil@gmail.com\", \"password\": \"sahil123\"}"

**login user**: curl -X POST http://localhost:3000/api/users/login -H "Content-Type: application/json" -d "{\"email\": \"sahil@gmail.com\", \"password\": \"sahil123\"}"
After login you get a authorization token, save it in env as USER_TOKEN.
**Add a New Train**: curl -X POST http://localhost:3000/api/trains -H "Content-Type: application/json" -H "Authorization: Bearer ADMIN_TOKEN" -d "{\"source\": \"Dehradun\", \"destination\": \"Mumbai\", \"total_seats\": 100}"
ADMIN_TOKEN is saved in env file. 
seat avalibilty:curl -X GET "http://localhost:3000/api/bookings/seatsAvailability?source=CityA&destination=CityB" -H "Authorization: Bearer YOUR_USER_TOKEN_HERE"
book a seat: curl -X POST http://localhost:3000/api/bookings/ -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_USER_TOKEN_HERE" -d "{\"train_id\": 1, \"user_id\": 1}"

get specific booking details : curl -X GET http://localhost:3000/api/bookings/123 -H "Authorization: Bearer YOUR_USER_TOKEN_HERE"


