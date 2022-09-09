import { registerAs } from '@nestjs/config';

 const authConfiguration = registerAs('auth', () => {
   const isUsingRS256: boolean =  process.env.TOKEN_ALGORITHM === "RS256";
   return {
    redisCacheEnable: process.env.REDISCACHE === 'true',
    tokenAudience: process.env.TOKEN_AUDIENCE,
    tokenIssuer: process.env.TOKEN_ISSUER,
    tokenAlgorithm: process.env.TOKEN_ALGORITHM,
    authLink: process.env.AUTH_LINK,
    accessPrivateKey: isUsingRS256 ? process.env.ACCESS_PRIVATE_KEY : null,
    accessPublicKey: isUsingRS256 ? process.env.ACCESS_PUBLIC_KEY : null,
    accessSecretKey: isUsingRS256 ? null : process.env.ACCESS_SECRET_KEY,
    isUsingRS256,
  }
 });

export default authConfiguration;