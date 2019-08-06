const express = require('express');
const authRoutes = require('./auth.router');
const userRoutes = require('./user.route');
const planetRouters = require('./planet.router');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', /*auth.checkToken,*/ userRoutes);
router.use('/planet', auth.checkToken, planetRouters);

module.exports = router;
