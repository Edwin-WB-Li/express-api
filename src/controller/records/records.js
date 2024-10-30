// 引入 joi 进行输入验证
const Joi = require('joi');
const recordsModel = require('../../models/records/recordsModel.js');
const { verifyToken, handleError, handleServerError } = require('../../utils');
class RecordsController {
  static async getChattingRecords(req, res) {
    try {
      await verifyToken(req, res);
      // 对请求参数进行验证
      // const schema = Joi.object({
      //   type: Joi.string().max(255),
      // });
      // const {
      //   error,
      //   value,
      //   // } = schema.validate(req.params);
      // } = schema.validate(req.query);
      // if (error) {
      //   const errorMessage = handleError(error);
      //   return res.status(400).json({
      //     code: 400,
      //     message: errorMessage,
      //     data: null,
      //   });
      // }

      // 入参
      // const { type } = value;

      const list = await recordsModel.find({}).select('-__v -_id');

      res.status(200).json({
        code: 200,
        message: 'success',
        data: list,
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
}

module.exports = RecordsController;
