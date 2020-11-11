const { Router } = require('express');
const router = Router();

const {
  getAllProjects,
  getProject,
  createProject,
} = require('../controllers/projectControllers');
const { validateObjectId, isExist } = require('../middlewares/mongoMiddleware');
const { hasKey } = require('../middlewares/hasKey');
const { slugValidation } = require('../middlewares/slugCheck');
const { projectValidation } = require('../utils/validation');

router.use(hasKey);

// Get all projects
router.get('/', getAllProjects);

// Get project by id
router.get('/:id', validateObjectId, isExist('Project'), getProject);

// Create project
router.post('/', projectValidation, slugValidation, createProject);

module.exports = router;
