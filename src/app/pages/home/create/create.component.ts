import {Component, Input, OnInit} from '@angular/core';
import {MovieService} from '../../../core/service/movie.service';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Movie} from '../../../core/model/movie';
import {CreateMovieRequest} from '../../../core/Contracts/Requests/movie_requests/create-movie-request';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {
  public movie: any;
  public createForm: FormGroup;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) { }

  public get title(): AbstractControl {
    return this.createForm.controls.title;
  }
  public get releaseDate(): AbstractControl {
    return this.createForm.controls.releaseDate;
  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data: { movie: any }) => {
      this.movie = data.movie;
      this.createForm = this.formBuilder.group({
        title: [
          '',
          Validators.compose([
            Validators.required
          ])
        ],
        releaseDate: [
          '',
          Validators.compose([
            Validators.required
          ])
        ]
      });
    });
  }

  public doCreate() {
    this.movieService.movieToCreate.title = this.title.value;
    this.movieService.movieToCreate.releaseDate = this.releaseDate.value;
    this.movieService.createMovie(this.movieService.movieToCreate)
      .pipe(
        take(1)
      ).subscribe((response: HttpResponse<CreateMovieRequest>) => {
        console.log('movie was created');
    });

    this.movieService.createdMovie$.subscribe((createMovie: CreateMovieRequest) => {
      console.log('Received notification of an created movie');
      this.movie = createMovie;
    });
  }
}
