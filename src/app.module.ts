import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';

@Module({
  imports: [
    // Global configuration setup
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema, // Validates env vars on startup
      validationOptions: {
        abortEarly: true, // Stop validation on first error
        allowUnknown: true, // Allow unknown keys in the environment
      },
    }),

    // Database setup with configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),

    // Global JWT Setup
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
