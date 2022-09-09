import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import authConfiguration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfigService } from './auth-config.service';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfiguration],
      validationSchema: Joi.object({
          EXPIRE_DURATION_TOKEN: Joi.string()
          .default('1y'),
        TOKEN_AUDIENCE: Joi.string().default('localhost'),
        TOKEN_ALGORITHM: Joi.string().default('RS256'),
        TOKEN_ISSUER: Joi.string().default('BG'),
        AUTH_LINK: Joi.string().default('https://bg-framework-auth-fs.azurewebsites.net'),
        ACCESS_PUBLIC_KEY: Joi.string().default(''),
        ACCESS_SECRET_KEY: Joi.string().default('')
      }),
    }),
  ],
  providers: [ConfigService, AuthConfigService],
  exports: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}