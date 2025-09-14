// Import controllers from separate files for better organization
const readController = require('./issueReadController');
const writeController = require('./issueWriteController');
const interactionController = require('./issueInteractionController');

module.exports = {
  // Read operations
  getIssues: readController.getIssues,
  getIssue: readController.getIssue,
  getUserIssues: readController.getUserIssues,
  getIssuesStats: readController.getIssuesStats,

  // Write operations
  createIssue: writeController.createIssue,
  updateIssue: writeController.updateIssue,
  deleteIssue: writeController.deleteIssue,

  // Interaction operations
  upvoteIssue: interactionController.upvoteIssue,
  addComment: interactionController.addComment
};