const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

class User {
  constructor(username, email, password) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.password = bcrypt.hashSync(password, 10);
  }

  comparePassword(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
  }

  static validate(user) {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });

    return schema.validate(user);
  }
}

module.exports = User;