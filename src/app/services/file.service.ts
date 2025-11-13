import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { File } from '../interface/file';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  private http=inject(HttpClient)

  private url=environment.baseUrl+"api/TestingFiles"



  createFile(file:File):Observable<any>{


    return this.http.post<any>(this.url,file).pipe(
      tap(
        response => console.log(response)
        
      )
    )

  }
  
}
