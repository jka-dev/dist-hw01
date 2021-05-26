import { Observable } from 'rxjs';

export interface IAuthorsGrpcService {
    findAllGRPC(arg: any) : Observable<any>;
}

export interface IBooksGrpcService {
    findAllBooksGRPC(arg: any) : Observable<any>;
}


