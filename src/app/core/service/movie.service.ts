import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Movie} from '../model/movie';
import {catchError, map, take} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {UpdateMovieRequest} from '../Contracts/Requests/movie_requests/update-movie-request';
import {CreateMovieRequest} from '../Contracts/Requests/movie_requests/create-movie-request';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // tslint:disable-next-line:variable-name
  private _movie: Set<Movie> = new Set<Movie>();
  public movie$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>(Array.from(this._movie).sort());
  public movieToUpdate = new UpdateMovieRequest();
  public updatedMovie$: BehaviorSubject<UpdateMovieRequest> = new BehaviorSubject<UpdateMovieRequest>(null);
  public movieToCreate = new CreateMovieRequest();
  public createdMovie$: BehaviorSubject<CreateMovieRequest> = new BehaviorSubject<CreateMovieRequest>(null);
  public createdMovie;


  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * Get All movies
   */
  public allMovies(): Observable<Movie[]> {
    const apiRoute = `${environment.movieRoot}`;
    return  this.httpClient.get<Movie[]>(
      apiRoute,
    ).pipe(
      take(1),
      map((response) => {
        return response.map((movie) => {
          return new Movie().deserialize(movie);
        });
      })
    );
  }
  /**
   * Get Single Movie
   */
  public singleMovie(id: number): Observable<any> {
    const apiRoute = `${environment.movieRoot}${id}`;
    return this.httpClient.get<any>(
      apiRoute,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((response) => {
        console.log(response);
        return response.body;
      }),
      catchError((error: any) => {
        console.log(`Error message :  ${JSON.stringify(error)}`);
        return throwError(error.status);
      })
    );
  }

  /**
   * Update movie
   * @param id: number
   */
  public updateMovie(id: number): Observable<any> {
    const apiRoute = `${environment.movieRoot}${id}`;
    return this.httpClient.put<any>(
      apiRoute,
      this.movieToUpdate,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((response: HttpResponse<any>) => {
        this.updatedMovie$.next(this.movieToUpdate);
        return response;
      }),
      catchError((error: any) => {
        console.log(`Error message :  ${JSON.stringify(error)}`);
        return throwError(error.status);
      })
    );
  }

  /**
   * Create new movie
   * @param movie: CreateMovieRequest
   */
  public createMovie(movie): Observable<any> {
    movie = this.movieToCreate;
    const apiRoute = `${environment.movieRoot}`;
    return this.httpClient.post<any>(
      apiRoute,
      movie,
      {
        observe: 'response'
      },
    ).pipe(
      take(1),
      map((response: HttpResponse<Movie>) => {
        this.createdMovie.next(movie);
        console.log(movie.id);
        return response;
      }),
      catchError((error: any) => {
        console.log(`Error message :  ${JSON.stringify(error)}`);
        return throwError(error.status);
      })
    );
  }

  /**
   * Delete Movie by it's id
   * @param id 
   */
  public deleteMovie(id: number): Observable<any> {
    const apiRoute = `${environment.movieRoot}${id}`;
    return this.httpClient.delete<any>(
      apiRoute,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((response: HttpResponse<any>) => {
        return response;
      }),
      catchError((error: any) => {
        console.log(`Error message :  ${JSON.stringify(error)}`);
        return throwError(error.status);
      })
    );
  }

  /**
   * Search movie by movie title
   * @param title 
   */
  public byTitle(title: string): Observable<Movie[]> {
    //this._years = new Set<number>();
    const apiRoute = `${environment.movieSearch}${title}`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    ).pipe(
      take(1),
      map((Response) => {
        return Response.map((item) => {
          //this._years.add(item.year);
          //this.years$.next(Array.from(this._years).sort());
          return new Movie().deserialize(item);
        });
      })
    );
  }
}
