import { Inject, Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import TransactionEntity from "../../entities/transaction.entity";


@Injectable()
export class TransactionService {

    private transactionRepository: Repository<TransactionEntity>

    private logger = new Logger('TransactionService');

    constructor(
       
    ) {
    }

    async getListsTransaction(paging: any, filters: any)
    {
        let condition: any = {};

        if (filters.status)
            condition.t_status = filters.status;

        if (filters.user_id)
            condition.t_user_id = filters.user_id;

        console.log('------------- filters: ', filters);
        return await this.transactionRepository.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }
}
