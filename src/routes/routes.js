const express = require('express');
const UserRegRoutes = require('../app/routes/user.reg.routes');
const ColorRoutes = require('../app/routes/color.routes');
const MenuRoutes = require('../app/routes/menu.routes');
const CategoryRoutes = require('../app/routes/category.routes');
const Sub_CategoryRoutes = require('../app/routes/sub.category.routes');
const CollectionRoutes = require('../app/routes/collection.routes');
const StyleRoutes = require('../app/routes/style.routes');
const FeatureRoutes = require('../app/routes/feature.routes');
const UserLoginRoutes = require('../app/routes/user.login.routes');
const GetMeRoutes = require('../app/routes/get.me.routes');

const router = express.Router();

const moduleRoutes = [
  {
    path: '/userReg',
    route: UserRegRoutes.router,
  },
  {
    path: '/userlogin',
    route: UserLoginRoutes.router,
  },
  {
    path: '/getMe',
    route: GetMeRoutes.router,
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
  {
    path: '/collection',
    route: CollectionRoutes.router,
  },
  {
    path: '/style',
    route: StyleRoutes.router,
  },
  {
    path: '/feature',
    route: FeatureRoutes.router,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

module.exports = router;