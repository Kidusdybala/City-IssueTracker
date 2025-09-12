import React, { createContext, useContext, useState, useEffect } from 'react';
import { issueService } from '../services/issueService';

const IssueContext = createContext(undefined);

export function useIssues() {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
}

export function IssueProvider({ children }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshIssues = async () => {
    try {
      setLoading(true);
      const issuesData = await issueService.getAllIssues();
      setIssues(issuesData);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshIssues();
  }, []);

  const createIssue = async (data) => {
    const newIssue = await issueService.createIssue(data);
    setIssues(prev => [newIssue, ...prev]);
    return newIssue;
  };

  const updateIssueStatus = async (id, status) => {
    await issueService.updateIssueStatus(id, status);
    setIssues(prev => prev.map(issue =>
      issue.id === id ? { ...issue, status, updatedAt: new Date() } : issue
    ));
  };

  const updateIssuePriority = async (id, priority) => {
    await issueService.updateIssuePriority(id, priority);
    setIssues(prev => prev.map(issue =>
      issue.id === id ? { ...issue, priority, updatedAt: new Date() } : issue
    ));
  };

  const assignIssue = async (id, assigneeId) => {
    await issueService.assignIssue(id, assigneeId);
    setIssues(prev => prev.map(issue =>
      issue.id === id ? { ...issue, assignedTo: assigneeId, updatedAt: new Date() } : issue
    ));
  };

  const resolveIssue = async (id, resolutionProof) => {
    await issueService.resolveIssue(id, resolutionProof);
    setIssues(prev => prev.map(issue =>
      issue.id === id
        ? {
            ...issue,
            status: 'resolved',
            resolvedAt: new Date(),
            updatedAt: new Date()
          }
        : issue
    ));
  };

  const value = {
    issues,
    loading,
    createIssue,
    updateIssueStatus,
    updateIssuePriority,
    assignIssue,
    resolveIssue,
    refreshIssues,
  };

  return (
    <IssueContext.Provider value={value}>
      {children}
    </IssueContext.Provider>
  );
}