import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { Transport } from '@nestjs/microservices';

import { join } from 'path';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(8092);
// }

// const microserviceOptions = {
//     transport: Transport.TCP,
//     options: {
//         host: '127.0.0.1',
//         port: 8092,
//     },
// };

// const microserviceOptionsGRPC = {
//     transport: Transport.GRPC,
//     options: {
//         package: 'books',
//         protoPath: join(__dirname, '../src/books.proto'),
//     },
// };
const microserviceOptionsRMQ = {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_MQ_URL || 'amqp://rabbitmq:5672'],
      queue: process.env.AUTHORS_QUEUE || 'books',
      queueOptions: {
        durable: false
      },
    },
  };

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, /*microserviceOptionsGRPC*/ microserviceOptionsRMQ);
    app.listen(() => console.log('Books Microservice is listening'));
  }

bootstrap();
