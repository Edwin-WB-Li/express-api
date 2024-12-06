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
db.getCollection('goods').insertMany([
	/* 1 */
	{
		_id: ObjectId('62e8c8e6a5ff41c356d23b9d'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 2
	},
	{
		_id: ObjectId('62e8c99ea5ff41c356d23bfc'),
		img: '/cdn/1.png',
		name: '小米汽车',
		cate: 'cart',
		desc: '这是一个很帅气的小汽车',
		price: 299.99,
		rank: 202,
		hot: true,
		star: 102,
		create_time: 1661974181289.0
	},
	{
		_id: ObjectId('62ea5341be27592d594aa997'),
		img: '/cdn/2.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 101
	},
	{
		_id: ObjectId('62ea5341be27592d594aa99d'),
		img: '/cdn/2.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 1999.99,
		rank: 20,
		hot: true,
		star: 7
	},
	{
		_id: ObjectId('62ea5341be27592d594aa9a0'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 299.99,
		rank: 18,
		hot: true,
		star: 8
	},
	{
		_id: ObjectId('62ea5342be27592d594aa9a3'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 9
	},
	{
		_id: ObjectId('62ea5342be27592d594aa9b5'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('62ea5342be27592d594aa9b8'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 399.99,
		rank: 100,
		hot: false,
		star: 77
	},
	{
		_id: ObjectId('62ea5342be27592d594aa9bb'),
		img: '/cdn/2.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('62ea5342be27592d594aa9be'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 10,
		hot: true,
		star: 92
	},
	{
		_id: ObjectId('62ea5342be27592d594aa9c1'),
		img: '/cdn/2.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 999.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('62ea5342be27592d594aa9c4'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3948b58456e550dd6403'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3948b58456e550dd6406'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3948b58456e550dd6409'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3948b58456e550dd640f'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3948b58456e550dd6412'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3948b58456e550dd6418'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3948b58456e550dd641b'),
		img: '/cdn/1.png',
		name: '宝宝巴士，玛卡巴卡',
		cate: 'cart',
		desc: '这是一辆宝宝巴士',
		price: 99999,
		rank: 1,
		hot: true,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6b9f'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6ba2'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6ba5'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6ba8'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 899.99,
		rank: 80,
		hot: true,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6bab'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6bae'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6bb1'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6bb4'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6bb7'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 999.99,
		rank: 10,
		hot: true,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6bba'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6bbd'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 0
	},
	{
		_id: ObjectId('630f3ccfb58456e550dd6bc0'),
		img: '/cdn/1.png',
		name: '小米手机',
		cate: 'office',
		desc: '这是一个很好看的手机',
		price: 99.99,
		rank: 100,
		hot: false,
		star: 74
	},
	{
		_id: ObjectId('630f40960dcdec554c0fd3ae'),
		hot: true,
		star: 1,
		create_time: 1661943931371.0,
		name: '宝宝巴士，玛卡巴卡',
		desc: '这是一辆宝宝巴士',
		price: 99999,
		cate: 'cart',
		rank: 1,
		img: '/cdn/1.png'
	},
	{
		_id: ObjectId('630f42b35bea0b51d405f0d8'),
		hot: true,
		star: 1,
		create_time: 1661944481289.0,
		name: '宝宝巴士，玛卡巴卡',
		desc: '这是一辆宝宝巴士',
		price: 99999,
		cate: 'cart',
		rank: 1,
		img: '/cdn/1.png'
	},
	{
		_id: ObjectId('630f42df5bea0b51d405f0dc'),
		hot: true,
		star: 1,
		create_time: 1661944481289.0,
		name: '玛卡巴卡',
		desc: '这是一个玛卡巴卡',
		price: 9,
		cate: 'cart',
		rank: 1,
		img: '/cdn/1.png'
	}
]);
