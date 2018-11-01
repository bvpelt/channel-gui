import {HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";


export class BaseService {

  protected makeHeaders(username: string, password: string): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    //let username = "admin";
    //let password = "geheim";
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/json; charset=utf-8");

    return headers;
  }

  protected makeSystemHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    let username = "system";
    let password = "ditisgeheim";
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/json; charset=utf-8");

    return headers;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  protected log(message: string) {
    console.log(message);
  }

  protected logRes<T>(result: T) {
    this.log("httpget result: " + JSON.stringify(result));
  }

}
