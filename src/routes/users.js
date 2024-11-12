const express = require('express');
const router = express.Router();
const UserController = require('../controller/users/');

// 用户登录
router.post('/login', UserController.login);

// 用户注册
router.post('/register', UserController.register);

// 忘记密码
router.post('/forgotPassword', UserController.forgotPassword);

// 获取用户列表
router.post('/getUserList', UserController.getUserList);

// 修改用户信息
router.post('/addOrEditUserInfo', UserController.addOrEditUserInfo);

// 根据 id 获取用户信息
router.get('/getUserInfoById/:id', UserController.getUserInfoById);

// 删除用户
router.post('/deleteUser', UserController.deleteUser);

module.exports = router;
