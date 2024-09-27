# Campus Management System

This project is a full-stack Campus Management System built using Express.js, MongoDB, and Passport.js for authentication. It provides functionalities for managing users (students, teachers, admins), clubs, and events within a college environment. The system supports user registration, login, and CRUD operations for clubs and events.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)

## Features

- User registration and authentication for different roles (students, teachers, admins, and clubs).
- Club management including creation and details submission.
- Event creation and retrieval associated with clubs.
- Secure password handling using bcrypt for hashing.
- Session management using express-session with cookie handling.
- MongoDB as the database to store user, club, and event information.

## Technologies Used

- **React**: JavaScript library for building user interfaces, enabling a dynamic and responsive frontend.
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user and club data.
- **Passport.js**: Authentication middleware for Node.js, supporting local strategy for different user roles.
- **bcryptjs**: Library for hashing passwords securely.
- **dotenv**: Module for managing environment variables.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.


# File Structure

## Frontend

```plaintext
my-project/
├── node_modules/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── Assets/
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── Adashboard.jsx
│   │   │   ├── ALogin.jsx
│   │   │   ├── Anotice.jsx
│   │   │   ├── Cregistration.jsx
│   │   │   ├── Sregistration.jsx
│   │   │   ├── Timetable.jsx
│   │   │   └── Tregistration.jsx
│   │   ├── authentications/
│   │   │   ├── Login.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Register.jsx
│   │   ├── club/
│   │   │   ├── AddClubDetails.jsx
│   │   │   ├── AddEventForm.jsx
│   │   │   ├── CDashboard.jsx
│   │   │   └── CLogin.jsx
│   │   ├── homepages/
│   │   │   ├── About.jsx
│   │   │   └── Homepage.jsx
│   │   ├── student/
│   │   ├── teacher/
│   │   │   └── Home.jsx
│   ├── context/
│   │   └── index.css
│   ├── App.jsx
│   ├── main.jsx
├── .gitignore
├── index.html
├── eslint.config.js
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── package-lock.json
└── package.json
```

## Backend

```
server

├── node_modules
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies for both the frontend:
   ```bash
   cd my-project
   npm install
   ```

3. Install dependencies for both the backend:
   ```bash
   cd server
   npm install
   ```

## Running the Project

1. To run the frontend, use the following command:
```bash
npm run dev
```

2. To run the frontend, use the following command:
```bash
npm start
```

### Environment Variables

Create a `.env` file in the root directory to manage environment variables. Example:
```plaintext
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus_management
SESSION_SECRET=your_secret_key
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.
