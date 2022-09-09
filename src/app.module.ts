import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { TemplateResolver } from './template/template.resolver';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [GraphqlModule, TemplateModule],
  controllers: [AppController],
  providers: [AppService, TemplateResolver],
})
export class AppModule {}
