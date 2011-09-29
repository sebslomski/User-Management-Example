Sequelize = require('sequelize')

sequelize = new Sequelize('user_man', 'root')

Group = sequelize.define('Group',
    id:
        type: Sequelize.INTEGER
        autoIncrement: true
        primaryKey: true
    name:
        type: Sequelize.STRING
        allowNull: false
)

User = sequelize.define('User',
    id:
        type: Sequelize.INTEGER
        autoIncrement: true
        primaryKey: true
    name:
        type: Sequelize.STRING
        allowNull: false
    password:
        type: Sequelize.STRING
        allowNull: false
)

User.hasMany(Group)
Group.hasMany(User)

exports.User = User
exports.Group = Group

sequelize.sync().on('success', -> console.error 'success').on('failure', -> console.error 'failure')


# automatic created tables:
#
# CREATE TABLE `Groups` (
#  `id` int(11) NOT NULL AUTO_INCREMENT,
#  `name` varchar(255) NOT NULL,
#  `createdAt` datetime NOT NULL,
#  `updatedAt` datetime NOT NULL,
#  PRIMARY KEY (`id`)
# ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
#
# CREATE TABLE `GroupsUsers` (
#   `GroupId` int(11) NOT NULL DEFAULT '0',
#   `UserId` int(11) NOT NULL DEFAULT '0',
#   `createdAt` datetime NOT NULL,
#   `updatedAt` datetime NOT NULL,
#   PRIMARY KEY (`GroupId`,`UserId`)
# ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
#
# CREATE TABLE `Users` (
#   `id` int(11) NOT NULL AUTO_INCREMENT,
#   `name` varchar(255) NOT NULL,
#   `password` varchar(255) NOT NULL,
#   `createdAt` datetime NOT NULL,
#   `updatedAt` datetime NOT NULL,
#   PRIMARY KEY (`id`)
# ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
