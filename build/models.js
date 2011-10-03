(function() {
  var Group, Sequelize, User, sequelize;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
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
  }, {
    instanceMethods: {
      isAdmin: function() {
        var _ref;
        return _ref = Group.findAll({
          where: {
            name: 'admin'
          }
        }), __indexOf.call(this.getGroups(), _ref) >= 0;
      }
    }
  });
  User.hasMany(Group);
  Group.hasMany(User);
  exports.User = User;
  exports.Group = Group;
}).call(this);
