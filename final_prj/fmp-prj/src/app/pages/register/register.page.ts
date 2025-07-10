import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthService } from '../../services/fireauth.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';

const LOGIN_PAGE_ROUTE: string = "/login";
const REGIST_SUCCESS_MSG: string = "Your account has been created";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  validations_form: FormGroup = {} as FormGroup;
  errorMessage: string = "";
  successMessage: string = "";

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    private authService: FireauthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private util: UtilityService
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        '', 
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        '', 
        Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])
      ),
    });
  }

  tryRegister(value: any) {
    this.authService.doRegister(value)
      .then(
        res => {
          console.log(res);
          this.util.openToast(REGIST_SUCCESS_MSG);
          this.goLoginPage();
        }, 
        err => {
          console.log(err);
          this.errorMessage = err.message;
        }
      );
  }

  goLoginPage() {
    this.router.navigate([LOGIN_PAGE_ROUTE]);
  }
}
