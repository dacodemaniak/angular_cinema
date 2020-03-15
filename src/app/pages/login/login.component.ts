import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IdentityService} from '../../core/service/identity.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private identityService: IdentityService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [ '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ])
      ],
      password: [ '',  Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public get login(): AbstractControl {
    return this.loginForm.controls.email;
  }

  public get password(): AbstractControl {
    return this.loginForm.controls.password;
  }

  public get form() { 
    return this.loginForm.controls; 
  }

  public doLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.identityService.login(this.form.email.value, this.form.password.value)
      .pipe(take(1)).subscribe(
        data => { this.router.navigate(['home']);
      });
  }
}
