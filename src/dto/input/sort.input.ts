import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class SortInput {
    @Field({nullable: false})
    field: string;

    @Field({nullable: false})
    sortBy: string;
}