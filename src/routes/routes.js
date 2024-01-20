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
const SliderRoutes = require('../app/routes/slider.routes');
const ProductRoutes = require('../app/routes/product.routes');
const OrderRoutes = require('../app/routes/order.routes');
const FilterRoutes = require('../app/routes/filter.routes');
const SettingRoutes = require('../app/routes/setting.routes');
const DashboardRoutes = require('../app/routes/dashboard.routes');

const router = express.Router();

const moduleRoutes = [
  {
    path: '/dashboard',
    route: DashboardRoutes.router,
  },
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
  {
    path: '/slider',
    route: SliderRoutes.router,
  },
  {
    path: '/product',
    route: ProductRoutes.router,
  },
  {
    path: '/order',
    route: OrderRoutes.router,
  },
  {
    path: '/all',
    route: FilterRoutes.router,
  },
  {
    path: '/siteSetting',
    route: SettingRoutes.router,
  },
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

module.exports = router;