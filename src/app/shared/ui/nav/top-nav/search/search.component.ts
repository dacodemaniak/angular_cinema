import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/core/model/movie';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/core/service/movie.service';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public movies: Observable<Movie[]>;
  public movieSearch: FormGroup;

  constructor(
  public router: Router,
  private movieService: MovieService,
  private formBuilder: FormBuilder
  ) { }

  public get searchTerm(): AbstractControl {
    return this.movieSearch.controls.searchTerm;
  }

  ngOnInit(): void {
    this.movieSearch = this.formBuilder.group({
      searchTerm: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])
      ]
    });

    this.searchTerm.valueChanges
    .pipe(
      debounceTime(200),
      map(() => {
        this.reload();
      })
    ).subscribe();
  }

  private reload(): void {
    if (this.searchTerm.value.trim().length >= 2){
      console.log(this.searchTerm.value);
      this.movies = this.movieService.byTitle(this.searchTerm.value.trim());
    } else {
      this.movies = null
    }
  }
}
