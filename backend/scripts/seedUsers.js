const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL);

    console.log('Connected to MongoDB');

    // Demo users data
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

    // Check if users already exist
    for (const userData of demoUsers) {
      const existingUser = await User.findOne({ email: userData.email });

      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`✅ Created user: ${userData.email}`);
      } else {
        console.log(`⚠️  User already exists: ${userData.email}`);
      }
    }

    console.log('🎉 Database seeding completed!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding script
seedUsers();