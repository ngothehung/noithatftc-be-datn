import { IsString, IsInt, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
	name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
	slug: string;

    created_at: Date = new Date();
    updated_at: Date = new Date();

}