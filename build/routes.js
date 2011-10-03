(function() {
  app.all('*', function(req, res) {
    var user;
    if (req.body.user != null) {
      user = User.find({
        where: req.body.user
      });
      if (user && user.isAdmin()) {
        next();
      }
    }
    return res.send({
      error: 'Access denied'
    }, 401);
  });
  app.put('/user', function(req, res) {
    if (!(req.body.payload != null)) {
      return res.send('No parameters sent', 400);
    } else {
      return User.build(req.body.payload).save().on('success', function() {
        return res.send({
          success: 'Add a new user'
        });
      }).on('failure', function() {
        return res.send({
          error: 'Error while adding a new user'
        }, 400);
      });
    }
  });
  app["delete"]('/user', function(req, res) {
    if (req.body.payload != null) {
      return res.send('No parameters sent', 400);
    } else {
      return User.find({
        where: req.body.payload
      }).remove().on('success', function() {
        return res.send({
          success: 'User deleted'
        });
      }).on('failure', function() {
        return res.send({
          error: 'Error while deleting the user'
        }, 400);
      });
    }
  });
  app.put('/group', function(req, res) {
    if (!(req.body.payload != null)) {
      return res.send({
        error: 'No parameters sent'
      }, 400);
    } else {
      return Group.build(req.body.payload).save().on('success', function() {
        return res.send({
          success: 'New group added'
        });
      }).on('failure', function() {
        return res.send({
          error: 'Error while adding a new group'
        }, 400);
      });
    }
  });
  app["delete"]('/group', function(req, res) {
    var group;
    if (!(req.body.payload != null)) {
      return res.send({
        error: 'No parameters sent'
      }, 400);
    } else {
      group = Group.find({
        where: {
          id: req.body.payload
        }
      });
      if (!group.getUsers()) {
        group.remove();
        return res.send({
          success: 'Group deleted'
        });
      } else {
        return res.send({
          success: 'Group deleted'
        });
      }
    }
  });
  app.put('/group/:id', function(req, res) {
    var group, user;
    if (!(req.body.payload != null)) {
      return res.send({
        error: 'No parameters sent'
      }, 400);
    } else {
      user = User.find({
        where: req.body.payload
      });
      group = Group.find({
        where: {
          id: req.params.id
        }
      });
      group.addUser(user);
      return res.send({
        success: 'No parameters sent'
      }, 400);
    }
  });
  app["delete"]('/group/:id', function(req, res) {
    var group, user;
    if (!(req.body.payload != null)) {
      return res.send({
        error: 'No parameters sent'
      }, 400);
    } else {
      user = User.find({
        where: req.body.payload
      });
      group = Group.find({
        where: {
          id: req.params.id
        }
      });
      return group.removeUser(user);
    }
  });
}).call(this);
