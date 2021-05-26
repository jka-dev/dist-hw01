import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { MessagePattern, GrpcMethod, Ctx, RmqContext, Payload } from '@nestjs/microservices';
import { AuthorsService } from './authors.service';
import { Author } from './authors.model';

interface IAuthorsArray {
    authors: Author[];
}

@Controller('authors')
export class AuthorsController {

  private idCounter: number = 10;
  constructor(private readonly authorsService: AuthorsService) {

  }

  //TODO implement Rest controller
@Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findById(+id);
  }

  //@Get()
  @MessagePattern('findAll')
  findAll(){
    return this.authorsService.getAuthors();
  }

  @Post()
  create(@Body() author: Author){
    return this.authorsService.createAuthor(author);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() author: Author) {
    return this.authorsService.updateAuthor(+id, author);
  }

  @GrpcMethod('AuthorsController', 'findAllGRPC')
  findAllGRPC(arg: any) : IAuthorsArray{
    return { authors: this.authorsService.getAuthors() };
  }

  @MessagePattern('createBookAndAuthor')
  onBookCreated(@Payload() data: any, @Ctx() context: RmqContext){
      console.log(data);
      const author = this.authorsService.findById(data.authorId);
      if(author){
          author.numberOfBooks++;
      }else{
          this.authorsService.createAuthor(new Author(this.idCounter++)
          .withFirstName(data.firstName)
          .withLastName(data.lastName)
          .withNumberOfBooks(1));
      }
      console.log(this.authorsService.getAuthors());
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
  }


  
}
