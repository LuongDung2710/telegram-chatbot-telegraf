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