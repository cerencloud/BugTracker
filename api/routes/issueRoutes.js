const { Router } = require('express');
const router = Router();

const {
  getAllIssues,
  getIssue,
  createIssue,
  updateStatus,
  getAllComments,
  getComment,
  createComment,
} = require('../controllers/issueControllers');

const { validateObjectId, isExist } = require('../middlewares/mongoMiddleware');
const { hasKey } = require('../middlewares/hasKey');
const {
  issueValidation,
  statusValidation,
  commentValidation,
} = require('../utils/validation');

router.use(hasKey);

// Get all issues
router.get('/', getAllIssues);

// Get issue by id
router.get('/:id', validateObjectId, isExist('Issue'), getIssue);

// Create issue
router.post('/', issueValidation, createIssue);

// Update status issue
router.patch(
  '/:id',
  statusValidation,
  validateObjectId,
  isExist('Issue'),
  updateStatus
);

// Get comments related with issue
router.get('/:id/comments', validateObjectId, isExist('Issue'), getAllComments);

// Get spesific comments related with issue
router.get(
  '/:id/comments/:commentId',
  validateObjectId,
  isExist('Issue'),
  getComment
);

// Create comment
router.post(
  '/:id/comments',
  commentValidation,
  validateObjectId,
  isExist('Issue'),
  createComment
);

module.exports = router;
