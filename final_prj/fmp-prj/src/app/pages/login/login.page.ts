import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthService } from '../../services/fireauth.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';

const GOOGLE_LOGO_IMAGE: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png";
const APP_MAIN_PAGE_ROUTE: string = "/tabs";
const REGIST_PAGE_ROUTE: string = "/register";
const ERROR_DISPLAY_TIMEOUT: number = 3000;

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
      )
    });
  }

  tryLoginWithEmailAndPassword(value: any) {
    this.tryLogin(value, this.fireauthService.doLogin);
  }

  tryLoginWithGoogle(value: any) {
    this.tryLogin(value, this.fireauthService.doLoginWithGoogle);
  }

  tryLogin(value: any, loginFunc: (e: any) => Promise<any>) {
    loginFunc(value)
      .then(
        res => {
          this.router.navigate([APP_MAIN_PAGE_ROUTE]);
          this.util.storeUidInCache(res.user.uid)
        }, 
        err => {
          this.errorMessage = err.message;
          setTimeout(() => { this.errorMessage = "" }, ERROR_DISPLAY_TIMEOUT);
          console.log(err);
        }
      );
  }

  goRegisterPage() {
    this.router.navigate([REGIST_PAGE_ROUTE]);
  }
}