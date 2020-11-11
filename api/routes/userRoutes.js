const { Router } = require('express');
const router = Router();

const {
  getAllUsers,
  getUser,
  createUser,
} = require('../controllers/userControllers');

const { validateObjectId, isExist } = require('../middlewares/mongoMiddleware');
const { hasKey } = require('../middlewares/hasKey');

const { userValidation } = require('../utils/validation');

router.use(hasKey);

// Get all users
router.get('/', getAllUsers);

// Get user by id
router.get('/:id', validateObjectId, isExist('User'), getUser);

// Create user
router.post('/', userValidation, createUser);

module.exports = router;
