const Project = require('../models/projectModel');
const slugify = require('slugify');

const slugValidation = async (req, res, next) => {
  try {
    const slug = slugify(req.body.name, {
      strict: true,
    });
    const project = await Project.findOne({
      slug: slug,
    });
    if (project)
      return res.status(409).json({
        errors: 'Slug used before',
      });
    return next();
  } catch (error) {
    return res.status(409).json({
      errors: 'Slug used before',
    });
  }
};

module.exports = {
  slugValidation,
};
