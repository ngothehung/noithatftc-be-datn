import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BackendModule } from './backend/backend.module';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';
import { ExceptionsLoggerFilter } from "./utils/exceptionsLogger.filter";
import { APP_FILTER } from "@nestjs/core";
import { HttpModule } from "@nestjs/axios";

// @ts-ignore
@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: async () => ({
                timeout: 120000,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        BackendModule,
        DatabaseModule,
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                MYSQL_HOST: Joi.string().required(),
                MYSQL_PORT: Joi.number().required(),
                MYSQL_USER: Joi.string().required(),
                // MYSQL_PASSWORD: Joi.string().required(),
                MYSQL_DB: Joi.string().required(),
                PORT: Joi.number(),
                UPLOADED_FILES_DESTINATION: Joi.string().required()
            }),
        }),
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ExceptionsLoggerFilter,
        },
    ]
})
export class AppModule {}
