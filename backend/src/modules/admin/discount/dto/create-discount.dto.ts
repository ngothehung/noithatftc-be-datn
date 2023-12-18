import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDiscountDto {

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	code: string;

    @ApiProperty()
	@IsOptional()
	price: number;

    @ApiProperty()
	@IsOptional()
	status: number;

    created_at: Date = new Date();
    updated_at: Date = new Date();
}
