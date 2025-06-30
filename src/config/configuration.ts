export interface AppConfig {
  port: number;
  nodeEnv: string;
  jwt: {
    secret: string;
    expiresIn: string; // e.g., '1h'
    refresh: {
      secret: string;
      expiresIn: string; // e.g., '7d'
    };
  };
  apiPrefix: string;
  cors: {
    origin: string[];
    credentials: boolean;
  };
  rateLimit: {
    windowMs: number; // in milliseconds
    max: number; // maximum number of requests per windowMs
  };
  database: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    synchronize: boolean;
    logging: boolean;
    migrations: string[];
    migrationsRun: boolean;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
  };
  bcrypt: {
    saltRounds: number;
  };
}

export default (): AppConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'defaultSecret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET || 'defaultRefreshSecret',
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
  },
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  },
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'devsync',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12,
  },
});
