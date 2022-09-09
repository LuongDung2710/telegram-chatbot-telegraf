import { TemplatesPaginationPayload } from './models/template-pagination.payload';
import { Template } from './../../node_modules/.prisma/client/index.d';
import { PrismaService } from './../providers/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ITokenInfo } from 'src/helper/token.helper';
import { CreateUpdateTemplateInput } from './dto/input/create-update-template.input';
import { GeneralPayload } from 'src/models/general-payload';
import { GetTemplatesInput } from './dto/input/get-templates.input';

@Injectable()
export class TemplateService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    //? Create update template
    async createUpdateTemplate(user: ITokenInfo, createUpdateTemplateInput: CreateUpdateTemplateInput): Promise<GeneralPayload> {
        const { id, exampleValue } = createUpdateTemplateInput;
        let templateItem: Template;
        if (id) {
            //? Find configuration
            templateItem = await this.prisma.template.findUnique({ where: { id } });

            if (templateItem) {
                await this.prisma.template.update({
                    data: {
                        exampleValue,
                        updatedBySystemUserId: user.aid,
                        updatedAt: new Date()
                    }, where: { id }
                });
            } 
        } else {
            const data: any = {
                exampleValue,
                createdBySystemUserId: user.aid,
                createdAt: new Date(),
                updatedBySystemUserId: user.aid,
                updatedAt: new Date()
            }
            await this.prisma.template.create({ data });
        }
        return { status: "SUCCESS" }
    }

    //? Delete system template by id: (Hard delete completely remove your record from db)
    async hardDeleteTemplateById(templateId: string): Promise<GeneralPayload> {
        await this.prisma.template.delete({
            where: {
                id: templateId
            }
        });
        return { status: "SUCCESS" }
    }

    //? Delete system template by id: (Soft delete, mark the record as deleted but it still in db for further reference)
    async softDeleteTemplateById(templateId: string, user: ITokenInfo): Promise<GeneralPayload> {
        await this.prisma.template.update({
            where: {
                id: templateId
            }, 
            data: {
                deletedAt: new Date(),
                deletedBySystemUserId: user.aid
            }
        });
        return { status: "SUCCESS" }
    }

    //? Get template by id:
    async getTemplateById(templateId: string): Promise<Template> {
        return this.prisma.template.findUnique({
            where: {
                id: templateId
            }
        });
    }

    //? Get system template menu:
    async getTemplateMenu(): Promise<Template[]> {
        return this.prisma.template.findMany({
            where: {
                deletedAt: null
            }
        });
    }

    //? Get template for paginations
    async getPaginationTemplates(getTemplatesInput: GetTemplatesInput): Promise<TemplatesPaginationPayload> {
        const { paging, filterName } = getTemplatesInput;
        const { page = 1, pageSize = 50 } = paging;

        let totalItem: number = 0;
        let whereCondition: any = { hidden: false, deletedAt: null };
        let sortFields: any = { createdAt: 'desc' };

        if (filterName) {
            whereCondition['filterName'] = filterName;
        }

        let countResult = await this.prisma.template.count({
            where: whereCondition, select: { _all: true },
        });

        totalItem = countResult._all;


        const templates = await this.prisma.template.findMany({
            where: whereCondition,
            skip: pageSize * (page - 1), take: pageSize,
            orderBy: sortFields
        });

        const hasNext = (pageSize * (page - 1) + templates.length) !== totalItem;

        return { count: totalItem, templates, hasNext };
    }
}
