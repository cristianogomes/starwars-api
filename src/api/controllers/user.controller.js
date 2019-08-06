class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async get(req, res) {
    const users = await this.userService.getUsers();
    return res.json(users);
  }

  async post(req, res) {
    const { login, password, email, name } = req.body;
    const userData = {
      login,
      password,
      email,
      name
    };

    const user = await this.userService.createUser(userData);

    return res.json(user);
  }

  async put(req, res) {
    const { id } = req.params;
    const { login, password, email, name } = req.body;
    const userData = {
      login,
      password,
      email,
      name
    };

    const user = await this.userService.updateUser(id, userData);

    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deleted = await this.userService.deleteUser(id);

    return res.json({ message: deleted });
  }
}

module.exports = UserController;
