(function() {
  var Group, Sequelize, User, sequelize;
  Sequelize = require('sequelize');
  sequelize = new Sequelize('user_man', 'root');
  Group = sequelize.define('Group', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  User.hasMany(Group);
  Group.hasMany(User);
  exports.User = User;
  exports.Group = Group;
  sequelize.sync().on('success', function() {
    return console.error('success');
  }).on('failure', function() {
    return console.error('failure');
  });
}).call(this);
