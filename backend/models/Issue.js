const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['pothole', 'streetlight', 'garbage', 'traffic', 'water', 'sewage', 'other'],
      message: 'Please select a valid category'
    }
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    coordinates: {
      latitude: {
        type: Number,
        required: [true, 'Latitude is required'],
        min: -90,
        max: 90
      },
      longitude: {
        type: Number,
        required: [true, 'Longitude is required'],
        min: -180,
        max: 180
      }
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reporter is required']
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  department: {
    type: String,
    enum: ['roads', 'electricity', 'sanitation', 'water', 'traffic', 'other'],
    default: 'other'
  },
  estimatedResolutionTime: {
    type: Number, // in days
    min: 1,
    max: 365
  },
  resolutionNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Resolution notes cannot be more than 500 characters']
  },
  resolvedAt: {
    type: Date
  },
  upvotes: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [300, 'Comment cannot be more than 300 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
issueSchema.index({ location: '2dsphere' });
issueSchema.index({ category: 1, status: 1 });
issueSchema.index({ reporterId: 1 });
issueSchema.index({ createdAt: -1 });
issueSchema.index({ priority: -1, createdAt: -1 });
issueSchema.index({ status: 1, createdAt: -1 });

// Virtual for issue age in days
issueSchema.virtual('ageInDays').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for upvotes count
issueSchema.virtual('upvotesCount').get(function() {
  return this.upvotes.length;
});

// Virtual for comments count
issueSchema.virtual('commentsCount').get(function() {
  return this.comments.length;
});

// Pre-save middleware to set department based on category
issueSchema.pre('save', function(next) {
  const categoryToDepartment = {
    'pothole': 'roads',
    'streetlight': 'electricity',
    'garbage': 'sanitation',
    'water': 'water',
    'sewage': 'sanitation',
    'traffic': 'traffic'
  };

  if (this.category && categoryToDepartment[this.category]) {
    this.department = categoryToDepartment[this.category];
  }

  next();
});

// Static method to get issues by location
issueSchema.statics.findNearby = function(longitude, latitude, maxDistance = 5000) {
  return this.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance
      }
    }
  });
};

// Instance method to add comment
issueSchema.methods.addComment = function(userId, content) {
  this.comments.push({ userId, content });
  return this.save();
};

// Instance method to toggle upvote
issueSchema.methods.toggleUpvote = function(userId) {
  const existingVote = this.upvotes.find(vote =>
    vote.userId.toString() === userId.toString()
  );

  if (existingVote) {
    this.upvotes = this.upvotes.filter(vote =>
      vote.userId.toString() !== userId.toString()
    );
  } else {
    this.upvotes.push({ userId });
  }

  return this.save();
};

// Instance method to update status
issueSchema.methods.updateStatus = function(newStatus, resolutionNotes = '') {
  this.status = newStatus;

  if (newStatus === 'resolved') {
    this.resolvedAt = new Date();
    this.resolutionNotes = resolutionNotes;
  }

  return this.save();
};

module.exports = mongoose.model('Issue', issueSchema);