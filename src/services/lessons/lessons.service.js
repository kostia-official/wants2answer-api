const { Lessons } = require('./lessons.class');

module.exports = function(app) {
  const options = {
    paginate: app.get('paginate')
  };

  const lessons = new Lessons(options, app);

  // Methods
  app.use('/lessons', lessons);
};
