const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();

// Connect to database
connectDB();

// Auto-seed demo users on startup (only in development or if explicitly enabled)
if (process.env.NODE_ENV === 'development' || process.env.SEED_DEMO_USERS === 'true') {
  const seedDemoUsers = async () => {
    try {
      const User = require('./models/User');

      const demoUsers = [
        {
          name: 'Abebe Tadesse',
          email: 'citizen@example.com',
          password: 'password',
          role: 'user',
          points: 150,
          badges: ['First Reporter'],
          isActive: true
        },
        {
          name: 'Addis Ababa Official',
          email: 'official@city.gov',
          password: 'password',
          role: 'admin',
          points: 0,
          badges: [],
          isActive: true
        }
      ];

      for (const userData of demoUsers) {
        const existingUser = await User.findOne({ email: userData.email });
        if (!existingUser) {
          const user = new User(userData);
          await user.save();
          console.log(`✅ Auto-created demo user: ${userData.email}`);
        }
      }
    } catch (error) {
      console.log('⚠️  Could not auto-seed demo users:', error.message);
    }
  };

  // Seed users after database connection
  setTimeout(seedDemoUsers, 2000); // Wait 2 seconds for DB connection
}

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:5173', // Development
      'http://localhost:3000', // Alternative dev port
      process.env.FRONTEND_URL, // Production frontend URL
      /\.vercel\.app$/, // Vercel deployments
      /\.render\.com$/, // Render deployments
    ].filter(Boolean);

    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      }
      return allowedOrigin.test(origin);
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/issues', require('./routes/issues'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;