import { Controller, Get } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy, Client, ClientGrpc } from '@nestjs/microservices';
import { IAuthorsGrpcService, IBooksGrpcService } from 'src/grpc.interface';
//import { microserviceOptionsAuthorsGRPC, microserviceOptionsBooksGRPC } from '../../grpc.options';

@Controller('dashboard')
export class DashboardController {
    //TODO implement Rest controller
    private authorsClient: ClientProxy;
    private booksClient: ClientProxy;
    constructor() {
        
        this.authorsClient = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBIT_MQ_URL || 'amqp://rabbitmq:5672'],
                queue: process.env.AUTHORS_QUEUE || 'authors',
                queueOptions: {
                  durable: false
            },
        }});
        
        this.booksClient = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBIT_MQ_URL || 'amqp://rabbitmq:5672'],
                queue: process.env.BOOKS_QUEUE || 'books',
                queueOptions: {
                  durable: false
            },
        }});
    }

    @Get()
    async findAll() {
        const authors = await this.authorsClient.emit<any, any>('findAll', '').toPromise();
        const books = await this.booksClient.emit<any, any>('findAll', '').toPromise();
        console.log (authors);
        console.log( books);
        return {authors, books};
    }

    // GRPC

    // @Client(microserviceOptionsAuthorsGRPC)
    // private authorsGRPSClient: ClientGrpc;

    // @Client(microserviceOptionsBooksGRPC)
    // private booksGRPSClient: ClientGrpc;

    // private grpcAuthorsService: IAuthorsGrpcService;
    // private grpcBooksService: IBooksGrpcService;

    // onModuleInit() {
    //     this.grpcAuthorsService = this.authorsGRPSClient.getService<IAuthorsGrpcService>('AuthorsController');
    //     this.grpcBooksService = this.booksGRPSClient.getService<IBooksGrpcService>('BooksController');
    // }

    // @Get('findAllGRPC')
    // async findAllGRPC(){
    //     const authors = await this.grpcAuthorsService.findAllGRPC({}).toPromise();
    //     const books = await this.grpcBooksService.findAllBooksGRPC({}).toPromise();
        
    //     return {authors, books};
    // }
}
