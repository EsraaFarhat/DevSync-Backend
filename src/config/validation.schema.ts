import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().default('1h'),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRATION_TIME: Joi.string().default('7d'),

  API_PREFIX: Joi.string().default('api/v1'),

  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
  CORS_CREDENTIALS: Joi.boolean().default(true),

  RATE_LIMIT_WINDOW_MS: Joi.number().default(15 * 60 * 1000), // 15 minutes
  RATE_LIMIT_MAX: Joi.number().default(100), // maximum

  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('postgres'),
  DB_DATABASE: Joi.string().default('devsync'),

  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().allow(''), // optional, can be empty

  BCRYPT_SALT_ROUNDS: Joi.number().min(10).max(15).default(10),
});
