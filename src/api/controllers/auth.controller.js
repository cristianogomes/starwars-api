const httpStatus = require('http-status');
const authService = require('../service/auth.service');
const bcryptService = require('../service/bcrypt.service');

class AuthController {
  constructor(userService) {
    this.userService = userService;
  }

  async login(req, res) {
    const { login, password } = req.body;

    const user = await this.userService.findByLogin(login);

    if (user) {
      const validPassword = bcryptService().comparePassword(
        password,
        user.password
      );

      if (validPassword) {
        const token = authService().issue({ id: user.id });

        return res.json({
          success: true,
          message: 'Autenticação realizada com sucesso!',
          token
        });
      } else {
        return res.status(httpStatus.FORBIDDEN).json({
          success: false,
          message: 'Erro na autenticação.'
        });
      }
    }

    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: 'Erro na autenticação.'
    });
  }

  async logon(req, res) {
    const { login, password, email, name } = req.body;

    const userData = {
      login,
      password,
      email,
      name
    };

    const user = await this.userService.createUser(userData);

    return res.status(httpStatus.CREATED).json(user);
  }
}

module.exports = AuthController;
