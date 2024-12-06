// 引入 joi 进行输入验证
const Joi = require('joi');
// const moment = require('moment');
const menuItemsModel = require('../../models/menuItems/menuItemsModel.js');
const { verifyToken, handleError, handleServerError } = require('../../utils/index.js');

class MenuItemsController {
	// // 根据 role 获取菜单列表 GET
	// static async getMenuListByRole(req, res) {
	// 	try {
	// 		await verifyToken(req, res);
	// 		// 对请求参数进行验证
	// 		const schema = Joi.object({
	// 			role: Joi.string().max(255).required(),
	// 		});
	// 		const { error, value } = schema.validate(req.query);
	// 		if (error) {
	// 			const errorMessage = handleError(error);
	// 			return res.status(400).json({
	// 				code: 400,
	// 				message: errorMessage,
	// 				data: error.details,
	// 			});
	// 		}
	// 		// 入参
	// 		let { role } = value;

	// 		const menu = await menusModel.find({
	// 			role: {
	// 				$in: [role],
	// 			},
	// 		});

	// 		res.json({
	// 			code: 200,
	// 			message: 'success',
	// 			data: {
	// 				menu,
	// 			},
	// 		});
	// 	} catch (error) {
	// 		const errorMessage = handleServerError(error);
	// 		res.status(500).json({
	// 			code: 500,
	// 			message: errorMessage,
	// 			data: null,
	// 		});
	// 	}
	// }
	// 获取所有菜单列表 POST
	static async getAllMenuList(req, res) {
		try {
			await verifyToken(req, res);
			// 对请求参数进行验证
			// const schema = Joi.object({
			// 	menuName: Joi.string().allow('').max(255).default(''),
			// 	role: Joi.array().items(Joi.string()).default([]),
			// 	visible: Joi.boolean().allow(null).default(null),
			// });
			// const { error, value } = schema.validate(req.body);
			// if (error) {
			// 	const errorMessage = handleError(error);
			// 	return res.status(400).json({
			// 		code: 400,
			// 		message: errorMessage,
			// 		data: error.details,
			// 	});
			// }
			// // 入参
			// const { menuName, visible, role } = value;

			// const query = {};

			// if (menuName.trim()) {
			// 	query.menuName = {
			// 		$regex: menuName.trim(),
			// 		$options: 'i',
			// 	};
			// }

			// if (visible != null) {
			// 	query.visible = visible;
			// }

			// if (role?.length > 0) {
			// 	// 处理 role 数组查询
			// 	query.role = {
			// 		// 模糊查询
			// 		// $in: role
			// 		// 精准查询
			// 		$all: role,
			// 	};
			// }

			const list = await menuItemsModel.find({});

			if (list) {
				res.json({
					code: 200,
					message: 'success',
					// data: {
					// 	list,
					// },
					data: list,
				});
			}
		} catch (error) {
			const errorMessage = handleServerError(error);
			res.status(500).json({
				code: 500,
				message: errorMessage,
				data: null,
			});
		}
	}
	// // 根据 id 获取菜单详情 GET
	// static async getMenuListInfoById(req, res) {
	// 	try {
	// 		// token 校验
	// 		await verifyToken(req, res);
	// 		// 对请求参数进行验证
	// 		const idSchema = Joi.string().max(255).required();
	// 		const id = req.params.id;
	// 		const { error } = idSchema.validate(id);
	// 		if (error) {
	// 			const errorMessage = handleError(error);
	// 			return res.status(400).json({
	// 				code: 400,
	// 				message: errorMessage,
	// 				data: error.details,
	// 			});
	// 		}

	// 		const list = await menusModel.findById(id);

	// 		if (list) {
	// 			res.json({
	// 				code: 200,
	// 				message: 'success',
	// 				data: list,
	// 			});
	// 		} else {
	// 			return res.status(404).json({
	// 				code: 404,
	// 				message: '未找到指定ID的菜单',
	// 				data: null,
	// 			});
	// 		}
	// 	} catch (error) {
	// 		const errorMessage = handleServerError(error);
	// 		res.status(500).json({
	// 			code: 500,
	// 			message: errorMessage,
	// 			data: null,
	// 		});
	// 	}
	// }
	// // 根据 id 删除菜单  POST
	// static async deleteMenusById(req, res) {
	// 	try {
	// 		// token 校验
	// 		await verifyToken(req, res);
	// 		const schema = Joi.array().items(Joi.string().min(3).max(30).required());
	// 		// 对请求参数进行验证
	// 		const { error, value } = schema.validate(req.body);
	// 		if (error) {
	// 			const errorMessage = handleError(error);
	// 			return res.status(400).json({
	// 				code: 400,
	// 				message: errorMessage,
	// 				data: null,
	// 			});
	// 		}

	// 		const _ids = value;

	// 		// 执行删除操作
	// 		const result = await menusModel.deleteMany({
	// 			_id: {
	// 				$in: _ids,
	// 			},
	// 		});

	// 		if (result.deletedCount === 0) {
	// 			return res.status(404).json({
	// 				code: 404,
	// 				message: '未找到任何匹配的菜单',
	// 				data: null,
	// 				status: false,
	// 			});
	// 		}

	// 		res.status(200).json({
	// 			code: 200,
	// 			message: '用户删除成功',
	// 			data: {
	// 				deletedCount: result.deletedCount,
	// 			},
	// 			status: true,
	// 		});
	// 	} catch (error) {
	// 		const errorMessage = handleServerError(error);
	// 		return res.status(500).json({
	// 			code: 500,
	// 			message: errorMessage ?? '服务器错误',
	// 			data: null,
	// 		});
	// 	}
	// }
	// // 修改 菜单详情  POST
	// static async editMenuListInfo(req, res) {
	// 	try {
	// 		// token 校验
	// 		await verifyToken(req, res);

	// 		const schema = Joi.object({
	// 			id: Joi.number().required(),
	// 			fatherId: Joi.number().required(),
	// 			_id: Joi.string().min(1).max(50).required(),
	// 			menuName: Joi.string().min(1).max(50).required(),
	// 			menuType: Joi.string().min(1).max(50).required(),
	// 			type: Joi.string().min(1).max(50).required(),
	// 			code: Joi.string().min(1).max(50).required(),
	// 			path: Joi.string().min(1).max(50).required(),
	// 			icon: Joi.string().allow('').min(1).max(50).allow(null).default(''),
	// 			alIcon: Joi.string().allow('').min(1).max(50).allow(null).default(''),
	// 			visible: Joi.boolean().required(),
	// 			role: Joi.array().items(Joi.string().min(3).max(30).required()),
	// 			status: Joi.boolean().required(),
	// 			orderNum: Joi.number().required(),
	// 			update_time: Joi.date().allow(null).default(Date.now),
	// 			newLinkFlag: Joi.boolean().default(false),
	// 		});
	// 		// 对请求参数进行验证
	// 		const { error, value } = schema.validate(req.body);
	// 		if (error) {
	// 			const errorMessage = handleError(error);
	// 			return res.status(400).json({
	// 				code: 400,
	// 				message: errorMessage,
	// 				data: null,
	// 			});
	// 		}
	// 		// 对请求参数进行验证
	// 		const {
	// 			id,
	// 			fatherId,
	// 			_id,
	// 			menuName,
	// 			menuType,
	// 			code,
	// 			path,
	// 			icon,
	// 			alIcon,
	// 			visible,
	// 			status,
	// 			orderNum,
	// 			update_time = moment.utc(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
	// 			newLinkFlag,
	// 			role,
	// 			// type,
	// 		} = value;

	// 		// 检查更新后的 code 是否已存在
	// 		const existingCode = await menusModel.findOne({
	// 			code,
	// 			_id: {
	// 				$ne: _id,
	// 			},
	// 		});

	// 		if (existingCode) {
	// 			return res.status(400).json({
	// 				code: 400,
	// 				message: '更新失败, 权限码已存在,不能重复!',
	// 				data: null,
	// 				status: false,
	// 			});
	// 		}
	// 		// 检查更新后的 path 是否已被其他用户使用
	// 		const existingPath = await menusModel.findOne({
	// 			path,
	// 			_id: {
	// 				$ne: _id,
	// 			},
	// 		});

	// 		if (existingPath) {
	// 			return res.status(400).json({
	// 				code: 400,
	// 				message: '更新失败, 路径已存在,不能重复',
	// 				data: null,
	// 				status: false,
	// 			});
	// 		}

	// 		// 更新用户信息
	// 		const updateData = {
	// 			id,
	// 			fatherId,
	// 			_id,
	// 			menuName,
	// 			menuType,
	// 			code,
	// 			path,
	// 			icon,
	// 			alIcon,
	// 			visible,
	// 			status,
	// 			orderNum,
	// 			newLinkFlag,
	// 			role,
	// 			update_time,
	// 		};
	// 		// 查找并更新 menus 信息
	// 		const data = await menusModel.findOneAndUpdate(
	// 			{
	// 				_id,
	// 			},
	// 			updateData,
	// 			{
	// 				new: true,
	// 				runValidators: true,
	// 			},
	// 		);
	// 		if (!data) {
	// 			return res.status(400).json({
	// 				code: 400,
	// 				message: '未找到',
	// 				data: null,
	// 				status: false,
	// 			});
	// 		}
	// 		res.status(200).json({
	// 			code: 200,
	// 			message: '更新成功',
	// 			data,
	// 			status: true,
	// 		});
	// 	} catch (error) {
	// 		const errorMessage = handleServerError(error);
	// 		return res.status(500).json({
	// 			code: 500,
	// 			message: errorMessage ?? '服务器错误',
	// 			data: null,
	// 		});
	// 	}
	// }
	// // 添加 菜单/按钮   POST
	// static async addSubmenusOrButton(req, res) {
	// 	try {
	// 		// token 校验
	// 		await verifyToken(req, res);
	// 		// 对请求参数进行验证
	// 		const schema = Joi.object({
	// 			id: Joi.number().required(),
	// 			role: Joi.array().items(Joi.string().min(3).max(30).required()),
	// 			fatherId: Joi.number().required(),
	// 			menuName: Joi.string().min(1).max(50).required(),
	// 			menuType: Joi.string().min(1).max(50).required(),
	// 			code: Joi.string().min(1).max(50).required(),
	// 			path: Joi.string().min(1).max(50).allow(null),
	// 			icon: Joi.string().allow('').min(1).max(50).default(''),
	// 			alIcon: Joi.string().allow('').allow(null).min(1).max(50).default(''),
	// 			visible: Joi.boolean().default(false),
	// 			status: Joi.boolean().required(),
	// 			orderNum: Joi.number().required(),
	// 			update_time: Joi.date().allow(null).default(null),
	// 			newLinkFlag: Joi.boolean().default(false),
	// 		});

	// 		const { error, value } = schema.validate(req.body);
	// 		if (error) {
	// 			const errorMessage = handleError(error);
	// 			return res.status(400).json({
	// 				code: 400,
	// 				message: errorMessage,
	// 				data: null,
	// 			});
	// 		}
	// 		// 对请求参数进行验证
	// 		const {
	// 			id,
	// 			fatherId,
	// 			menuName,
	// 			menuType,
	// 			code,
	// 			path,
	// 			icon,
	// 			alIcon,
	// 			visible,
	// 			status,
	// 			orderNum,
	// 			update_time = moment.utc(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
	// 			newLinkFlag,
	// 			role,
	// 		} = value;

	// 		// 检查更新后的 id 是否已存在
	// 		const existingId = await menusModel.findOne({
	// 			id,
	// 		});

	// 		if (existingId) {
	// 			return res.status(400).json({
	// 				code: 400,
	// 				message: '添加失败, id已存在,不能重复!',
	// 				data: null,
	// 				status: false,
	// 			});
	// 		}

	// 		// 检查更新后的 权限码 是否已存在
	// 		const existingCode = await menusModel.findOne({
	// 			code,
	// 		});

	// 		if (existingCode) {
	// 			return res.status(400).json({
	// 				code: 400,
	// 				message: '添加失败, 权限码已存在,不能重复!',
	// 				data: null,
	// 				status: false,
	// 			});
	// 		}

	// 		// 添加 按钮时，无需校验 path
	// 		if (menuType != 'F') {
	// 			// 检查更新后的 path 是否已存在
	// 			const existingPath = await menusModel.findOne({
	// 				path,
	// 			});

	// 			if (existingPath) {
	// 				return res.status(400).json({
	// 					code: 400,
	// 					message: '添加失败, 路径已存在,不能重复',
	// 					data: null,
	// 					status: false,
	// 				});
	// 			}
	// 		}

	// 		// 设置 create_time 字段为当前时间
	// 		const createTime = moment.utc(Date.now()).format('YYYY-MM-DD HH:mm:ss');

	// 		const newData = {
	// 			id,
	// 			fatherId,
	// 			menuName,
	// 			menuType,
	// 			code,
	// 			path,
	// 			icon,
	// 			alIcon,
	// 			visible,
	// 			status,
	// 			orderNum,
	// 			newLinkFlag,
	// 			role,
	// 			update_time,
	// 			create_time: createTime,
	// 		};

	// 		//  插入数据库
	// 		const data = await menusModel.create(newData);

	// 		res.status(200).json({
	// 			code: 200,
	// 			message: '添加成功',
	// 			data,
	// 			status: true,
	// 		});
	// 	} catch (error) {
	// 		const errorMessage = handleServerError(error);
	// 		return res.status(500).json({
	// 			code: 500,
	// 			message: errorMessage ?? '服务器错误',
	// 			data: null,
	// 		});
	// 	}
	// }
}

module.exports = MenuItemsController;
