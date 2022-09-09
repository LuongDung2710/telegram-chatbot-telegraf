import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { PageInput } from "src/dto/input/page.input";
import { SortInput } from "src/dto/input/sort.input";

@InputType()
export class GetTemplatesInput {
    @Field()
    @IsNotEmpty()
    paging?: PageInput;

    @Field({nullable: true})
    sort?: SortInput;

    @Field({nullable: true})
    filterName?: string
}