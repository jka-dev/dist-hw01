import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';

import { BooksService } from './books.service';

import { Book, BookAndAuthor } from './books.model';

import { MessagePattern, GrpcMethod, ClientProxy } from '@nestjs/microservices'

interface IBooksArray {
    books: Book[];
}

@Controller('books')
export class BooksController {

    private idCounter: number = 10;
  constructor(private readonly booksService: BooksService,
     @Inject('BOOK_SERVICE') private readonly rmqClient: ClientProxy) {
  }

  //TODO implement Rest controller

  @Post('createBookAndAuthor')
  createBook(@Body() book: BookAndAuthor){
      this.rmqClient.emit("createBookAndAuthor", book).subscribe(result => {
          this.booksService.createBook(new Book(this.idCounter++)
          .withTitle(book.title)
          .withDescription(book.pages.toString())
          .withAuthorId(book.authorId))
        });

        console.log(this.booksService.getBooks());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findById(+id);
  }

  //@Get()
  @MessagePattern('findAll')
  findAll(){
    return this.booksService.getBooks();
  }

  @Post()
  create(@Body() book: Book){
    return this.booksService.createBook(book);
  }

  //GRPC

  @GrpcMethod('BooksController', 'findAllBooksGRPC')
  findAllBooksGRPC(arg: any) : IBooksArray{
    return { books: this.booksService.getBooks() };
  }

}
