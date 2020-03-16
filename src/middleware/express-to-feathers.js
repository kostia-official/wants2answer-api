module.exports = (req, res, next) => {
  req.feathers.token = req.headers.authorization;
  next();
};
