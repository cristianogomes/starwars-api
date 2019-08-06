const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/auth.controller');
const UserService = require('../../service/user.service');
const asyncHandler = require('../../utils/asyncHandler');

const { logonValidate } = require('../../validations/auth.validation');
const validate = require('express-validation');

const authController = new AuthController(UserService);

router.post(
  '/login',
  asyncHandler((req, res) => authController.login(req, res))
);

router.post(
  '/logon',
  validate(logonValidate),
  asyncHandler((req, res) => authController.logon(req, res))
);

module.exports = router;
