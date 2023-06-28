import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,tap,map } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { Document } from './documents';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  baseUrl = 'http://localhost/api';
                
constructor(private http: HttpClient) { }
                
// getAll() {
//   return this.http.get(`${this.baseUrl}/documents`).pipe(
//     map((res: any) => {
//       return res['data'];
//     })
//   );
// }





getAll(type: string, format: string) {
  const params = new HttpParams()
    .set('type', type)
    .set('format', format);
  console.log(params);
  return this.http.get(`${this.baseUrl}/documents`,{params: params}).pipe(
    map((res: any) => {
      return res['data'];
    })
  );
}


// getAll(): Observable<Document[]> {
//   return this.http.get<Document[]>(`${this.baseUrl}/documents`).pipe(
//     map((res: any) => {
//       return res['data'];
//     })
//   );
// }



store(document: Document): Observable<Document>{
  console.log(document);
  return this.http.post<Document>(`${this.baseUrl}/addDocument`, { data: document }).pipe(
    map((res: any) => {
      return res['data'];
    })
  );
}

update(document: Document): Observable<Document> {
  console.log({ data: document });
  return this.http.put<Document>(`${this.baseUrl}/updateDocument`, { data: document });
}


delete(id: any) {
  const params = new HttpParams()
    .set('id', id.toString());

  return this.http.delete(`${this.baseUrl}/deleteDocument`, { params: params });
}

}
