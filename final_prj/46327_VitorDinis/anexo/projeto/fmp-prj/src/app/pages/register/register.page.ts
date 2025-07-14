import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthService } from '../../services/fireauth.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { EMAIL_VALIDATION_PATTERN, ERROR_DISPLAY_TIMEOUT, FAILED_LOGIN_ERROR_MSG, FAILED_REGIST_ERROR_MSG, INVALID_EMAIL_MSG, INVALID_PASSWORD_MSG, PASSWORD_MIN_LENGTH, REGIST_SUCCESS_MSG, REQUIRED_EMAIL_MSG, REQUIRED_PASSWORD_MSG } from '../auth.constants';
import { Auth } from '@angular/fire/auth';

const APP_MAIN_PAGE_ROUTE: string = "/tabs";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  validations_form: FormGroup = {} as FormGroup;
  errorMessage: string = "";

  validation_messages = {
    'email': [
      { type: 'required', message: REQUIRED_EMAIL_MSG },
      { type: 'pattern', message: INVALID_EMAIL_MSG }
    ],
    'password': [
      { type: 'required', message: REQUIRED_PASSWORD_MSG },
      { type: 'minlength', message: INVALID_PASSWORD_MSG }
    ]
  };

  constructor(
    private authService: FireauthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private afAuth: Auth,
    private util: UtilityService
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        '', 
        Validators.compose([
          Validators.required,
          Validators.pattern(EMAIL_VALIDATION_PATTERN)
        ])
      ),
      password: new FormControl(
        '', 
        Validators.compose([
          Validators.minLength(PASSWORD_MIN_LENGTH),
          Validators.required
        ])
      ),
    });
  }

  tryRegister(value: any) {
    this.authService.doRegisterWithEmailAndPassword(value)
      .then(
        res => {
          this.util.openToast(REGIST_SUCCESS_MSG);
          this.router.navigate([APP_MAIN_PAGE_ROUTE]);
        }, 
        err => {
          this.errorMessage = FAILED_REGIST_ERROR_MSG;
          setTimeout(() => { this.errorMessage = "" }, ERROR_DISPLAY_TIMEOUT);
          console.log(err);
        }
      );
  }
}
