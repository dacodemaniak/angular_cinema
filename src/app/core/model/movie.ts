import {DecimalPipe} from '@angular/common';
import {Person} from './person';
import {Gendre} from './gendre';
import {MovieType} from './movie-type';

export class Movie {
  public id: number;
  public title: string;
  public releaseDate: number;
  public resume: string;
  public originalTitle: string;
  public runtime: number;
  public raitingAverage: DecimalPipe;
  public nbrRaitings: number;
  public director: Person;
  public MovieType: MovieType;
  public movieActors: Array<Person>;
  public movieGendres: Array<Gendre>;
  public movieComments: Array<Comment>;


  public static compare(a: Movie, b: Movie): number {
    // tslint:disable-next-line:no-unused-expression
    a.id < b.id ? -1 : 1;
    return 0;
  }

  public compareTo(movie: Movie): boolean {
    return this.id === movie.id;
  }

  public deserialize(datas: any): Movie {
    Object.assign(this, datas);
    return this;
  }

}
