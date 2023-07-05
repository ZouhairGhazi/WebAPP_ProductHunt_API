import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  api_url = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  getProductList(selectedDate: string | null): Observable<any> {
    // Make the API call using the selectedDate value, while verifying that it isn't null
    if (selectedDate !== null) {
      const params = new HttpParams().set('date', selectedDate);
      // Making a get request in order to pass the date selected by the user to backend services
      return this.http.get(this.api_url, { params, headers: { 'Content-Type': 'application/json' } }) 
      .pipe(
        catchError(error => {
          console.error(error);
          throw error;
      })
    );
    }
    else {
      console.error("Date passed value is null.");
      return of();
    }
  }
}
