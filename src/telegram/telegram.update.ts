import { Context } from './../interfaces/context.interface';
import { UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { Command, Ctx, Help, InjectBot, Message, On, Start, Update } from "nestjs-telegraf";
import { TelegrafExceptionFilter } from "src/common/filters/telegraf-exception.filter";
import { ResponseTimeInterceptor } from "src/common/interceptors/response-time.interceptor";
import { Telegraf } from "telegraf";
import { AdminGuard } from 'src/common/guards/admin.guard';
import { ReverseTextPipe } from 'src/common/pipes/reverse-text.pipe';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class TelegramUpdate {
  constructor(
    @InjectBot("louisnguyen2701")
    private readonly bot: Telegraf<Context>,
  ) {}

  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.telegram.getMe();
    return `Hey, I'm ${me.first_name}`;
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me any text';
  }

  @Command('admin')
  @UseGuards(AdminGuard)
  onAdminCommand(): string {
    return 'Welcome judge';
  }


  @Command('quit')
  onQuitCommand(@Ctx() ctx: Context): void {
    ctx.leaveChat();
  }

  @On('text')
  onMessage(
    @Message('text', new ReverseTextPipe()) reversedText: string,
  ): string {
    return 'ok this is text'
  }

  @On('sticker')
  onSticker(
  ): string {
    return 'ok this is sticker'
  }
}   
