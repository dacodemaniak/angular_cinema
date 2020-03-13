import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, map, take} from 'rxjs/operators';
import {WishList} from '../model/wish-list';

@Injectable({
  providedIn: 'root'
})
export class WishService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * Get All User Wished Movies
   */
  public allWishedMovies(): Observable<WishList[]> {
    const apiRoute = `${environment.wishList}`;
    console.log(apiRoute);
    return  this.httpClient.get<WishList[]>(
      apiRoute,
    ).pipe(
      take(1),
      map((response) => {
        return response.map((wish) => {
          return new WishList().deserialize(wish);
        });
      })
    );
  }

  /**
   * Add movie to wishList or Remove
   */
  public addToWishlist(id: number): Observable<any> {
    const apiRoute = `${environment.wishList}/${id}`;
    return this.httpClient.post<any>(
      apiRoute,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((response) => {
        return response.body;
      }),
      catchError((error: any) => {
        console.log(`Error message :  ${JSON.stringify(error)}`);
        return throwError(error.status);
      })
    );
  }
}
