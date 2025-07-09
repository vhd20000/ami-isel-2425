import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthService } from '../../services/fireauth.service';
import { Router } from '@angular/router';

const GOOGLE_LOGO_IMAGE: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png";
const APP_MAIN_PAGE_ROUTE: string = "/tabs";
const REGIST_PAGE_ROUTE: string = "/register";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  public googleLogoImage: string = GOOGLE_LOGO_IMAGE;
  public validations_form: FormGroup = {} as FormGroup;
  public errorMessage: string = "";
  public validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    private fireauthService: FireauthService,
    private formBuilder: FormBuilder,
    private router: Router
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
      )
    });
  }

  tryLogin(value: any) {
    this.fireauthService.doLogin(value)
      .then(
        res => {
          this.router.navigate([APP_MAIN_PAGE_ROUTE]);
        }, 
        err => {
          this.errorMessage = err.message;
          console.log(err);
        }
      );
  }

  goRegisterPage() {
    this.router.navigate([REGIST_PAGE_ROUTE]);
  }
}