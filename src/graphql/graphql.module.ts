import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

let allowedOrigins = ['*'];
if (process.env.CORS_ORIGIN) {
  allowedOrigins = process.env.CORS_ORIGIN.split(',');
}

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
            buildSchemaOptions: { dateScalarMode: 'timestamp' },
            installSubscriptionHandlers: true,
            formatError: err => {
                console.log(err);
                return err;
                // if (process.env.NODE_ENV !== 'production') {
                //   const error = getErrorType(err.message);
                //   return { message: 'Internal Server Error', code: 500 };
                // }
              },
              cors: {
                origin: function(origin, callback) {
                  // allow requests with no origin
                  // (like mobile apps or curl requests)
                  //if (!origin) return callback(null, true);
                  if (allowedOrigins[0] === '*') return callback(null, true);
                  if (allowedOrigins.indexOf(origin) === -1) {
                    const msg =
                      'The CORS policy for this site does not ' +
                      'allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                  }
                  return callback(null, true);
                },
              },
        }),
    ],
})
export class GraphqlModule { }
