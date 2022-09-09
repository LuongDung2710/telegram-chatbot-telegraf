import { AuthConfigService } from '../../config/auth/auth-config.service';
import { ITokenInfo } from '../../helper/token.helper';
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        authConfigService: AuthConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfigService.accessPublicKey ?? authConfigService.accessSecretKey
        });
    }

    validate(validationPayload: ITokenInfo): ITokenInfo | null {
        return validationPayload;
    }
}