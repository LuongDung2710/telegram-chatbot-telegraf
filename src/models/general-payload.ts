import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GeneralPayload{
    @Field({nullable: true})
    status?: string

    @Field({nullable: true})
    verificationId?: string;

}