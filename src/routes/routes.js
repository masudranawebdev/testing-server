const express = require('express');
const UserRegRoutes = require('../app/routes/user.reg.routes');
const ColorRoutes = require('../app/routes/color.routes');
const MenuRoutes = require('../app/routes/menu.routes');
const CategoryRoutes = require('../app/routes/category.routes');
const Sub_CategoryRoutes = require('../app/routes/sub.category.routes');

const router = express.Router();

const moduleRoutes = [
  {
    path: '/userReg',
    route: UserRegRoutes.router,
  },
  {
    path: '/color',
    route: ColorRoutes.router,
  },
  {
    path: '/menu',
    route: MenuRoutes.router,
  },
  {
    path: '/category',
    route: CategoryRoutes.router,
  },
  {
    path: '/sub_category',
    route: Sub_CategoryRoutes.router,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

module.exports = router;