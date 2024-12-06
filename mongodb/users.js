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
		_id: ObjectId('6683c76fd7c95f563d753518'),
		id: '6683c76fd7c95f563d753518',
		username: 'admin',
		password: '$2a$10$ob5Fthh5QfAj7mQx9/Udze0r188.vZ.tidwHL8Nntyn5vH9W7Xvy.',
		create_time: ISODate('2024-07-02T00:00:00.000Z'),
		email: '15277019541@aliyun.com',
		mobile: '15277019542',
		role: 'admin',
		role_name: '系统管理员',
		avatar: 'https://th.bing.com/th/id/OIP.v5fTm9ypD7t7F1VUkqN8AQHaHa?w=188&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7',
		nick_name: 'Bose',
		status: true,
		__v: 0
	},
	{
		_id: ObjectId('668bb19add865440953c1404'),
		id: '668bb19add865440953c1404',
		username: 've8101VEA',
		password: '$2a$10$GJhg/zlqxj4q2ySWr3SiiuGTFplTr8T9J2B0q5MNMQvYFNUiSjtKy',
		create_time: ISODate('2024-07-08T00:00:00.000Z'),
		email: '15277019541@aliyun.com',
		mobile: '15277019542',
		role: 'customer_service',
		role_name: '客服',
		avatar: 'https://th.bing.com/th/id/OIP.B_KFEVmKqbpNmHjQ-pBlCQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
		nick_name: 'Polo Peng',
		status: true,
		__v: 0
	},
	{
		_id: ObjectId('668bb28add865440953c1407'),
		id: '668bb28add865440953c1407',
		username: 'acoa00wbl',
		password: '$2a$10$3mTMeE6dhLc3xUC.gdVnCeIt6WOLK1yMnAjv8BQ2FNyivBHdtIRTy',
		create_time: ISODate('2024-07-08T00:00:00.000Z'),
		email: '15277019541@aliyun.com',
		mobile: '15277019542',
		role: 'shop',
		role_name: '商家会员',
		avatar: 'https://th.bing.com/th/id/OIP.aA46zTXqpUBiyG39zRw_tgHaEK?w=305&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7',
		nick_name: 'Zane Wu',
		status: true,
		__v: 0
	},
	{
		_id: ObjectId('66cd43ec8eda76e102c7b6ed'),
		id: '66cd43ec8eda76e102c7b6ed',
		username: '2967398500',
		password: '$2a$10$7iLLbmAiMqdCTG3uy1LObumI9mdgNKCVfSP/2lKzC.FbdMNbLYGIG',
		create_time: ISODate('2024-08-27T00:00:00.000Z'),
		email: '2967398500@qq.com',
		mobile: '15277019571',
		role: 'shop',
		role_name: '商家会员',
		avatar: 'https://th.bing.com/th/id/OIP.y94JZI9_ToHrF-THdhAZLwHaHa?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7',
		nick_name: 'Eric Wu',
		status: false,
		__v: 0,
		update_time: ISODate('2024-09-05T00:00:00.000Z')
	},
	{
		_id: ObjectId('66da641d914c47cd9c5e1121'),
		id: '66da641d914c47cd9c5e1121',
		username: 'Kyle',
		password: '$2a$10$NZHl0PUnd0k3uvG/duaiee.ND91/7hkj/Ypy9MEyTIvqdb6Oc4gqC',
		update_time: ISODate('2024-09-06T00:00:00.000Z'),
		email: 'Kyle.LY.Lin@pccw.com',
		mobile: '15277019571',
		role: 'admin',
		role_name: '系统管理员',
		avatar: 'https://th.bing.com/th/id/OIP.FJVAdrf0jNIfb-2ko7XykQHaHa?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7',
		nick_name: 'Kyle Lin',
		status: true,
		create_time: ISODate('2024-09-06T02:08:29.246Z'),
		__v: 0
	},
	{
		_id: ObjectId('66de6cc5066bc595fb696cc6'),
		username: 'Polo',
		password: '$2a$10$C.mVSZCx0mUBZK77tOwbGuLg2NntVE6wnKGzFF3aRZNOFfZUXYQAS',
		create_time: '2024-09-09',
		email: 'Polo.PH.Luo@pccw.com',
		mobile: '18207794218',
		role: 'admin',
		role_name: '系统管理员',
		avatar: 'https://th.bing.com/th/id/OIP.PCVOaj6jLF73Bb-c2t6ZAAHaHa?w=204&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7',
		nick_name: 'Polo Peng',
		status: true,
		update_time: ISODate('2024-09-23T01:17:57.000Z'),
		__v: 0,
		id: '66de6cc5066bc595fb696cc6'
	},
	{
		_id: ObjectId('66de9e7b066bc595fb696d39'),
		username: 'Edwin WB Li',
		password: '$2a$10$qqqu0SL3xfRBs0xn4WLsmucrZ3zxtbMEIINr6lt4dJNaB5RJg6y2y',
		create_time: '2024-09-09',
		email: 'Edwin.WB.Li@pccw.com',
		mobile: '15277019571',
		role: 'admin',
		role_name: '系统管理员',
		avatar: 'https://th.bing.com/th/id/OIP.USRb1ZVBYGDdp1vHRLW8UgHaKe?w=134&h=189&c=7&r=0&o=5&dpr=1.5&pid=1.7',
		nick_name: 'Edwin WB Li',
		status: true,
		update_time: ISODate('2024-09-09T07:06:35.637Z'),
		__v: 0,
		id: '66de9e7b066bc595fb696d39'
	}
]);
