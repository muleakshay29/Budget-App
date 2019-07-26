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
export class ExpenseIncomeService {

  // API_URL = 'http://localhost:6001/budgets/';
  API_URL = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  addExpense(data): Observable<any> {
    // const URL = `${this.API_URL}addBudget`;
    const URL = `${this.API_URL}expense`;
    return this.http.post<any>(URL, data, httpOptions)
      .pipe(tap((expense) => console.log(`Expense w/ Description=${data.Description}`)),
        catchError(this.handleError<any>('addBudget'))
      );
  }

  /* getIncomeExpenseList(): Observable<any> {
    // const URL = `${this.API_URL}expense`;
    const URL = `${this.API_URL}expense`;
    return this.http.get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>('getList'))
      );
  } */

  getIncomeExpenseList(startDate): Observable<any> {
    const URL = `${this.API_URL}expense/${startDate}`;
    return this.http.get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>('getIncomeExpenseListTest'))
      );
  }

  getBudgetDetails(budgetId): Observable<any> {
    // const URL = `${this.API_URL}getBudgetDetails/${budgetId}`;
    const URL = `${this.API_URL}expense-details/${budgetId}`;
    return this.http.get<any>(URL, httpOptions)
      .pipe(tap((expense) => console.log(`Expense w/ Description=${budgetId}`)),
        catchError(this.handleError<any>('addBudget'))
      );
  }

  updateExpense(budgetId, data): Observable<any> {
    const URL = `${this.API_URL}updatedBudget/${budgetId}`;
    return this.http.put<any>(URL, data, httpOptions)
      .pipe(tap((expense) => console.log(`Expense w/ Description=${budgetId}`)),
        catchError(this.handleError<any>('updateBudget'))
      );
  }

  deleteBudget(budgetId): Observable<any> {
    const URL = `${this.API_URL}deleteBudget/${budgetId}`;
    return this.http.delete<any>(URL, httpOptions)
      .pipe(tap((expense) => console.log(`Expense w/ Description=${budgetId}`)),
        catchError(this.handleError<any>('deleteBudget'))
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
