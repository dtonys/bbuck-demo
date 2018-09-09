/**
 * http://pm2.keymetrics.io/docs/usage/application-declaration/
 */
module.exports = {
  apps: [
    {
      name: 'bbuck-demo',
      script: 'src/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 80,
      },
      // NOTE: Add cluster mode when upgrading to multi-core instances
      // exec_mode: 'cluster',
    },
    {
      name: 'login-polling',
      script: 'src/runEpicLoginFlow.js',
      // NOTE: Add cluster mode when upgrading to multi-core instances
      // exec_mode: 'cluster',
    },
    {
      name: 'friends-polling',
      script: 'src/runEpicFriendFlow.js',
      // NOTE: Add cluster mode when upgrading to multi-core instances
      // exec_mode: 'cluster',
    },
  ],
};
