import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import TransactionEntity from "../../entities/transaction.entity";

import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TransactionEntity
        ]),
        HttpModule
    ],
    controllers: [TransactionController],
    providers: [TransactionService]
})
export class TransactionModule {}
