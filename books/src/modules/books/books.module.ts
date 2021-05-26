import { Module } from '@nestjs/common';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Transport, ClientsModule} from '@nestjs/microservices';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
    ClientsModule.register([
      {
        name: 'BOOK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://wpqgyuie:v7YBKXWWSA4ch4iK5oaZ_oqEiSFAIjcl@dove.rmq.cloudamqp.com/wpqgyuie'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ]
})
export class BooksModule {}
