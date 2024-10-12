const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const chalk = require('chalk');
// 用于处理非表单的文件数据流
const multer = require('multer')
// 引入 moment.js
const moment = require('moment');
// 引入 crypto 模块
const crypto = require('crypto');
// 用于处理非表单的文件数据流
const upload = multer({
  // 指定上传后的文件的存放位置
  dest: path.resolve(__dirname, `../static`)
})
const cpUpload = upload.fields([{
  name: 'uploadData',
  maxCount: 3
}])

// 生成唯一的文件名
function generateUniqueFileName(originalName) {
  // 生成当前时间的格式
  const timestamp = moment().format('YYYYMMDDHHmmss');
  // 生成随机字符串
  const randomString = crypto.randomBytes(4).toString('hex');
  const extension = path.extname(originalName);
  return `${timestamp}-${randomString}${extension}`;
}

// 确保目标目录存在
function ensureDirectoryExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    try {
      fs.mkdirSync(directoryPath, {
        recursive: true
      });
      console.log(`Directory created: ${directoryPath}`);
    } catch (err) {
      console.error('Failed to create directory:', err);
      throw err;
    }
  }
}

// 用于文件上传
// POST  /upload/file
// 入参 { uploadData }
// 普通表单提交，浏览器会对数据进行默认编码
// 文件上传 ，默认不进行任何编码，直接使用二进制数据流进行传输，form-data
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 用户登录接口
 *     description: 用户通过用户名和密码登录系统。
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用户名
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: 密码
 *                 example: "secure_password"
 *     responses:
 *       200:
 *         description: 登录成功
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
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJyb2xlIjoiYWRtaW4iLCJfaWQiOiI2M2QxNjg0OTIwMjE3NjgiLCJpZCI6MSwiaWF0IjoxNjg5NTIwODkxfQ.8h4fKd5XJ8u67VlXq4rL6HmZ9eUZDvz8X6lOYHtjX5o"
 *                     userInfo:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         role:
 *                           type: string
 *                           example: "admin"
 *       400:
 *         description: 客户端错误
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
 *                   example: "账号不存在 、账号已停用，请联系管理员、密码错误"
 *                 data:
 *                   type: null
 *                 status:
 *                   type: boolean
 *                   example: false
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
 *                   example: "Internal server error"
 *                 data:
 *                   type: null
 */
router.post('/upload', cpUpload, (req, res) => {

  if (!req.files || !req.files.uploadData) {
    return res.status(400).json({
      code: 400,
      message: 'No files uploaded'
    });
  }
  const staticDir = path.resolve(__dirname, '../static');
  // 确保目标目录存在
  ensureDirectoryExists(staticDir);

  req.files.uploadData.forEach((file) => {
    // 使用 fs模块 把临时存储空间中的文件，写到服务器硬盘上
    const uniqueFileName = generateUniqueFileName(file.originalname);
    // const uniqueFileName = `${Date.now()}-${file.originalname}`;
    // const staticDir = path.resolve(__dirname, '../static');
    // 服务器已经接收到了前端传过去的文件数据，保存在了服务进程的临时储存空间
    // const readStream = fs.createReadStream(file.path)
    const filePath = path.resolve(staticDir, uniqueFileName)

    // 确保目标目录存在
    ensureDirectoryExists(staticDir);
    try {
      // 服务器已经接收到了前端传过去的文件数据，保存在了服务进程的临时储存空间
      const readStream = fs.createReadStream(file.path);
      const writeStream = fs.createWriteStream(filePath)
      // console.log('----------------->', writeStream)
      readStream.pipe(writeStream)
      // 监听管道流的关闭事件
      writeStream.on('close', () => {
        console.log(chalk.green('文件上传成功'))
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(chalk.red('临时文件删除失败', err));
          } else {
            console.log(chalk.green('临时文件删除成功'));
          }
        });

        // 所有文件上传完成后发送响应
        setTimeout(() => {
          return res.json({
            code: 200,
            message: '上传成功',
            data: {
              files: [uniqueFileName]
            }
          });
        }, 500);
      })
      // 监听错误事件
      writeStream.on('error', (err) => {
        console.error('写入文件时发生错误:', err);
        return res.status(500).json({
          code: 500,
          message: 'File write error',
          data: null
        });
      });

      // 监听结束事件
      writeStream.on('end', () => {
        console.log('写入文件完成');
      });

    } catch (error) {
      console.error('文件操作错误:', err);
      return res.status(500).json({
        code: 500,
        message: 'File operation error',
        data: null
      });
    }
  })
})

router.post('/download', (req, res) => {
  console.log(req.body)
  const {
    fileName
  } = req.body;
  const filePath = path.resolve(__dirname, `../static/${fileName}`)
  // const filePath = `/static/${fileName}`
  // 第一个参数是文件的绝对路径或相对路径。
  // 第二个参数是可选的，指定下载时的文件名。
  // 可以提供一个回调函数来处理可能发生的错误。
  res.download(filePath, `${fileName}`, (err) => {
    if (err) {
      console.error('文件下载失败:', err);
      return res.status(500).json({
        code: 500,
        message: err || 'File download error',
        data: null
      })
    } else {
      return res.status(200).json({
        code: 200,
        message: 'success',
        data: filePath
      })
    }
  })
})

module.exports = router