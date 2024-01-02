const express = require('express');
const UserRegRoutes = require('../app/routes/user.reg.routes');

const router = express.Router();

const moduleRoutes = [
  {
    path: '/userReg',
    route: UserRegRoutes.router,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

module.exports = router;