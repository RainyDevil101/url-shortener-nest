export const EnvConfiguration = () => ({
  port: process.env.PORT || 3002,
  mongodb: process.env.MONGODB,
  secretKey: process.env.SECRET_KEY,
});
