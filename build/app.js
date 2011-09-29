(function() {
  var Group, User, app, express, _ref;
  express = require('express');
  _ref = require('./models.js'), User = _ref.User, Group = _ref.Group;
  app = express.createServer();
  app.configure(function() {
    app.use(express.logger({
      format: 'dev'
    }));
    app.use(express.bodyParser());
    return app.use(app.router);
  });
  require('./routes.js');
  app.listen(8000);
  console.log('express server on Port %d', app.address().port);
}).call(this);
