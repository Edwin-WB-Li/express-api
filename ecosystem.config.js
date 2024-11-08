module.exports = {
  apps: [
    {
      name: 'express-api',
      script: './src/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        MONGODB_ATLAS_URL: process.env.MONGODB_ATLAS_URL,
        MONGODB_LOCAL_URL: process.env.MONGODB_LOCAL_URL,
        LOCAL_URL: process.env.Local_URL,
      },
      env_production: {
        NODE_ENV: 'production',
        MONGODB_ATLAS_URL: process.env.MONGODB_ATLAS_URL,
        MONGODB_LOCAL_URL: process.env.MONGODB_LOCAL_URL,
        LOCAL_URL: process.env.PRODUCTION_URL,
      },
    },
  ],
};
