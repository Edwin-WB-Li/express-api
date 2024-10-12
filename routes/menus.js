const express = require('express');
const router = express.Router();

// 假设有一个 MenuController来处理业务逻辑
const MenuController = require('../controller/menus/menus');

// 根据 role 获取菜单列表
/**
 * @swagger
 * /api/v1/sysPermission/getMenuListByRole:
 *   get:
 *     summary: 获取指定角色的菜单列表
 *     description: 根据提供的角色获取相应的菜单列表。
 *     tags: [SysPermission]
 *     parameters:
 *       - in: query
 *         name: role
 *         description: 角色名称
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功返回菜单列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     menu:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           role:
 *                             type: string
 *       400:
 *         description: 请求参数错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "请求参数错误"
 *                 data:
 *                   type: object
 *                   properties:
 *                     details:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           message:
 *                             type: string
 *                           path:
 *                             type: array
 *                             items:
 *                               type: string
 *       500:
 *         description: 服务器内部错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "服务器内部错误"
 *                 data:
 *                   type: null
 */
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
