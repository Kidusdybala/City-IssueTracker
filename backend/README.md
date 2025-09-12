# City Issue Tracker - Backend

A MERN stack backend for the City Issue Tracker application.

## Features

- User authentication and authorization
- Issue reporting and management
- User profiles with points and badges system
- Leaderboard functionality
- Image upload support (Cloudinary integration)
- Real-time issue tracking
- Comment system
- Upvoting system

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage (optional)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the backend directory and configure your environment variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/city-issue-tracker
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=30d
   FRONTEND_URL=http://localhost:5173
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password
- `GET /api/auth/leaderboard` - Get leaderboard

### Issues
- `GET /api/issues` - Get all issues (with filtering)
- `GET /api/issues/:id` - Get single issue
- `POST /api/issues` - Create new issue
- `PUT /api/issues/:id` - Update issue
- `DELETE /api/issues/:id` - Delete issue
- `POST /api/issues/:id/upvote` - Upvote issue
- `POST /api/issues/:id/comments` - Add comment
- `GET /api/issues/user/:userId` - Get user's issues
- `GET /api/issues/stats` - Get issues statistics

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── issueController.js   # Issue management logic
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── User.js              # User model
│   └── Issue.js             # Issue model
├── routes/
│   ├── auth.js              # Auth routes
│   └── issues.js            # Issue routes
├── utils/                   # Utility functions
├── .env                     # Environment variables
├── package.json
├── server.js                # Main server file
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/city-issue-tracker |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration time | 30d |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.