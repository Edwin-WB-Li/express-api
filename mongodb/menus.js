/* eslint-disable no-undef */
/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('node');

// Insert a few documents into the sales collection.
db.getCollection('menus').insertMany([
  {
    _id: ObjectId('66bdc35395bb181bcaaef70a'),
    id: 1,
    menuName: 'Dashboard',
    code: 'default:dashboard',
    fatherId: 0.0,
    orderNum: 1.0,
    path: '/default/dashboard',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: '',
    newLinkFlag: false,
    role: ['admin', 'shop', 'customer_service'],
    update_time: null,
    create_time: '$update_time',
  },

  {
    _id: ObjectId('66bdc35395bb181bcaaef716'),
    id: 101,
    menuName: '分析页',
    code: 'default:dashboard:analysis',
    fatherId: 1.0,
    orderNum: 1.0,
    path: '/default/dashboard/analysis',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'fund',
    alIcon: '',
    newLinkFlag: false,
    role: ['admin', 'shop', 'customer_service'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef728'),
    id: 102,
    menuName: '监控页',
    code: 'default:dashboard:monitor',
    fatherId: 1.0,
    orderNum: 2.0,
    path: '/default/dashboard/monitor',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'fund',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin', 'customer_service', 'shop'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef747'),
    id: 103,
    menuName: '工作台',
    code: 'default:dashboard:workbench',
    fatherId: 1.0,
    orderNum: 3.0,
    path: '/default/dashboard/workbench',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'appstore',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin', 'customer_service', 'shop'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef75b'),
    id: 2,
    menuName: '系统管理',
    code: 'default:system',
    fatherId: 0,
    orderNum: 2,
    path: '/default/system',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'setting',
    alIcon: '',
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef71d'),
    id: 201,
    menuName: '账号管理',
    code: 'default:system:account',
    fatherId: 2,
    orderNum: 1,
    path: '/default/system/account',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'android',
    alIcon: '',
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef717'),
    id: 2011.0,
    menuName: '账号管理新增',
    code: 'default:system:account:add',
    fatherId: 201.0,
    orderNum: 1.0,
    path: '',
    menuType: 'F',
    visible: false,
    status: true,
    icon: null,
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef748'),
    id: 2012.0,
    menuName: '账号管理删除',
    code: 'default:system:account:del',
    fatherId: 201.0,
    orderNum: 3.0,
    path: '',
    menuType: 'F',
    visible: false,
    status: true,
    icon: null,
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66de54aaf38e555f3ea64d38'),
    id: 2013.0,
    menuName: '账号管理编辑',
    code: 'default:system:account:edit',
    fatherId: 201.0,
    orderNum: 2.0,
    path: '',
    menuType: 'F',
    visible: false,
    status: true,
    icon: null,
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef72f'),
    id: 202,
    menuName: '角色管理',
    code: 'default:system:role-manager',
    fatherId: 2,
    orderNum: 2,
    path: '/default/system/role-manager',
    menuType: 'C',
    visible: true,
    status: true,
    icon: '',
    alIcon: 'icon-mel-help',
    newLinkFlag: false,
    role: ['admin'],
    update_time: ISODate('2024-09-09T02:52:30.901Z'),
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef708'),
    id: 2021,
    menuName: '角色管理新增',
    code: 'default:system:role-manager:add',
    fatherId: 202.0,
    orderNum: 1.0,
    path: '',
    menuType: 'F',
    visible: false,
    status: true,
    icon: null,
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef733'),
    id: 2022,
    menuName: '角色管理编辑',
    code: 'default:system:role-manager:edit',
    fatherId: 202,
    orderNum: 2.0,
    path: '',
    menuType: 'F',
    visible: false,
    status: true,
    icon: null,
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef73e'),
    id: 2023,
    menuName: '角色管理删除',
    code: 'default:system:role-manager:del',
    fatherId: 202,
    orderNum: 3.0,
    path: '',
    menuType: 'F',
    visible: false,
    status: true,
    icon: null,
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef753'),
    id: 2024,
    menuName: '角色管理设置角色',
    code: 'default:system:role-manager:set-role',
    fatherId: 202,
    orderNum: 4.0,
    path: '',
    menuType: 'F',
    visible: false,
    status: true,
    icon: null,
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef740'),
    id: 203,
    menuName: '菜单管理',
    code: 'default:system:menu',
    fatherId: 2,
    orderNum: 3,
    path: '/default/system/menu',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'gitlab',
    alIcon: '',
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef721'),
    id: 2031.0,
    menuName: '菜单管理新增',
    code: 'default:system:menu:add',
    fatherId: 203.0,
    orderNum: 1.0,
    path: null,
    menuType: 'F',
    visible: true,
    status: true,
    icon: null,
    alIcon: null,
    newLinkFlag: false,
    role: ['shop'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef73d'),
    id: 2032.0,
    menuName: '菜单管理删除',
    code: 'default:system:menu:del',
    fatherId: 203.0,
    orderNum: 3.0,
    path: null,
    menuType: 'F',
    visible: false,
    status: true,
    icon: null,
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef752'),
    id: 2033.0,
    menuName: '菜单管理添加下级',
    code: 'default:system:menu:addlowlevel',
    fatherId: 203.0,
    orderNum: 4.0,
    path: '',
    menuType: 'F',
    visible: false,
    status: true,
    icon: null,
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66de5ecef38e555f3ea64fe8'),
    id: 2034.0,
    menuName: '菜单管理编辑',
    code: 'default:system:menu:edit',
    fatherId: 203.0,
    orderNum: 2.0,
    path: null,
    menuType: 'F',
    visible: false,
    status: true,
    icon: null,
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef74d'),
    id: 204,
    menuName: '部门管理',
    code: 'default:system:dept',
    fatherId: 2,
    orderNum: 4,
    path: '/default/system/dept',
    menuType: 'C',
    visible: true,
    status: true,
    icon: '',
    alIcon: 'icon-mel-help',
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef72d'),
    id: 3,
    menuName: '页面',
    code: 'default:page-demo',
    fatherId: 0.0,
    orderNum: 3,
    path: '/default/page-demo',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'appstore',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef71f'),
    id: 301,
    menuName: '表单页',
    code: 'default:page-demo:form',
    fatherId: 3,
    orderNum: 1.0,
    path: '/default/page-demo/form',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'form',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef72c'),
    id: 302,
    menuName: '列表页',
    code: 'default:page-demo:list',
    fatherId: 3,
    orderNum: 2.0,
    path: '/default/page-demo/list',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'table',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef749'),
    id: 303,
    menuName: '详情页',
    code: 'default:page-demo:detail',
    fatherId: 3,
    orderNum: 3.0,
    path: '/default/page-demo/detail',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'profile',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef74f'),
    id: 304,
    menuName: '结果页',
    code: 'default:page-demo:result',
    fatherId: 3.0,
    orderNum: 4.0,
    path: '/default/page-demo/result',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'check-circle',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef759'),
    id: 305,
    menuName: '异常页',
    code: 'default:page-demo:except',
    fatherId: 3.0,
    orderNum: 5.0,
    path: '/default/page-demo/except',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'warning',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef762'),
    id: 306,
    menuName: '图形编辑器',
    code: 'default:page-demo:flow',
    fatherId: 3,
    orderNum: 6.0,
    path: '/default/page-demo/flow',
    menuType: 'C',
    visible: true,
    status: true,
    icon: null,
    alIcon: 'icon-mel-help',
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef765'),
    id: 307,
    menuName: '任务',
    code: 'default:page-demo:task',
    fatherId: 3.0,
    orderNum: 7.0,
    path: '/default/page-demo/task',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'border-bottom',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef766'),
    id: 308,
    menuName: '新布局',
    code: 'default:page-demo:page-demo1',
    fatherId: 3.0,
    orderNum: 8.0,
    path: '/default/page-demo/page-demo1',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'caret-down',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef76b'),
    id: 309,
    menuName: '新页面2',
    code: 'default:page-demo:page-demo2',
    fatherId: 3.0,
    orderNum: 9.0,
    path: '/default/page-demo/page-demo2',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'up',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef76d'),
    id: 310,
    menuName: '新页面3',
    code: 'default:page-demo:page-demo3',
    fatherId: 3.0,
    orderNum: 11.0,
    path: '/default/page-demo/page-demo3',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'down',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef76f'),
    id: 311,
    menuName: '新页面4',
    code: 'default:page-demo:page-demo4',
    fatherId: 3.0,
    orderNum: 12.0,
    path: '/default/page-demo/page-demo4',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'caret-down',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef743'),
    id: 4,
    menuName: '功能',
    code: 'default:feat',
    fatherId: 0.0,
    orderNum: 4.0,
    path: '/default/feat',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'bug',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },

  {
    _id: ObjectId('66bdc35395bb181bcaaef70e'),
    id: 401,
    menuName: '消息提示',
    code: 'default:feat:msg',
    fatherId: 4,
    orderNum: 1.0,
    path: '/default/feat/msg',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef739'),
    id: 402,
    menuName: '图标',
    code: 'default:feat:icons',
    fatherId: 4,
    orderNum: 2.0,
    path: '/default/feat/icons',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef741'),
    id: 403,
    menuName: '右键菜单',
    code: 'default:feat:context-menu',
    fatherId: 4,
    orderNum: 3.0,
    path: '/default/feat/context-menu',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef74b'),
    id: 404,
    menuName: '图片预览',
    code: 'default:feat:img-preview',
    fatherId: 4,
    orderNum: 4.0,
    path: '/default/feat/img-preview',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef756'),
    id: 405,
    menuName: '全屏',
    code: 'default:feat:full-screen',
    fatherId: 4,
    orderNum: 5.0,
    path: '/default/feat/full-screen',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef75e'),
    id: 406,
    menuName: '标签页操作',
    code: 'default:feat:tabs',
    fatherId: 4,
    orderNum: 6.0,
    path: '/default/feat/tabs',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef761'),
    id: 407,
    menuName: '拖拽modal',
    code: 'default:feat:ex-modal',
    fatherId: 4,
    orderNum: 7.0,
    path: '/default/feat/ex-modal',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef763'),
    id: 408,
    menuName: '封装抽屉',
    code: 'default:feat:ex-drawer',
    fatherId: 4,
    orderNum: 8.0,
    path: '/default/feat/ex-drawer',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef767'),
    id: 409,
    menuName: '富文本',
    code: 'default:feat:rich-text',
    fatherId: 4,
    orderNum: 9.0,
    path: '/default/feat/rich-text',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef769'),
    id: 410,
    menuName: 'clickOutSide',
    code: 'default:feat:click-out-side',
    fatherId: 4,
    orderNum: 10.0,
    path: '/default/feat/click-out-side',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef76e'),
    id: 411,
    menuName: '外部文档',
    code: 'default:feat:frame',
    fatherId: 4,
    orderNum: 11.0,
    path: '/default/feat/frame',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef771'),
    id: 412,
    menuName: '滚动条',
    code: 'default:feat:scroll',
    fatherId: 4.0,
    orderNum: 12.0,
    path: '/default/feat/scroll',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef772'),
    id: 413,
    menuName: '图表',
    code: 'default:feat:charts',
    fatherId: 4,
    orderNum: 13.0,
    path: '/default/feat/charts',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef773'),
    id: 414,
    menuName: '其他登录方式',
    code: 'blank:other-login',
    fatherId: 4,
    orderNum: 14.0,
    path: '/blank/other-login',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef774'),
    id: 415,
    menuName: '颜色选择器',
    code: 'default:feat:color-sel',
    fatherId: 4,
    orderNum: 15.0,
    path: '/default/feat/color-sel',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'usergroup-delete',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef775'),
    id: 416,
    menuName: '水波纹',
    code: 'default:feat:ripple',
    fatherId: 4,
    orderNum: 16.0,
    path: '/default/feat/ripple',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'usergroup-delete',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef776'),
    id: 417,
    menuName: '剪切板',
    code: 'default:feat:copy',
    fatherId: 4,
    orderNum: 17.0,
    path: '/default/feat/copy',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'usergroup-delete',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef777'),
    id: 418,
    menuName: '空白页',
    code: 'blank:empty-page',
    fatherId: 4,
    orderNum: 18.0,
    path: '/blank/empty-page',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'usergroup-delete',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef778'),
    id: 419,
    menuName: '引导页',
    code: 'default:feat:setup',
    fatherId: 4,
    orderNum: 19.0,
    path: '/default/feat/setup',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'codepen',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef779'),
    id: 420,
    menuName: '登录超时',
    code: 'default:feat:session-timeout',
    fatherId: 4,
    orderNum: 20.0,
    path: '/default/feat/session-timeout',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'yuque',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef77a'),
    id: 421,
    menuName: 'websocket',
    code: 'default:feat:websocket',
    fatherId: 4,
    orderNum: 21.0,
    path: '/default/feat/websocket',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'border-horizontal',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef77b'),
    id: 422,
    menuName: '文件上传',
    code: 'default:feat:upload',
    fatherId: 4,
    orderNum: 22.0,
    path: '/default/feat/upload',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'up',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef77c'),
    id: 423,
    menuName: '文件下载',
    code: 'default:feat:download',
    fatherId: 4,
    orderNum: 23.0,
    path: '/default/feat/download',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'arrow-down',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef77d'),
    id: 424,
    menuName: '二维码',
    code: 'default:feat:qrcode',
    fatherId: 4,
    orderNum: 24.0,
    path: '/default/feat/qrcode',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'gitlab',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef77e'),
    id: 425,
    menuName: '水印',
    code: 'default:feat:water-mark',
    fatherId: 4,
    orderNum: 25.0,
    path: '/default/feat/water-mark',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'windows',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef77f'),
    id: 426,
    menuName: '新功能1',
    code: 'default:feat:feat1',
    fatherId: 4,
    orderNum: 26.0,
    path: '/default/feat/feat1',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'arrows-alt',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef780'),
    id: 427,
    menuName: '新功能2',
    code: 'default:feat:feat2',
    fatherId: 4,
    orderNum: 27.0,
    path: '/default/feat/feat2',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'caret-down',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef781'),
    id: 428,
    menuName: '新功能3',
    code: 'default:feat:feat3',
    fatherId: 4,
    orderNum: 28.0,
    path: '/default/feat/feat3',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'caret-right',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef782'),
    id: 429,
    menuName: '新功能4',
    code: 'default:feat:feat4',
    fatherId: 4,
    orderNum: 29.0,
    path: '/default/feat/feat4',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'caret-left',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef783'),
    id: 430,
    menuName: '新功能5',
    code: 'default:feat:feat5',
    fatherId: 4,
    orderNum: 30.0,
    path: '/default/feat/feat5',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'up-circle',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef751'),
    id: 5,
    menuName: '组件',
    code: 'default:comp',
    fatherId: 0.0,
    orderNum: 5.0,
    path: '/default/comp',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'star',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef70f'),
    id: 501,
    menuName: '基础组件',
    code: 'default:comp:basic',
    fatherId: 5,
    orderNum: 1.0,
    path: '/default/comp/basic',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef73a'),
    id: 502,
    menuName: '动画组件',
    code: 'default:comp:transition',
    fatherId: 5,
    orderNum: 2.0,
    path: '/default/comp/transition',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef742'),
    id: 503,
    menuName: '在线excel',
    code: 'default:comp:luckysheet',
    fatherId: 5,
    orderNum: 3.0,
    path: '/default/comp/luckysheet',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef74c'),
    id: 504,
    menuName: '组件懒加载',
    code: 'default:comp:lazy',
    fatherId: 5,
    orderNum: 4.0,
    path: '/default/comp/lazy',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef75a'),
    id: 505,
    menuName: '详情组件',
    code: 'default:comp:desc',
    fatherId: 5,
    orderNum: 5.0,
    path: '/default/comp/desc',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef75c'),
    id: 506,
    menuName: '密码强度校验组件',
    code: 'default:comp:strength-meter',
    fatherId: 5,
    orderNum: 6.0,
    path: '/default/comp/strength-meter',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'dashboard',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef75f'),
    id: 147.0,
    menuName: 'Form',
    code: 'default:comp:form',
    fatherId: 507,
    orderNum: 7.0,
    path: '/default/comp/form',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'form',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef764'),
    id: 508,
    menuName: 'blingbling',
    code: 'default:comp:comp1',
    fatherId: 5,
    orderNum: 8.0,
    path: '/default/comp/comp1',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'caret-down',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef768'),
    id: 509,
    menuName: '新组件2',
    code: 'default:comp:comp2',
    fatherId: 5,
    orderNum: 9.0,
    path: '/default/comp/comp2',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'caret-right',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef76a'),
    id: 510,
    menuName: '新组件3',
    code: 'default:comp:comp3',
    fatherId: 5,
    orderNum: 10.0,
    path: '/default/comp/comp3',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'caret-left',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef76c'),
    id: 511,
    menuName: '新组件4',
    code: 'default:comp:comp4',
    fatherId: 5,
    orderNum: 11.0,
    path: '/default/comp/comp4',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'down',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef770'),
    id: 512,
    menuName: '新组件5',
    code: 'default:comp:comp5',
    fatherId: 5,
    orderNum: 12.0,
    path: '/default/comp/comp5',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'caret-down',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef75d'),
    id: 6,
    menuName: '个人页',
    code: 'default:personal',
    fatherId: 0.0,
    orderNum: 6.0,
    path: '/default/personal',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'user',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },

  {
    _id: ObjectId('66bdc35395bb181bcaaef710'),
    id: 601,
    menuName: '个人中心',
    code: 'default:personal:personal-center',
    fatherId: 6.0,
    orderNum: 1.0,
    path: '/default/personal/personal-center',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'user',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef73b'),
    id: 602,
    menuName: '个人设置',
    code: 'default:personal:personal-setting',
    fatherId: 6.0,
    orderNum: 2.0,
    path: '/default/personal/personal-setting',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'user',
    alIcon: '',
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef755'),
    id: 7,
    menuName: '多级菜单',
    code: 'default:level',
    fatherId: 0.0,
    orderNum: 7.0,
    path: '/default/level',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'menu',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef71a'),
    id: 701,
    menuName: 'Menu1',
    code: 'default:level:menu1',
    fatherId: 7,
    orderNum: 1.0,
    path: '/default/level/menu1',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'menu',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },

  {
    _id: ObjectId('66bdc35395bb181bcaaef711'),
    id: 7011,
    menuName: 'Menu1-1',
    code: 'default:level:menu1:menu1-1',
    fatherId: 701,
    orderNum: 1.0,
    path: '/default/level/menu1/menu1-1',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'table',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef727'),
    id: 7012,
    menuName: 'Menu1-2',
    code: 'default:level:menu1:menu1-2',
    fatherId: 701,
    orderNum: 2.0,
    path: '/default/level/menu1/menu1-2',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'menu',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef720'),
    id: 70111,
    menuName: 'Menu1-1-1',
    code: 'default:level:menu1:menu1-1:menu1-1-1',
    fatherId: 7011,
    orderNum: 1.0,
    path: '/default/level/menu1/menu1-1/menu1-1-1',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'table',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef730'),
    id: 70112,
    menuName: 'Menu1-1-2',
    code: 'default:level:menu1:menu1-1:menu1-1-2',
    fatherId: 7011,
    orderNum: 2.0,
    path: '/default/level/menu1/menu1-1/menu1-1-2',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'table',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef736'),
    id: 702,
    menuName: 'Menu2',
    code: 'default:level:menu2',
    fatherId: 7,
    orderNum: 2.0,
    path: '/default/level/menu2',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'menu',
    alIcon: null,
    newLinkFlag: false,
    role: ['admin'],
    update_time: null,
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66bdc35395bb181bcaaef760'),
    id: 8,
    menuName: '关于',
    code: 'default:about',
    fatherId: 0,
    orderNum: 8,
    path: '/default/about',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'reddit',
    alIcon: '',
    newLinkFlag: false,
    role: ['admin', 'shop'],
    update_time: ISODate('2024-09-13T02:19:50.541Z'),
    create_time: '$update_time',
  },
  {
    _id: ObjectId('66e3a180b482a7d51f035767'),
    id: 9,
    menuName: '其他',
    code: 'default:other',
    fatherId: 0,
    orderNum: 9,
    path: '/default/other',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'pie-chart',
    alIcon: '',
    newLinkFlag: false,
    create_time: ISODate('2024-09-12T18:20:48.000Z'),
    update_time: null,
    role: ['admin'],
  },
  {
    _id: ObjectId('66e3a5624350855a3a085018'),
    id: 901,
    menuName: '文件上传',
    code: 'default:other:other-upload',
    fatherId: 9,
    orderNum: 1,
    path: '/default/other/other-upload',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'aliwangwang',
    alIcon: '',
    newLinkFlag: false,
    create_time: ISODate('2024-09-12T18:37:22.000Z'),
    update_time: ISODate('2024-09-13T02:45:14.762Z'),
    role: ['admin'],
  },
  {
    _id: ObjectId('66f4d5b244dacb5fb7079fb8'),
    id: 902,
    menuName: '评论',
    code: 'default:other:other-comment',
    fatherId: 9,
    orderNum: 2,
    path: '/default/other/other-comment',
    menuType: 'C',
    visible: true,
    status: true,
    icon: 'chrome',
    alIcon: '',
    newLinkFlag: false,
    create_time: ISODate('2024-09-25T19:32:02.000Z'),
    update_time: null,
    role: ['admin'],
  },
]);
