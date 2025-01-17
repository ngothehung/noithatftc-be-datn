import { IsString, IsInt, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateSlidesDto {

    @IsString()
    @ApiProperty()
	@IsOptional()
	avatar?: string;


    @IsString()
    @ApiProperty()
	name: string;

    @ApiProperty()
	hot: number;

    @IsInt()
    @ApiProperty()
	status: number;

    created_at: Date = new Date();
    updated_at: Date = new Date();

}