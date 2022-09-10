import { TemplateResolver } from './template.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/prisma/prisma.service';
import { TemplateService } from './template.service';

@Module({
  providers: [TemplateService, TemplateResolver, PrismaService]
})
export class TemplateModule {}
