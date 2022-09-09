## 1. Prepare Prisma Model

### Firstly you need to create one new model in schema.prisma (Remember to change the name of template and realtionship according to the new module )

```

model Template {
  id                    String      @id @default(cuid()) @db.VarChar(30)
  createdAt             DateTime    @default(now())
  createdBySystemUserId String      @db.VarChar(30)
  createdSystemUser     SystemUser  @relation("templateCreatedBy", fields: [createdBySystemUserId], references: [id])
  updatedAt             DateTime    @default(now())
  updatedBySystemUser   String?     @db.VarChar(30)
  updatedSystemUser     SystemUser? @relation("templateUpdatedBy", fields: [updatedBySystemUser], references: [id])
  deletedAt             DateTime?
  deletedBySystemUser   String?     @db.VarChar(30)
  deleteSystemUser      SystemUser? @relation("templateDeletedBy", fields: [deletedBySystemUser], references: [id])
  // Add your more table properties below
}

```

### Add the relationship in the SystemUser model ( Remember to change the name according to tbe new module )

```
  templateCreatedBySystemUser           Template[]            @relation("templateCreatedBy")
  templateUpdatedBySystemUser           Template[]            @relation("templateUpdatedBy")
  templateDeletedBySytemUser            Template[]            @relation("templateDeletedBy")
```

=> After add the schema model in. Runned "npm run migrate" to apply the changes

## 2. Generate the new module by nest command in your terminal:

```
- nest g module template
- nest g service template

  If you want to implement REST-API (generate your controller file)

- nest g controller template
  If you want to implement GRAPHQL ( generate your resolver file )
- nest g resolver template
```

## 3. Prepare API

\*\*\* Remember to change the word "Template" to your ModuleName

### Create Update API:

- Input File:
  - Under your root module directory create a file "dto/input/create-update-template.input.ts"
  ```
    import { Field, InputType } from "@nestjs/graphql";
    import { IsNotEmpty } from "class-validator";

    @InputType()
    export class CreateUpdateTemplateInput {
    @Field({nullable: true})
    id?: string; // The id property determine you request is update or create. (If id is not provided, the request is created)

    @Field({nullable: false})
    @IsNotEmpty()
    exampleValue: string; // This is example value properties. In you real module please remove it

    }
  ```


- Service File (It's created above by command - line 37):
  ```
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
            } else {
                const data: any = {
                    exampleValue,
                    createdBySystemUserId: user.aid,
                    createdAt: new Date(),
                    updatedBySystemUserId: user.aid,
                    updatedAt: new Date()
                }
                await this.prisma.configuration.create({ data });
            }
        }
        return { status: "SUCCESS" }
    }
  ```

- Resolver File:
  ```
    //* Create Update Template API
    @UseGuards(GqlAuthGuard)
    @Mutation(_ => GeneralPayload)
    async createUpdateTemplate(
        @CurrentUser() user: ITokenInfo,
        @Args('createUpdateTemplateInput') createUpdateTemplateInput: CreateUpdateTemplateInput
    ): Promise<GeneralPayload> {
        return this.templateService.createUpdateTemplate(user, createUpdateTemplateInput);
    }
  ```

### Hard Delete API:

- Service File: 
  ```
    //? Delete system template by id: (Hard delete completely remove your record from db)
    async hardDeleteTemplateById(templateId: string): Promise<GeneralPayload> {
        await this.prisma.template.delete({
            where: {
                id: templateId
            }
        });
        return { status: "SUCCESS" }
    }
  ```

- Resolver File: 
  ```
    /* Hard Delete Template Id API
    @UseGuards(GqlAuthGuard)
    @Mutation(_ => GeneralPayload)
    async hardDeleteTemplateById(
        @Args('templateId') templateId: string
    ): Promise<GeneralPayload> {
        return this.templateService.hardDeleteTemplateById(templateId);
    }
  ```
### Soft Delete API:

- Service File: 
  ```
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
  ```

- Resolver File: 
  ```
    //* Soft Delete Template Id API
    @UseGuards(GqlAuthGuard)
    @Mutation(_ => GeneralPayload)
    async softDeleteTemplateById(
        @Args('templateId') templateId: string,
        @CurrentUser() user: ITokenInfo,
    ): Promise<GeneralPayload> {
        return this.templateService.softDeleteTemplateById(templateId, user);
    }
  ```


### Get Template By Id API:

- Service File: 
  ```
    //? Get template by id:
    async getTemplateById(templateId: string): Promise<Template> {
        return this.prisma.template.findUnique({
            where: {
                id: templateId
            }
        });
    }
  ```

- Resolver File: 
  ```
    //* Get Template By Id
    @UseGuards(GqlAuthGuard)
    @Query(_ => Template)
    async getTemplateById(
        @Args('templateId') templateId: string
    ): Promise<Template> {
        return this.templateService.getTemplateById(templateId);
    }
  ```


### Get Template Menu API:

- Service File: 
  ```
    //? Get template menu:
    async getTemplateMenu(): Promise<Template[]> {
        return this.prisma.template.findMany({
            where: {
                deletedAt: null
            }
        });
    }
  ```

- Resolver File: 
  ```
    //* Get Template Menu
    @UseGuards(GqlAuthGuard)
    @Query(_ => [Template])
    async getTemplateMenu(
    ): Promise<Template[]> {
        return this.templateService.getTemplateMenu();
    }
  ```

### Get Template Pagination API:
- Input File: 
  ```
    import { Field, InputType } from "@nestjs/graphql";
    import { IsNotEmpty } from "class-validator";

    @InputType()
    export class CreateUpdateTemplateInput {
        @Field({nullable: true})
        id?: string; // The id property determine you request is update or create. (If id is not provided, the request is created)

        @Field({nullable: false})
        @IsNotEmpty()
        exampleValue: string;
    }
  ```

- Service File:
  ```
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

        let countResult = await this.prisma.role.count({
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
  ```

- Resolver File :
  ```
    //* Get Templates Pagination
    @UseGuards(GqlAuthGuard)
    @Query(_ => TemplatesPaginationPayload)
    async getPaginationTemplates(
        @Args('getTemplatesInput') getTemplatesInput: GetTemplatesInput
    ): Promise<TemplatesPaginationPayload> {
        return this.templateService.getPaginationTemplates(getTemplatesInput);
    }
  ```

