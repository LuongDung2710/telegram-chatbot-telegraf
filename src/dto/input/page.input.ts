import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class PageInput {
    @Field({nullable: true})
    lastCursor?: string;

    @Field()
    @IsNotEmpty()
    pageSize: number;

    @Field()
    @IsNotEmpty()
    page: number;
}