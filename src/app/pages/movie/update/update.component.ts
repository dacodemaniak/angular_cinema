import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms';
import {MovieService} from '../../../core/service/movie.service';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass']
})
export class UpdateComponent implements OnInit {
  public movie: any;
  public editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private activeRoute: ActivatedRoute
  ) { }

  @Input()
  movieIn;

  public get title(): AbstractControl {
    return this.editForm.controls.title;
  }
  public get releaseDate(): AbstractControl {
    return this.editForm.controls.releaseDate;
  }
  public get originalTitle(): AbstractControl {
    return  this.editForm.controls.originalTitle;
  }
  public get runtime(): AbstractControl {
    return  this.editForm.controls.runtime;
  }
  public get movieType(): AbstractControl {
    return  this.editForm.controls.movieType;
  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data: { movie: any }) => {
      this.movie = data.movie;
      this.editForm = this.formBuilder.group({
        title: [
          this.movie.title,
          Validators.compose([
            Validators.required
          ])
        ],
        releaseDate: [
          this.movie.releaseDate,
          Validators.compose([
            Validators.required
          ])
        ],
        originalTitle: [
          this.movie.originalTitle,
          Validators.compose([
            Validators.required
          ])
        ],
        runtime: [
          this.movie.runtime,
          Validators.compose([
            Validators.required
          ])
        ]
      });

      this.releaseDate.setValue(this.movie.releaseDate);
      this.title.setValue(this.movie.title);
      this.originalTitle.setValue(this.movie.originalTitle);
      this.runtime.setValue(this.movie.runtime);

    });
  }

  public doUpdate() {
    this.movieService.movieToUpdate.title = this.title.value;
    this.movieService.movieToUpdate.releaseDate = this.releaseDate.value;
    this.movieService.movieToUpdate.originalTitle = this.originalTitle.value;
    this.movieService.movieToUpdate.runtime = this.runtime.value;

    this.movieService.updateMovie(this.movieIn.id)
      .pipe(
        take(1)
      ).subscribe((response: HttpResponse<any>) => {
        console.log('update is done');
        return response;
    });
  }

  public doDelete() {
    this.movieService.deleteMovie(this.movieIn.id)
      .pipe().subscribe((response: HttpResponse<any>) => {
      console.log('Movie Was Deleted');
    });
  }

}
