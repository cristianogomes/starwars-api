const User = require('../models/user');
const UserRepository = require('../repositories/user.repository');

const userRepository = new UserRepository(User);

module.exports = {
  async getUsers() {
    return await userRepository.findAll();
  },

  async findByLogin(email) {
    return await userRepository.findByLogin(email);
  },

  async createUser(user) {
    const { login, password, email, name } = user;

    return await userRepository.createUser({
      login,
      password,
      email,
      name
    });
  },

  async updateUser(id, user) {
    const { login, password, email } = user;

    return await userRepository.updateUser(id, {
      login,
      password,
      email,
      name
    });
  },

  async deleteUser(id) {
    const affected = await userRepository.deleteUser(id);
    return !!affected;
  }
};
