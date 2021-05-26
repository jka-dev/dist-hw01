import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const microserviceOptionsAuthorsGRPC : ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'authors',
        protoPath: join(__dirname, '../src/authors.proto'),
    },
};

export const microserviceOptionsBooksGRPC : ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'books',
        protoPath: join(__dirname, '../src/books.proto'),
    },
};