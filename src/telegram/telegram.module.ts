import { TelegramUpdate } from './telegram.update';
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramService } from './telegram.service';

@Module({
  providers: [TelegramService, TelegramUpdate],
  imports: [
    TelegrafModule.forRoot({
      botName: "louisnguyen2701",
      token: "5648181374:AAGWBds6q3ltIA021zA5-Qr68rg6YgAiRpM",
    })
  ],
})
export class TelegramModule {}
