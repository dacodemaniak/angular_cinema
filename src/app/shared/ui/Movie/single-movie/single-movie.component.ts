import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../../core/model/movie';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../../../core/service/movie.service';
import {$} from 'protractor';
import {UpdateMovieRequest} from '../../../../core/Contracts/Requests/movie_requests/update-movie-request';
import {CreateMovieRequest} from '../../../../core/Contracts/Requests/movie_requests/create-movie-request';
import {WishService} from '../../../../core/service/wish.service';
import {map, take} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {IdentityService} from '../../../../core/service/identity.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {
  movie: Movie;

  constructor(
    public router: ActivatedRoute,
    public movieService: MovieService,
    public wishService: WishService,

  ) { }
  
  /**
  * singleMovie come from the "parent" component i.e in your case : movie-component.ts
  **/
  @Input ()
  singleMovie: any;

  ngOnInit(): void {
    /**
    * These lines does not have to exists, singleMovie is well available from @Input() decorator
    **/
    //this.router.paramMap.subscribe((paramMap: any) => {
    //  this.movieService.singleMovie(paramMap.params.id).subscribe((movie: any) => {
    //    this.singleMovie = movie;
    //  });
    //});

    this.movieService.updatedMovie$.subscribe((updateMovie: UpdateMovieRequest) => {
      console.log('Received notification of an updated movie');
      this.singleMovie = updateMovie;
    });

  }

  toWishlist() {
    this.wishService.addToWishlist(this.singleMovie.id)
      .pipe(
        take(1)
      ).subscribe((response: HttpResponse<any>) => {
        return response;
    });
    console.log(`${JSON.stringify(this.singleMovie.id)}`);
  }
}
