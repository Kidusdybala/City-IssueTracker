<p align="center">
  <img src="frontend/logo.png" alt="City Issue Tracker Logo" width="200" height="200">
</p>

<h1 align="center">City Issue Tracker</h1>

<p align="center">
  A comprehensive MERN stack application designed to streamline citizen-city government communication for reporting and resolving urban issues. This platform enables citizens to report problems while providing city officials with powerful tools to manage and resolve issues efficiently.
</p>

## 🚀 Features

### For Citizens
- **Easy Issue Reporting**: Submit issues with photos, location data, and detailed descriptions
- **Real-time Tracking**: Monitor issue status and resolution progress
- **Gamification Elements**: Earn points and badges for community participation
- **Interactive Map**: View reported issues geographically
- **Community Engagement**: See resolution statistics and community impact

### For City Officials
- **Administrative Dashboard**: Comprehensive issue management interface
- **Advanced Filtering**: Sort and filter issues by status, priority, category, and location
- **Status Management**: Update issue status and add resolution notes
- **Priority Assignment**: Set issue priorities for efficient resource allocation
- **Analytics Overview**: Track resolution metrics and departmental performance
- **Bulk Operations**: Efficiently manage multiple issues simultaneously

### Core Functionality
- **Role-Based Access Control**: Secure authentication with different permission levels
- **GPS Integration**: Automatic location tagging for precise issue reporting
- **Image Upload**: Support for photographic evidence
- **Real-time Updates**: Live status tracking and notifications
- **Responsive Design**: Optimized for desktop and mobile devices
- **Data Security**: Encrypted authentication and secure data handling

## 📸 Screenshots

### Citizen Dashboard
![Screenshot of the citizen dashboard displaying user statistics, recent issue reports, and earned achievements](frontend/public/citizen%20dashboard.png)
*The citizen dashboard provides a comprehensive overview of user activity, including key statistics on reported issues, recent submissions with their status, and achievements earned through active community participation. It serves as the central hub for citizens to track their contributions and stay engaged with local governance.*

### Citizen Leaderboard
![Screenshot of the community leaderboard highlighting top citizen contributors and their achievements](frontend/public/citizen%20leaderboard.png)
*The community leaderboard showcases top contributors, displaying their ranking based on issue reports and community engagement. This gamification feature encourages participation by recognizing citizens who actively help improve their city through detailed reporting and feedback.*

### Issue Reporting
![Screenshot of the intuitive issue reporting interface with photo upload and location features](frontend/public/citizens%20issue%20report.png)
*The issue reporting page offers a user-friendly form for citizens to submit urban problems. It includes fields for detailed descriptions, photo uploads for visual evidence, automatic GPS location tagging, and category selection to ensure comprehensive and accurate issue documentation.*

### Official Leaderboard Tracker
![Screenshot of the official leaderboard tracker for monitoring citizen contributions and community engagement](frontend/public/official%20leaderboard%20tracker.png)
*City officials can access this tracker to view and monitor community contributions through the leaderboard system. It provides insights into citizen participation levels and helps identify active community members who contribute significantly to local issue resolution.*

### Official Dashboard
![Screenshot of the administrative dashboard for comprehensive issue management and performance analytics](frontend/public/official%20dashboard.png)
*The official dashboard is the primary interface for city administrators to manage reported issues. It features advanced filtering options, bulk operations for efficient status updates, priority assignments, and detailed analytics on resolution metrics and departmental performance.*

### Official Reported Page
![Screenshot of the official reported issues page with filtering and status tracking capabilities](frontend/public/official%20reported%20page.png)
*This page displays all reported issues in a structured format, allowing officials to filter by status, priority, category, and location. It provides quick access to issue details, status updates, and resolution notes for streamlined issue management and tracking.*

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

### Frontend
- **React** - User interface library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Context API** - State management
- **Vite** - Build tool and development server

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server auto-restart
- **Git** - Version control
- **Postman** - API testing

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager
- **Git** for version control

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Kidusdybala/City-IssueTracker.git
cd City-IssueTracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/city-issue-tracker

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=30d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 5. Database Setup

Ensure MongoDB is running locally or update the `MONGODB_URI` to point to your MongoDB Atlas cluster.

## 🚀 Running the Application

### Development Mode

1. **Start Backend Server:**
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5000`

2. **Start Frontend Development Server:**
```bash
cd frontend
npm run dev
```
Application will be available at `http://localhost:5173`

### Production Build

1. **Build Frontend:**
```bash
cd frontend
npm run build
```

2. **Start Backend:**
```bash
cd backend
npm start
```

## 📖 Usage

### For Citizens
1. **Register/Login**: Create an account or sign in
2. **Report Issues**: Use the "Report Issue" feature to submit problems
3. **Track Progress**: Monitor issue status on your dashboard
4. **View Community Impact**: Check the leaderboard and statistics

### For City Officials
1. **Login**: Use official credentials to access the admin interface
2. **Review Issues**: Examine submitted reports in the admin dashboard
3. **Update Status**: Change issue status and add resolution notes
4. **Manage Priorities**: Assign appropriate priority levels
5. **Monitor Performance**: Track resolution metrics and departmental efficiency

## 🔌 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `GET /api/auth/leaderboard` - Get community leaderboard

### Issue Management Endpoints
- `GET /api/issues` - Get all issues (with filtering)
- `GET /api/issues/:id` - Get specific issue details
- `POST /api/issues` - Create new issue
- `PUT /api/issues/:id` - Update issue
- `DELETE /api/issues/:id` - Delete issue
- `POST /api/issues/:id/upvote` - Upvote issue
- `POST /api/issues/:id/comments` - Add comment to issue

### Administrative Endpoints
- `GET /api/issues/stats` - Get issue statistics
- `GET /api/issues/user/:userId` - Get user's issues

## 🏗️ Project Structure

```
City-IssueTracker/
├── backend/                    # Express.js API server
│   ├── config/                # Database and configuration files
│   ├── controllers/           # Business logic controllers
│   ├── middleware/            # Authentication and validation middleware
│   ├── models/               # MongoDB data models
│   ├── routes/               # API route definitions
│   ├── utils/                # Utility functions
│   ├── server.js             # Main application entry point
│   └── package.json          # Backend dependencies
├── frontend/                  # React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React context providers
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Frontend utility functions
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
├── .gitignore               # Git ignore rules
├── frontend/                # React frontend application
│   ├── public/              # Static assets
│   │   ├── citizen dashboard.png     # Citizen dashboard screenshot
│   │   ├── citizen leaderboard.png   # Citizen leaderboard screenshot
│   │   ├── citizens issue report.png # Issue reporting screenshot
│   │   ├── official leaderboard tracker.png # Official leaderboard tracker
│   │   ├── official dashboard.png    # Official dashboard screenshot
│   │   └── official reported page.png # Official reported page screenshot
│   └── ...                  # Other frontend files
└── README.md                # Project documentation
```

## 🤝 Contributing

We welcome contributions to improve the City Issue Tracker. Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure responsive design principles

## 📄 License

This project is licensed under the ISC License. See the LICENSE file for details.

## 👥 Authors

- **Kidus Dybala** - *Initial work and development*

## 🙏 Acknowledgments

- City governments and municipalities for inspiring this solution
- Open source community for providing excellent tools and libraries
- Citizens who participate in community improvement initiatives

## 📞 Support

For support, questions, or contributions, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

---

**City Issue Tracker** - Bridging the gap between citizens and city government for better community management.