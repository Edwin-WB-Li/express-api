module.exports = {
	apps: [
		{
			name: 'express-api',
			script: './src/index.js',
			instances: '1',
			exec_mode: 'cluster',
			env: {
				NODE_ENV: 'development',
				// PORT: process.env.PORT,
				// MONGODB_ATLAS_URL: process.env.MONGODB_ATLAS_URL,
				// MONGODB_LOCAL_URL: process.env.MONGODB_LOCAL_URL,
			},
			env_production: {
				NODE_ENV: 'production',
				// PORT: process.env.PORT,
				// MONGODB_ATLAS_URL: process.env.MONGODB_ATLAS_URL,
				// MONGODB_LOCAL_URL: process.env.MONGODB_LOCAL_URL,
			},
		},
	],
};
