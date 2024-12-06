const express = require('express');
const router = express.Router();
const { verifyToken, getDependencies, handleServerError } = require('../utils');

// 获取依赖列表
router.get('/getDependenciesList', async (req, res) => {
	try {
		// token 校验
		await verifyToken(req, res);

		const { dependencies, devDependencies } = await getDependencies();

		return res.status(200).json({
			code: 200,
			message: 'get dependencies list successfully',
			data: {
				dependencies,
				devDependencies,
			},
		});
	} catch (error) {
		const errorMessage = handleServerError(error);
		return res.status(500).json({
			code: 500,
			message: errorMessage,
			data: null,
		});
	}
});

module.exports = router;
