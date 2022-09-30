'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secret';

const usersModel = (sequelize, DataTypes) => {
  const model = sequelize.define('users', {
    username: {type: DataTypes.STRING, required: true, unique: true },
    password: {type: DataTypes.STRING, required: true},
    role: {type: DataTypes.ENUM('guest', 'student', 'teacher', 'admin'),
      required: true, defaultValue: 'guest'},
    token: {type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(obj) {
        let token = jwt.sign(obj, SECRET);
        return token;
      },
    },

    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const aclList = {
          guest: ['read'],
          student: ['read', 'update'],
          teacher: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return aclList[this.role];
      },
    },
  });

  model.beforeCreate(async (user) => {
    let pass = await bcrypt.hash(user.password, 10);
    user.password = pass;
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({where: { username } });
    const valid = await bcrypt.compare(password, user.password);

    if(valid) { return user; }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({where: { username: parsedToken.username }});
      if (user) { return user; }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }

  };
  return model;
};

module.exports = usersModel;
