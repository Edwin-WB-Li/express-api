// 引入 joi 进行输入验证
const Joi = require('joi');
const moment = require('moment');
const goodModel = require('../../models/goods/goodsModel.js');
const { verifyToken, handleError, handleServerError } = require('../../utils/');

class GoodController {
  static async getGoodList(req, res) {
    try {
      await verifyToken(req, res);
      // 对请求参数进行验证
      const schema = Joi.object({
        page: Joi.number().integer().default(1),
        size: Joi.number().integer().max(100).default(10),
        hot: Joi.boolean().default(false),
        cate: Joi.string().max(255).default(''),
        rank: Joi.number().default(-1),
        star: Joi.number().default(-1),
        name: Joi.string().max(255).default(''),
        min_price: Joi.number().min(0).default(0),
        max_price: Joi.number().default(Infinity),
        create_time: Joi.date().default(
          moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        ),
      });
      const { error, value } = schema.validate(req.query);
      if (error) {
        const errorMessage = handleError(error);
        return res.status(400).json({
          code: 400,
          message: errorMessage,
          data: null,
        });
      }
      // 入参
      let { page, size, hot, cate, rank, star, name, min_price, max_price } =
        value;
      const params = {
        name: new RegExp(name),
        hot,
        cate,
        price: {
          $gte: min_price,
          $lte: max_price,
        },
      };
      // 排序
      // rank -1: 倒叙  1: 升序
      // star -1
      const sort = {
        rank,
        star,
        create_time: -1,
      };

      // 多条件查询
      if (!params.hot) delete params.hot;
      if (!params.cate) delete params.cate;
      if (!rank) delete sort.rank;
      if (!star) delete sort.star;

      // 根据条件删除未使用的查询条件
      // deleteIfFalsy(params, 'hot');
      // deleteIfFalsy(params, 'cate');
      // deleteIfFalsy(sort, 'rank', -1);
      // deleteIfFalsy(sort, 'star', -1);

      console.log('parmas', params);

      const total = await goodModel.countDocuments(params);
      const list = await goodModel
        .find(params)
        .limit(size)
        .skip((page - 1) * size)
        .sort(sort);

      res.json({
        code: 200,
        message: 'success',
        data: {
          list,
          total,
        },
      });
    } catch (error) {
      const errorMessage = handleServerError(error);
      res.status(500).json({
        code: 500,
        message: errorMessage,
        data: null,
      });
    }
  }
}

module.exports = GoodController;
