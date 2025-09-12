class IssueService {
  issues = [
    {
      id: '1',
      title: 'Large pothole on Bole Road',
      description: 'Deep pothole causing vehicle damage near intersection',
      category: 'road',
      status: 'pending',
      priority: 'high',
      location: {
        latitude: 9.1450,
        longitude: 38.7223,
        address: '123 Bole Road, Addis Ababa, Ethiopia'
      },
      photos: ['https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg'],
      reporterId: '1',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Broken streetlight',
      description: 'Street light has been out for 3 days, affecting visibility',
      category: 'electricity',
      status: 'in-progress',
      priority: 'medium',
      location: {
        latitude: 9.1500,
        longitude: 38.7300,
        address: '456 Churchill Avenue, Addis Ababa, Ethiopia'
      },
      photos: ['https://images.pexels.com/photos/2346091/pexels-photo-2346091.jpeg'],
      reporterId: '1',
      assignedTo: '2',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-16'),
    },
    {
      id: '3',
      title: 'Overflowing trash bin',
      description: 'Public trash bin is completely full and overflowing',
      category: 'waste',
      status: 'resolved',
      priority: 'low',
      location: {
        latitude: 9.1400,
        longitude: 38.7200,
        address: '789 Piazza, Addis Ababa, Ethiopia'
      },
      photos: ['https://images.pexels.com/photos/2106037/pexels-photo-2106037.jpeg'],
      reporterId: '1',
      assignedTo: '2',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-17'),
      resolvedAt: new Date('2024-01-17'),
      resolutionProof: ['https://images.pexels.com/photos/1884598/pexels-photo-1884598.jpeg']
    }
  ];

  async getAllIssues() {
    await this.delay(500);
    return [...this.issues].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createIssue(data) {
    await this.delay(500);

    // Simulate photo upload
    const photoUrls = data.photos.map(() =>
      'https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg'
    );

    const newIssue = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      category: data.category,
      status: 'pending',
      priority: 'medium',
      location: data.location,
      photos: photoUrls,
      reporterId: '1', // In real app, get from auth context
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.issues.push(newIssue);
    return newIssue;
  }

  async updateIssueStatus(id, status) {
    await this.delay(300);
    const issue = this.issues.find(i => i.id === id);
    if (issue) {
      issue.status = status;
      issue.updatedAt = new Date();
      if (status === 'resolved') {
        issue.resolvedAt = new Date();
      }
    }
  }

  async updateIssuePriority(id, priority) {
    await this.delay(300);
    const issue = this.issues.find(i => i.id === id);
    if (issue) {
      issue.priority = priority;
      issue.updatedAt = new Date();
    }
  }

  async assignIssue(id, assigneeId) {
    await this.delay(300);
    const issue = this.issues.find(i => i.id === id);
    if (issue) {
      issue.assignedTo = assigneeId;
      issue.status = 'in-progress';
      issue.updatedAt = new Date();
    }
  }

  async resolveIssue(id, resolutionProof) {
    await this.delay(500);
    const issue = this.issues.find(i => i.id === id);
    if (issue) {
      issue.status = 'resolved';
      issue.resolvedAt = new Date();
      issue.updatedAt = new Date();
      // Simulate proof upload
      issue.resolutionProof = resolutionProof.map(() =>
        'https://images.pexels.com/photos/1884598/pexels-photo-1884598.jpeg'
      );
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const issueService = new IssueService();