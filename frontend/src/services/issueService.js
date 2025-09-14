class IssueService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
  }

  async getAllIssues(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${this.baseURL}/api/issues${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch issues');
      }

      return data.data.issues;
    } catch (error) {
      console.error('Get all issues error:', error);
      throw error;
    }
  }

  async createIssue(issueData) {
    try {
      const response = await fetch(`${this.baseURL}/api/issues`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(issueData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create issue');
      }

      return data.data.issue;
    } catch (error) {
      console.error('Create issue error:', error);
      throw error;
    }
  }

  async updateIssueStatus(id, status) {
    try {
      const response = await fetch(`${this.baseURL}/api/issues/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update issue status');
      }

      return data.data.issue;
    } catch (error) {
      console.error('Update issue status error:', error);
      throw error;
    }
  }

  async updateIssuePriority(id, priority) {
    try {
      const response = await fetch(`${this.baseURL}/api/issues/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ priority }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update issue priority');
      }

      return data.data.issue;
    } catch (error) {
      console.error('Update issue priority error:', error);
      throw error;
    }
  }

  async upvoteIssue(id) {
    try {
      const response = await fetch(`${this.baseURL}/api/issues/${id}/upvote`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upvote issue');
      }

      return data;
    } catch (error) {
      console.error('Upvote issue error:', error);
      throw error;
    }
  }

  async addComment(id, content) {
    try {
      const response = await fetch(`${this.baseURL}/api/issues/${id}/comments`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add comment');
      }

      return data;
    } catch (error) {
      console.error('Add comment error:', error);
      throw error;
    }
  }

  async getUserIssues(userId, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${this.baseURL}/api/issues/user/${userId}${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user issues');
      }

      return data.data.issues;
    } catch (error) {
      console.error('Get user issues error:', error);
      throw error;
    }
  }

  async getIssueStats() {
    try {
      const response = await fetch(`${this.baseURL}/api/issues/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch issue stats');
      }

      return data.data;
    } catch (error) {
      console.error('Get issue stats error:', error);
      throw error;
    }
  }
}

export const issueService = new IssueService();