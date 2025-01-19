const bcrypt = require("bcrypt");

class PasswordHashCompare {
  // Method for hashing passwords
  async hashPassword(password) {
    try {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    } catch (err) {
      throw err;
    }
  }

  // Method for comparing passwords
  async comparePassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new PasswordHashCompare();
