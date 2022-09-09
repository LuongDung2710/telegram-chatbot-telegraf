import { GetTemplatesInput } from './dto/input/get-templates.input';
import { TemplatesPaginationPayload } from './models/template-pagination.payload';
import { ITokenInfo } from './../helper/token.helper';
import { CreateUpdateTemplateInput } from './dto/input/create-update-template.input';
import { TemplateService } from './template.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GeneralPayload } from 'src/models/general-payload';
import { CurrentUser } from 'src/custom-decorators/current-user.decorator';
import { Template } from 'src/@generated/prisma-nestjs-graphql/template/template.model';

@Resolver()
export class TemplateResolver {
    constructor(
        private templateService: TemplateService
    ) {}
    
    //* Create Update Template API
    @UseGuards(GqlAuthGuard)
    @Mutation(_ => GeneralPayload)
    async createUpdateTemplate(
        @CurrentUser() user: ITokenInfo,
        @Args('createUpdateTemplateInput') createUpdateTemplateInput: CreateUpdateTemplateInput
    ): Promise<GeneralPayload> {
        return this.templateService.createUpdateTemplate(user, createUpdateTemplateInput);
    }

    //* Hard Delete Template Id API
    @UseGuards(GqlAuthGuard)
    @Mutation(_ => GeneralPayload)
    async hardDeleteTemplateById(
        @Args('templateId') templateId: string
    ): Promise<GeneralPayload> {
        return this.templateService.hardDeleteTemplateById(templateId);
    }

    //* Soft Delete Template Id API
    @UseGuards(GqlAuthGuard)
    @Mutation(_ => GeneralPayload)
    async softDeleteTemplateById(
        @Args('templateId') templateId: string,
        @CurrentUser() user: ITokenInfo,
    ): Promise<GeneralPayload> {
        return this.templateService.softDeleteTemplateById(templateId, user);
    }

    //* Get Templates Pagination
    @UseGuards(GqlAuthGuard)
    @Query(_ => TemplatesPaginationPayload)
    async getPaginationTemplates(
        @Args('getTemplatesInput') getTemplatesInput: GetTemplatesInput
    ): Promise<TemplatesPaginationPayload> {
        return this.templateService.getPaginationTemplates(getTemplatesInput);
    }

    //* Get Template By Id
    @UseGuards(GqlAuthGuard)
    @Query(_ => Template)
    async getTemplateById(
        @Args('templateId') templateId: string
    ): Promise<Template> {
        return this.templateService.getTemplateById(templateId);
    }

    //* Get Template Menu
    @UseGuards(GqlAuthGuard)
    @Query(_ => [Template])
    async getTemplateMenu(
    ): Promise<Template[]> {
        return this.templateService.getTemplateMenu();
    }
}
