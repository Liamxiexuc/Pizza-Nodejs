module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./src/Index.js",
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
