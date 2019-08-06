const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const userService = require('../../service/user.service');
const { createUser } = require('../../validations/user.validation');
const validate = require('express-validation');

const userController = new UserController(userService);

router.get('/', (req, res) => userController.get(req, res));

router.post('/', validate(createUser), (req, res) => {
  userController.post(req, res);
});

router.put('/:id', validate(createUser), (req, res) =>
  userController.put(req, res)
);

router.delete('/:id', (req, res) => userController.delete(req, res));

module.exports = router;
