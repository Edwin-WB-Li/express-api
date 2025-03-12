// 引入 joi 进行输入验证
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const usersModel = require('../../models/users/usersModel.js');
const { createToken, verifyToken, handleError, handleServerError } = require('../../utils/');
class UsersController {
	// 登录  POST
	static async login(req, res) {
		try {
			const schema = Joi.object({
				username: Joi.string()
					.pattern(/^[a-zA-Z0-9_\-\s]+$/)
					.min(3)
					.max(30)
					.required(),
				// password: Joi.string().regex(/^\$2[ayb]\$.{56}$/).required()
				password: Joi.string().required(),
			});
			// 对请求参数进行验证
			const { error, value } = schema.validate(req.body);
			if (error) {
				const errorMessage = handleError(error);
				return res.status(400).json({
					code: 400,
					message: errorMessage,
					data: null,
				});
			}
			// 对请求参数进行验证
			let { username, password } = value;

			const user = await usersModel.findOne({
				username,
			});

			// console.log('user', user)

			if (!user) {
				return res.status(400).json({
					code: 400,
					message: '账号不存在',
					data: null,
				});
			}

			if (!user.status) {
				return res.status(400).json({
					code: 400,
					message: '账号已停用，请联系管理员',
					data: null,
				});
			}

			// 使用 bcrypt 的 compareSync方法校验密码
			const isMatch = bcrypt.compareSync(password, user.password);

			console.log('password:---->', password);
			console.log('password:---->', user.password);
			console.log('密码校验：', isMatch);

			if (!isMatch) {
				return res.status(400).json({
					code: 400,
					message: '密码错误',
					data: null,
				});
			}
			const userInfo = {
				...user,
			};
			delete userInfo.password;
			// 登录成功，生成并返回token
			return res.status(200).json({
				code: 200,
				message: 'success',
				data: {
					token: createToken({
						username,
						role: user.role,
						_id: user._id, // 避免将密码信息包含在token生成的输入中
						id: user.id,
					}),
					userInfo: user,
				},
				status: true,
			});
		} catch (error) {
			const errorMessage = handleServerError(error);
			return res.status(500).json({
				code: 500,
				message: errorMessage,
				data: null,
			});
		}
	}
	// 注册  POST
	static async register(req, res) {
		try {
			const schema = Joi.object({
				username: Joi.string()
					.pattern(/^[a-zA-Z0-9_\-\s]+$/)
					.min(3)
					.max(30)
					.required(),
				password: Joi.string().required(),
				confirmPassword: Joi.string().required(),
				email: Joi.string().email().required(),
				mobile: Joi.string()
					.length(11)
					.pattern(/^1[5-9]\d{9}$/)
					.required(),
				role: Joi.string().required(),
				role_name: Joi.string().required(),
				nick_name: Joi.string().required(),
				captcha: Joi.string(),
				agreement: Joi.boolean(),
			});
			// 对请求参数进行验证
			const { error, value } = schema.validate(req.body);
			if (error) {
				const errorMessage = handleError(error);
				return res.status(400).json({
					code: 400,
					message: errorMessage,
					data: null,
				});
			}
			// 对请求参数进行验证
			let { username, password, email, mobile, role, role_name, nick_name } = value;

			// 计算 create_time
			const currentTime = moment.utc(Date.now()).format('YYYY-MM-DD');

			// 查找用户名是否重复
			const existingUserByUsername = await usersModel.findOne({
				username,
			});

			if (existingUserByUsername) {
				return res.status(400).json({
					code: 400,
					message: '账号已存在',
					data: null,
				});
			}

			// 查找昵称是否重复
			const existingUserByNickName = await usersModel.findOne({
				nick_name,
			});
			if (existingUserByNickName) {
				return res.status(400).json({
					code: 400,
					message: '昵称已存在',
					data: null,
				});
			}

			// 加密密码
			const hashedPassword = bcrypt.hashSync(password, 10);

			// 创建新用户
			const newUser = new usersModel({
				username,
				password: hashedPassword,
				create_time: currentTime, // 使用预先计算的时间
				email,
				mobile,
				role,
				role_name,
				nick_name,
			});
			const savedUser = await newUser.save();
			// 将 _id 保存到 id 字段
			savedUser.id = savedUser._id.toString();
			// 存入数据库
			await savedUser.save();
			// await usersModel.insertMany([data])
			res.status(200).json({
				code: 200,
				message: '注册成功',
				data: {
					id: savedUser.id,
					username: savedUser.username,
				},
			});
			// }
		} catch (error) {
			const errorMessage = handleServerError(error);
			return res.status(500).json({
				code: 500,
				message: errorMessage,
				data: null,
			});
		}
	}
	// 忘记密码  POST
	static async forgotPassword(req, res) {
		try {
			const schema = Joi.object({
				username: Joi.string().alphanum().min(3).max(30).required(),
				oldPassword: Joi.string().required(),
				newPassword: Joi.string().required(),
				confirmNewPassword: Joi.string().required(),
			});
			// 对请求参数进行验证
			const { error, value } = schema.validate(req.body);
			if (error) {
				const errorMessage = handleError(error);
				return res.status(400).json({
					code: 400,
					message: errorMessage,
					data: null,
				});
			}
			// 对请求参数进行验证
			let { username, oldPassword, newPassword } = value;
			// 查找用户
			const user = await usersModel.findOne({
				username,
			});

			if (!user) {
				return res.status(404).json({
					code: 404,
					message: '账号不存在',
					data: null,
				});
			} else {
				// 验证旧密码是否正确
				const isMatch = bcrypt.compareSync(oldPassword, user.password);
				//
				if (!isMatch) {
					return res.status(400).json({
						code: 400,
						message: '旧密码错误',
						data: null,
					});
				} else {
					// 加密新密码
					const newHashedPassword = bcrypt.hashSync(newPassword, 10);
					await usersModel.updateOne(
						{
							username,
						},
						{
							password: newHashedPassword,
						},
					);
					res.status(200).json({
						code: 200,
						message: '修改密码成功',
						data: {
							username,
						},
					});
				}
			}
		} catch (error) {
			const errorMessage = handleServerError(error);
			return res.status(500).json({
				code: 500,
				message: errorMessage,
				data: null,
			});
		}
	}
	// 获取所有用户列表 POST
	static async getUserList(req, res) {
		try {
			await verifyToken(req, res);
			// 对请求参数进行验证
			const schema = Joi.object({
				page: Joi.number().integer().min(1).default(1), // 默认第一页
				size: Joi.number().integer().min(1).max(100).default(10), // 默认每页显示10条数据
				username: Joi.string().max(255).allow('').default(''),
				role: Joi.string().max(255).default(''),
				mobile: Joi.string().max(255).allow('').default(''),
				nick_name: Joi.string().max(255).allow('').default(''),
				status: Joi.boolean().allow(null).default(true),
				create_time: Joi.date().default(null),
			});
			const { error, value } = schema.validate(req.body);
			if (error) {
				const errorMessage = handleError(error);
				return res.status(400).json({
					code: 400,
					message: errorMessage,
					data: null,
				});
			}

			// 入参
			let { page, size, username, role, status, mobile, create_time, nick_name } = value;

			const query = {};

			if (username.trim()) {
				query.username = {
					$regex: username.trim(),
					$options: 'i',
				};
			}
			if (nick_name.trim()) {
				query.nick_name = {
					$regex: nick_name.trim(),
					$options: 'i',
				};
			}

			if (role.trim()) {
				query.role = role.trim();
			}
			if (mobile.trim()) {
				query.mobile = mobile.trim();
			}

			if (status != null && status !== undefined) {
				query.status = status;
			}

			if (create_time) {
				query.create_time = create_time;
			}

			const total = await usersModel.countDocuments(query);
			const list = await usersModel
				.find(query)
				.limit(size)
				.skip((page - 1) * size);

			res.status(200).json({
				code: 200,
				message: 'success',
				data: {
					list,
					total,
				},
			});
		} catch (error) {
			// console.error(error);
			const errorMessage = handleServerError(error);
			res.status(500).json({
				code: 500,
				message: errorMessage,
				data: null,
			});
		}
	}
	// 根据 _id 获取用户信息 GET
	static async getUserInfoById(req, res) {
		// 验证请求参数
		try {
			await verifyToken(req, res);
			// 对请求参数进行验证
			const schema = Joi.object({
				id: Joi.string().max(255),
			});
			const { error, value } = schema.validate(req.params);
			if (error) {
				const errorMessage = handleError(error);
				return res.status(400).json({
					code: 400,
					message: errorMessage,
					data: null,
				});
			}

			// 入参
			let { id } = value;

			const list = await usersModel.findById({
				_id: id,
			});

			res.status(200).json({
				code: 200,
				message: 'success',
				data: {
					list,
				},
			});
		} catch (error) {
			// console.error(error);
			const errorMessage = handleServerError(error);
			res.status(500).json({
				code: 500,
				message: errorMessage,
				data: null,
			});
		}
	}
	// 修改 或 新增 用户信息  POST
	static async addOrEditUserInfo(req, res) {
		try {
			// token 校验
			await verifyToken(req, res);
			// 定义两个不同的模式：一个用于修改，另一个用于新增
			const editSchema = Joi.object({
				// _id: Joi.string().alphanum().min(3).max(30).required(),
				username: Joi.string()
					.pattern(/^[a-zA-Z0-9_\-\s]+$/)
					.min(3)
					.max(30)
					.required(),
				// password: Joi.string().required(),
				// confirmPassword: Joi.string().required(),
				email: Joi.string().email().required(),
				mobile: Joi.string()
					.length(11)
					.pattern(/^1[5-9]\d{9}$/)
					.required(),
				role: Joi.string().required(),
				role_name: Joi.string().required(),
				nick_name: Joi.string(),
				status: Joi.boolean().required(),
				update_time: Joi.date().default(null),
				// captcha: Joi.string(),
				// agreement: Joi.boolean(),
			}).unknown(true);

			const addSchema = editSchema.keys({
				password: Joi.string().required(),
				// 允许未知字段
			});

			// 根据是否提供了 password 来选择合适的模式
			const schema = req.body.password ? addSchema : editSchema;

			const { error, value } = schema.validate(req.body);

			if (error) {
				const errorMessage = handleError(error);
				return res.status(400).json({
					code: 400,
					message: errorMessage,
					data: null,
				});
			}
			// 对请求参数进行验证
			const {
				// _id,
				username,
				password,
				email,
				mobile,
				role,
				role_name,
				nick_name,
				update_time,
				status,
			} = value;

			// 检查更新后的 username 是否已被其他用户使用
			let existingUsername;
			if (password) {
				// 如果是新增操作
				existingUsername = await usersModel.findOne({
					username,
				});
			} else {
				// 如果是修改操作
				existingUsername = await usersModel.findOne({
					username,
					_id: {
						$ne: req.body._id,
					},
				});
			}

			if (existingUsername) {
				return res.status(400).json({
					code: 400,
					message: password ? '新增失败，用户名已存在' : '更新失败，用户名已存在',
					data: null,
				});
			}
			// 用户信息
			const updateData = {
				// _id,
				username,
				// password,
				email,
				mobile,
				role,
				role_name,
				nick_name,
				status,
				update_time: update_time || moment.utc(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
			};

			// 新增需要密码
			if (password) {
				// 加密密码
				const HashedPassword = bcrypt.hashSync(password, 10);
				updateData.password = HashedPassword;
			}

			let result;
			if (password) {
				// 新增
				// 删除 _id 字段，让 MongoDB 自动生成
				delete req.body._id;
				result = await usersModel.create(updateData);
				if (result) {
					return res.status(200).json({
						code: 200,
						message: '新增成功',
						data: {
							username,
						},
					});
				}
			} else {
				// 修改
				result = await usersModel.findOneAndUpdate(
					{
						_id: req.body._id,
					},
					updateData,
					{
						new: true,
					},
				);
				if (!result) {
					return res.status(400).json({
						code: 400,
						message: '用户未找到',
						data: null,
						status: false,
					});
				}
				res.status(200).json({
					code: 200,
					message: '用户信息更新成功',
					data: {
						username,
					},
				});
			}
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				code: 500,
				message: error ?? '服务器错误',
				data: null,
			});
		}
	}
	// 根据id删除用户  POST
	static async deleteUser(req, res) {
		try {
			// token 校验
			await verifyToken(req, res);
			const schema = Joi.array().items(Joi.string().min(3).max(30).required());
			// 对请求参数进行验证
			const { error, value } = schema.validate(req.body);
			if (error) {
				const errorMessage = handleError(error);
				return res.status(400).json({
					code: 400,
					message: errorMessage,
					data: null,
				});
			}

			const _ids = value;

			// 执行删除操作
			const result = await usersModel.deleteMany({
				_id: {
					$in: _ids,
				},
			});

			if (result.deletedCount === 0) {
				return res.status(404).json({
					code: 404,
					message: '未找到任何匹配的用户',
					data: null,
				});
			}

			res.status(200).json({
				code: 200,
				message: '用户删除成功',
				data: {
					deletedCount: result.deletedCount,
				},
			});
		} catch (error) {
			const errorMessage = handleServerError(error);
			return res.status(500).json({
				code: 500,
				message: errorMessage ?? '服务器错误',
				data: null,
			});
		}
	}
}

module.exports = UsersController;
