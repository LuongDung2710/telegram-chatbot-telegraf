import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { TemplateModule } from './template/template.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [GraphqlModule, TemplateModule, TelegramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
