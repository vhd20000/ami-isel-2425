import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthService } from '../../services/fireauth.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { EMAIL_VALIDATION_PATTERN, ERROR_DISPLAY_TIMEOUT, FAILED_LOGIN_ERROR_MSG, INVALID_EMAIL_MSG, INVALID_PASSWORD_MSG, PASSWORD_MIN_LENGTH, REQUIRED_EMAIL_MSG, REQUIRED_PASSWORD_MSG } from '../auth.constants';
import { Platform } from '@ionic/angular';

const APP_MAIN_PAGE_ROUTE: string = "/tabs";
const REGIST_PAGE_ROUTE: string = "/register";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  public showPassword: boolean = false;
  public showEyeBtn: boolean = false;
  public validations_form: FormGroup = {} as FormGroup;
  public errorMessage: string = "";
  public validation_messages = {
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
    private fireauthService: FireauthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public util: UtilityService
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
      )
    });
  }

  /**
   * PUBLIC METHODS
   */

  public tryLoginWithEmailAndPassword(value: any) {
    this.fireauthService.doLoginWithEmailAndPassword(value)
      .then(
        res => {
          console.log("res [doLoginWithEmailAndPassword]: ", res);
          this.router.navigate([APP_MAIN_PAGE_ROUTE]);
        }, 
        err => {
          this.errorMessage = FAILED_LOGIN_ERROR_MSG;
          setTimeout(() => { this.errorMessage = "" }, ERROR_DISPLAY_TIMEOUT);
          console.log(err);
        }
      );
  }

  public tryLoginWithGoogle(value: any) {
    this.util.openToast("deactivated functionality");
    // this.fireauthService.doLoginWithGoogle(value)
    //   .then(
    //     res => {
    //       // let uid = res.user.uid;
    //       // this.util.storeUidInCache(uid);
    //       // FireService.setCurrentUserId(uid);
    //       this.router.navigate([APP_MAIN_PAGE_ROUTE]);
    //     }, 
    //     err => {
    //       this.errorMessage = FAILED_LOGIN_ERROR_MSG;
    //       setTimeout(() => { this.errorMessage = "" }, ERROR_DISPLAY_TIMEOUT);
    //       console.log(err);
    //     }
    //   );
  }

  public goRegisterPage() {
    this.router.navigate([REGIST_PAGE_ROUTE]);
  }

  public togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}