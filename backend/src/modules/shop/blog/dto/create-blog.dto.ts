import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateBlogDto {
	@IsString()
    @IsNotEmpty()
    @ApiProperty()
	title: string;

    @IsString()
    @ApiProperty()
	description: string;

    // @IsString()
    @ApiProperty()
	@IsOptional()
	avatar: string | null;

    @IsString()
	@IsOptional()
    @ApiProperty()
	slug?: string;

	@IsString()
	@IsOptional()
    @ApiProperty()
	content: string;

	@IsString()
	@IsOptional()
    @ApiProperty()
	author_name: string;

	@IsString()
	@IsOptional()
    @ApiProperty()
	author_email: string;

    @IsInt()
    @ApiProperty()
	status: number;

    @IsInt()
    @ApiProperty()
	menu_id: number;

    created_at: Date = new Date();
    updated_at: Date = new Date();
}
