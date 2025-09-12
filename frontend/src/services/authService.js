class AuthService {
  users = [
    {
      id: '1',
      email: 'citizen@example.com',
      name: 'John Citizen',
      role: 'citizen',
      points: 150,
      badges: [
        {
          id: '1',
          name: 'First Reporter',
          description: 'Reported your first issue',
          icon: '🏆',
          earnedAt: new Date('2024-01-01'),
        }
      ],
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      email: 'official@city.gov',
      name: 'City Official',
      role: 'admin',
      points: 0,
      badges: [],
      createdAt: new Date('2024-01-01'),
    }
  ];

  async login(credentials) {
    await this.delay(500); // Simulate network delay

    const user = this.users.find(u => u.email === credentials.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // In a real app, verify password here
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }

  async signup(data) {
    await this.delay(500);

    if (this.users.some(u => u.email === data.email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role,
      points: 0,
      badges: [],
      createdAt: new Date(),
    };

    this.users.push(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  }

  async getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const authService = new AuthService();