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
db.getCollection('dictionaries').insertMany([
	{
		_id: ObjectId('62ea59aabe27592d594aac5f'),
		label: '手机数码',
		value: 'digital',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac62'),
		label: '电脑办公',
		value: 'office',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac65'),
		val: 'electrical',
		label: '家用电器',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac68'),
		value: 'beauty',
		label: '美妆护肤',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac6b'),
		value: 'clean',
		label: '个人清洁',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac6e'),
		value: 'cart',
		label: '汽车生活',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac71'),
		value: 'clothe',
		label: '男装女装',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac74'),
		value: 'meternal',
		label: '母婴儿童',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac77'),
		value: 'book',
		label: '图书影像',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac7a'),
		value: 'sport',
		label: '运动户外',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac7d'),
		value: 'fresh',
		label: '食品生鲜',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac80'),
		label: '饮料酒水',
		value: 'drink',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac83'),
		label: '钟表珠宝',
		value: 'gem',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac86'),
		label: '玩具乐器',
		value: 'music',
		type: 'category'
	},
	{
		_id: ObjectId('62ea59aabe27592d594aac89'),
		label: '宠物生活',
		value: 'pet',
		type: 'category'
	}
]);
