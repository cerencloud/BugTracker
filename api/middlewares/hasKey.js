const mongoose = require('mongoose');
const hasKey = async (req, res, next) => {
  try {
    const id = req.headers['x-api-key'];
    const user = await mongoose.model('User').findById(id);
    if (!user)
      return res.status(401).json({
        message: 'Unauthraized',
      });
    return next();
  } catch {
    return res.status(401).json({
      message: 'Unauthraized',
    });
  }
};

module.exports = {
  hasKey,
};
