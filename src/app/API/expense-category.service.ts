import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {

  // API_URL = 'http://localhost:6001/categories/';
  API_URL = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  addCategory(data) : Observable<any> {
    // const URL = `${this.API_URL}addCategory`;
    const URL = `${this.API_URL}category`;
    return this.http.post<any>(URL, data, httpOptions)
      .pipe(tap((expense) => console.log(`Expense w/ Description=${expense.Description}`)),
      catchError(this.handleError<any>('addCategory'))
    );
  }

  getCategoryList() : Observable<any>{
    const URL = `${this.API_URL}category`;
    return this.http.get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>('getCategoryList'))
    );
  }

  getCategoryDetails(categoryId): Observable<any>{
    const URL = `${this.API_URL}getCategoryDetails/${categoryId}`;
    return this.http.get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>('getCategoryDetails'))
    );
  }

  updateCategory(categoryId, data) : Observable<any> {
    const URL = `${this.API_URL}updateCategory/${categoryId}`;
    return this.http.put<any>(URL, data, httpOptions)
      .pipe(tap((expense) => console.log(`Expense w/ Description=${expense.Description}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  deleteCategory(categoryId): Observable<any> {
    const URL = `${this.API_URL}deleteCategory/${categoryId}`;
    return this.http.delete<any>(URL, httpOptions)
      .pipe(tap((category) => console.log(`Category w/ Description=${categoryId}`)),
        catchError(this.handleError<any>('deleteCategory'))
      );
  }

  checkCategory(data): Observable<any> {
    const URL = `${this.API_URL}checkcategory`
    return this.http.post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>('checkCategory'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
