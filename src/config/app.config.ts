export const EnvConfiguration = () => ({
  port: process.env.PORT || 3002,
  mongodb: process.env.MONGODB,
});
