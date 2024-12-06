const express = require('express');
const router = express.Router();
const { verifyToken, getDeviceType, getOS, handleServerError } = require('../utils');

// 获取设备信息
router.get('/getDevicesInformation', async (req, res) => {
	// 城市编码
	try {
		// token 校验
		await verifyToken(req, res);
		const userAgent = req.headers['user-agent'];
		const deviceType = getDeviceType(userAgent);
		const os = getOS(userAgent);

		if (deviceType && os) {
			return res.status(200).json({
				code: 200,
				message: 'DevicesInformation data fetched successfully',
				data: {
					deviceType,
					os,
				},
			});
		} else {
			return res.status(400).json({
				code: 400,
				message: 'Invalid user agent',
				data: null,
			});
		}
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
