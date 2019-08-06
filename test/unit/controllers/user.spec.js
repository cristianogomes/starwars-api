const sinon = require('sinon');
const UserService = require('../../../src/api/service/user.service');
const UserController = require('../../../src/api/controllers/user.controller');

describe('Controller: User', () => {
  const defaultUser = [
    {
      firstName: 'Cristiano',
      lastName: 'Gomes',
      email: 'cristiano@mail.com'
    }
  ];

  describe('get() users', () => {
    it('should call json with a list of users', async () => {
      const req = {};
      const res = {
        json: sinon.spy()
      };

      UserService.getUsers = sinon.stub();
      UserService.getUsers.resolves(defaultUser);

      const userController = new UserController(UserService);

      await userController.get(req, res);
      sinon.assert.calledWith(res.json, defaultUser);
    });
  });
});
