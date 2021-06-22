import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthorsModule } from '../authors/authors.module';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

// @Module({
//   controllers: [BooksController],
//   providers: [BooksService],
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'BOOK_SERVICE',
//         transport: Transport.RMQ,
//         options: {
//           urls: ['amqps://wpqgyuie:v7YBKXWWSA4ch4iK5oaZ_oqEiSFAIjcl@dove.rmq.cloudamqp.com/wpqgyuie'],
//           queue: 'main_queue',
//           queueOptions: {
//             durable: false
//           },
//         },
//       },
//     ]),
//   ]
// })
// export class BooksModule {}


@Module({
  imports: [
    forwardRef(() => AuthorsModule),
    ClientsModule.register([
      {
        name: 'AUTHORS_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_URL || 'amqp://rabbitmq:5672'],
          queue: process.env.AUTHORS_QUEUE || 'authors',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}

