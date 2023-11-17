import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';

import { OrderModule } from './order/order.module';
import { ArticleModule } from './article/article.module';

import { VoteModule } from './vote/vote.module';
import { CommentModule } from './comment/comment.module';


@Module({
  imports: [ProductModule, CategoryModule, UserModule, OrderModule, ArticleModule, VoteModule, CommentModule]
})
export class FrontendModule {}
