class UserRepository {
  constructor(User) {
    this.User = User;
  }

  async findAll() {
    return await this.User.find().populate('planets');
  }

  async findByLogin(login) {
    return await this.User.findOne({
      login: login
    });
  }

  async createUser(userInfo) {
    const user = new this.User(userInfo);
    const savedUser = await user.save();
    return savedUser.transform();
  }

  async updateUser(userId, userInfo) {
    return await this.User.updateOne({ _id: userId }, userInfo);
  }

  async deleteUser(userId) {
    return await this.User.findOneAndDelete({
      _id: userId
    });
  }
}

module.exports = UserRepository;
