import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './orm.config'
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), BookModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
