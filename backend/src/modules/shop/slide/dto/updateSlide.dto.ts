import { IsString, IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSlidesDto {

    @IsString()
    @ApiProperty()
	avatar: string;


    @IsString()
    @ApiProperty()
	name: string;

    @IsInt()
    @ApiProperty()
	status: number;

    updated_at: Date = new Date();

}