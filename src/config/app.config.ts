export interface AppConfig {
  port: number;
  nodeEnv: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
  };
}

export default (): AppConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'defaultRefreshSecret',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'devsync',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
});
