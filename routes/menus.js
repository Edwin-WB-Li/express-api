const express = require('express');
const router = express.Router();

// 假设有一个 MenuController来处理业务逻辑
const MenuController = require('../controller/menus/menus')

// 根据 role 获取菜单列表
router.get('/getMenuListByRole', MenuController.getMenuListByRole);
// 获取所有菜单列表
router.post('/getAllMenuList', MenuController.getAllMenuList);
// 编辑
router.post('/addAndEditMenuListInfo', MenuController.addAndEditMenuListInfo);
// 根据 id 获取菜单列表
router.get('/getMenuListInfoById/:id', MenuController.getMenuListInfoById);
// 添加 子菜单/按钮
router.post('/addSubmenusOrButton', MenuController.addSubmenusOrButton);
// 根据 id 删除 菜单
router.post('/deleteMenusById', MenuController.deleteMenusById);

module.exports = router;