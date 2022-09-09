import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Template } from "src/@generated/prisma-nestjs-graphql/template/template.model";

@ObjectType()
export class TemplatesPaginationPayload {
    @Field()
    @IsNotEmpty()
    count: number;

    @Field(() => [Template], {nullable:false})
    @IsNotEmpty()
    templates: Template[]

    @Field()
    @IsNotEmpty()
    hasNext: boolean

}