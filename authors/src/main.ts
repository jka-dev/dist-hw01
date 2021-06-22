import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { Transport, } from '@nestjs/microservices';
import { join } from 'path';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(8080);
// }

const microserviceOptions = {
    transport: Transport.TCP,
    options: {
        host: '127.0.0.1',
        port: 8091,
    },
};

// const microserviceOptionsGRPC = {
//     transport: Transport.GRPC,
//     options: {
//         package: 'authors',
//         protoPath: join(__dirname, '../src/authors.proto'),
//     },
// };

// const microserviceOptionsRMQ = {
//     transport: Transport.RMQ,
//     options: {
//       urls: ['amqps://wpqgyuie:v7YBKXWWSA4ch4iK5oaZ_oqEiSFAIjcl@dove.rmq.cloudamqp.com/wpqgyuie'],
//       queue: 'main_queue',
//       noAck: false,
//       queueOptions: {
//         durable: false
//       }
//     }
// };

const microserviceOptionsRMQ = {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_MQ_URL || 'amqp://rabbitmq:5672'],
      queue: process.env.AUTHORS_QUEUE || 'authors',
      queueOptions: {
        durable: false
      },
    },
  };

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, microserviceOptionsRMQ /*microserviceOptions, microserviceOptionsGRPC*/);
    app.listen(() => console.log('Authors Microservice is listening'));
  }

bootstrap();
