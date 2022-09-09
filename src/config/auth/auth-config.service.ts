import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get redisCacheEnable(): boolean {
    return this.configService.get<boolean>('auth.redisCacheEnable');
  }
  get tokenAudience(): string {
    return this.configService.get<string>('auth.tokenAudience');
  }
  get tokenIssuer(): string {
    return this.configService.get<string>('auth.tokenIssuer');
  }
  get tokenAlgorithm(): string {
    return this.configService.get<string>('auth.tokenAlgorithm');
  }

  get expireDurationToken(): string {
    return this.configService.get<string>('auth.expireDurationToken');
  }

  get authLink(): string {
    return this.configService.get<string>('auth.authLink');
  }

  get accessPrivateKey(): string {
    return this.configService.get<string>('auth.accessPrivateKey');
  }

  get accessPublicKey(): string {
    return this.configService.get<string>('auth.accessPublicKey');
  }

  get accessSecretKey(): string {
    return this.configService.get<string>('auth.accessSecretKey');
  }
  get isUsingRS256(): boolean {
    return this.configService.get<boolean>('auth.isUsingRS256');
  }
}
