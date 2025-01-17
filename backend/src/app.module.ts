import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { ShopModule } from './modules/shop/shop.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './helpers/helper';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import * as Joi from '@hapi/joi';
import { UploadModule } from './modules/upload/upload.module';
import { MailModule } from './modules/mail/mail.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

@Module({
	imports: [
		ConfigModule.forRoot({
            validationSchema: Joi.object({
				MYSQL_HOST: Joi.string().required(),
                MYSQL_PORT: Joi.number().required(),
                MYSQL_USER: Joi.string().required(),
                // MYSQL_PASSWORD: Joi.string(),
                MYSQL_DB: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION_TIME: Joi.string().required(),
            })
        }),
		DatabaseModule,
		AdminModule,
		ShopModule,
		DatabaseModule,
		AuthModule,
		MailModule,
		UploadModule,
		CloudinaryModule
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: ExceptionsLoggerFilter,
		}
	],
})
export class AppModule { }
