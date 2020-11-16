const Issue = require('../models/issueModel');
const Project = require('../models/projectModel');
const { validationResult } = require('express-validator');

const getAllIssues = async (req, res, next) => {
  try {
    const issues = await Issue.find({}).select({
      Comments: 0,
      __v: 0,
    });
    if (issues.length === 0)
      return res.status(200).json({
        issues: [],
      });
    return res.status(200).json(issues);
  } catch (err) {
    next(err);
  }
};

const getIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id).select({
      Comments: 0,
      __v: 0,
    });
    return res.status(200).json({
      issue,
    });
  } catch (err) {
    next(err);
  }
};

const createIssue = async (req, res, next) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0)
      return res.status(422).json({
        errors: errors,
      });

    // Get project Slug.
    const { slug } = await Project.findById(req.body.Project_ID);
    const number = await Issue.find({
      Project_ID: req.body.Project_ID,
    }).countDocuments();

    const issue = await Issue.create({
      issueNumber: `${slug}-${number + 1}`,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      Project_ID: req.body.Project_ID,
      dueDate: req.body.dueDate,
    });
    return res.status(201).json({
      message: 'created successfully',
      issue: issue,
    });
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0)
      return res.status(422).json({
        errors: errors,
      });
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    ).select({ Comments: 0, __v: 0 });
    return res.status(200).json({
      message: 'updated status successfully',
      issue: issue,
    });
  } catch (err) {
    next(err);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const comments = await Issue.findById(req.params.id).select({
      _id: 0,
      Comments: 1,
    });
    if (comments.length === 0)
      return res.status(200).json({
        comments: [],
      });
    return res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

const getComment = async (req, res, next) => {
  try {
    const { Comments } = await Issue.findOne({
      _id: req.params.id,
    });
    const comment = Comments.find(
      (comment) => comment._id.toString() === req.params.commentId
    );
    if (!comment)
      return res.status(404).json({
        message: 'the comment not found',
      });
    return res.status(200).json({
      Comment: comment,
    });
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0)
      return res.status(422).json({
        errors: errors,
      });
    const { Comments } = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          Comments: {
            text: req.body.text,
            author: req.body.author,
          },
        },
      },
      {
        new: true,
      }
    ).select({ Comments: 1 });
    return res.status(201).json({
      message: 'comment created successfully',
      Comment: Comments[Comments.length - 1],
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllIssues,
  getIssue,
  createIssue,
  updateStatus,
  getAllComments,
  getComment,
  createComment,
};
