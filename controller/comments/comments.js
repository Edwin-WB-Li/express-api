// 引入 joi 进行输入验证
const Joi = require('joi');
const {
  verifyToken
} = require('../../utils/');
const commentsModel = require('../../models/comments/commentsModel.js')
const {
  handleError,
  handleServerError
} = require('../../utils/');
class CommentsController {
  // 根据类型 获取 commentslist
  static async getCommentsList(req, res) {
    try {
      await verifyToken(req, res)
      // 对请求参数进行验证
      // const schema = Joi.object({
      //   type: Joi.string().max(255)
      // });
      // const {
      //   error,
      //   value
      // } = schema.validate(req.query);
      // if (error) {
      //   const errorMessage = handleError(error)
      //   return res.status(400).json({
      //     code: 400,
      //     message: errorMessage,
      //     data: null
      //   });
      // }

      // // 入参
      // const {
      //   type
      // } = value

      // const list = await commentsModel.find({
      //   type
      // })
      const list = await commentsModel.find({}).select('-_id -__v')

      res.status(200).json({
        code: 200,
        message: 'success',
        data: list
      })

    } catch (error) {
      const errorMessage = handleServerError(error)
      res.status(500).json({
        code: 500,
        message: errorMessage,
        data: null
      });
    }
  }
  // 新增评论回复接口
  static async replayToComments(req, res) {
    try {
      await verifyToken(req, res)
      // 对请求参数进行验证
      const commentSchema = Joi.object({
        id: Joi.string().max(255).required(),
        author: Joi.string().max(255).required(),
        avatar: Joi.string().max(255).required(),
        content: Joi.string().max(255).required(),
        likes: Joi.number().integer().min(0),
        isLikes: Joi.boolean(),
        isDislikes: Joi.boolean(),
        dislikes: Joi.number().integer().min(0),
        children: Joi.array().items(Joi.object()),
        datetime: Joi.date().required(),
        displayTime: Joi.string().required(),
        commentId: Joi.string().required(),
      });
      // 定义数组的验证 schema
      const schema = Joi.array().items(commentSchema);
      const {
        error,
        value
      } = schema.validate(req.body);
      if (error) {
        const errorMessage = handleError(error)
        return res.status(400).json({
          code: 400,
          message: errorMessage,
          data: null
        });
      }

      // 入参
      const commentsData = value
      // 保存每个评论对象
      const savedComments = [];
      for (const comment of commentsData) {
        // 检查数据库中是否已存在相同 id 的评论
        const existingComment = await commentsModel.findOne({
          id: comment.id
        });
        if (!existingComment) {
          // 如果不存在，则创建新评论
          const newComment = new commentsModel({
            id: comment.id,
            author: comment.author,
            avatar: comment.avatar,
            content: comment.content,
            likes: comment.likes || 0,
            isLikes: comment.isLikes,
            dislikes: comment.dislikes || 0,
            isDislikes: comment.isDislikes,
            children: comment.children || [],
            datetime: comment.datetime,
            displayTime: comment.displayTime,
            commentId: comment.commentId,
          });

          await newComment.save();
          savedComments.push(newComment);
        } else {
          // 如果存在，则更新旧的评论数据
          existingComment.author = comment.author;
          existingComment.avatar = comment.avatar;
          existingComment.content = comment.content;
          existingComment.likes = comment.likes || 0;
          existingComment.isLikes = comment.isLikes;
          existingComment.dislikes = comment.dislikes || 0;
          existingComment.isDislikes = comment.isDislikes;
          existingComment.children = comment.children || [];
          existingComment.datetime = comment.datetime;
          existingComment.displayTime = comment.displayTime;
          existingComment.commentId = comment.commentId;

          await existingComment.save();
          savedComments.push(existingComment);
        }
      }

      res.status(200).json({
        code: 200,
        message: '评论成功' | 'success',
        data: savedComments
      })

    } catch (error) {
      const errorMessage = handleServerError(error)
      res.status(500).json({
        code: 500,
        message: errorMessage,
        data: null
      });
    }
  }
}

module.exports = CommentsController