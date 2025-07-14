import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { RecepyImage } from 'src/app/models/recepy';
import { FireService } from 'src/app/services/fire.service';
import { UtilityService } from 'src/app/services/utility.service';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { RecepyBookPage } from '../recepy-book/recepy-book.page';

const NO_INPUT_CATEGORY_ERROR_MSG: string = "Por favor insira uma categoria.";
const ADD_CATEGORY_ERROR_MSG: string = "Esta categoria já existe. Por favor, tente outra.";
const REQUIRED_FIELD_MSG: string = "Campo obrigatório";
const ADD_CATEGORY_ERROR_TOAST_DURATION: number = 3000;
const MIN_PREP_TIME_VALUE: number = 1;
const UPLOAD_RECEPY_LOADING_MSG = "A registar receita ...";
const UPLOAD_RECEPY_SUCCESS_MSG = "Receita criada com sucesso !";
const UPLOAD_RECEPY_FAIL_MSG = "Ocorreu um erro ao criar a receita.";
const RECEPY_BOOK_PAGE_ROUTE = "/tabs/recepy-book"

@Component({
  selector: 'app-recepy-form',
  templateUrl: './recepy-form.page.html',
  styleUrls: ['./recepy-form.page.scss'],
  standalone: false
})
export class RecepyFormPage implements OnInit {

  @ViewChild('categoryToAdd') categoryToAdd!: ElementRef;

  public categories: string[] = [];
  public ingrdients: string[] = [];
  public steps: string[] = [];

  public image?: RecepyImage;

  public recepyForm: FormGroup = {} as FormGroup;

  public validationMessages = {
    'name': [
      { type: 'required', message: REQUIRED_FIELD_MSG }
    ],
    'prepTimeMins': [
      { type: 'required', message: REQUIRED_FIELD_MSG },
      { type: 'min', message: MIN_PREP_TIME_VALUE }
    ],
    'servings': [
      { type: 'required', message: REQUIRED_FIELD_MSG },
      { type: 'min', message: MIN_PREP_TIME_VALUE }
    ],
  };

  constructor(
    private fireService: FireService,
    private formBuilder: FormBuilder,
    public util: UtilityService,
  ) { }

  ngOnInit() {
    this.recepyForm = this.formBuilder.group({
      name: new FormControl(
        '', 
        Validators.compose([
          Validators.required
        ])
      ),
      prepTimeMins: new FormControl<number | null>(
        null, 
        Validators.compose([
          Validators.min(MIN_PREP_TIME_VALUE), 
          Validators.required
        ])
      ),
      servings: new FormControl<number | null>(
        null, 
        Validators.compose([
          Validators.min(MIN_PREP_TIME_VALUE), 
          Validators.required
        ])
      ),
      calories: new FormControl<number | null>(
        null, 
        Validators.compose([
          Validators.min(MIN_PREP_TIME_VALUE) 
        ])
      ),
      categories: new FormControl([]),
      ingredients: new FormControl([]),
      steps: new FormControl([]),
      imageURL: new FormControl('')
    });
  }

  /**
   * PULBIC METHODS
   */
  public async tryAddRecepy(recepyForm: any) {
    // Prepare data in form
    recepyForm.name = this.util.sanitizeString(recepyForm.name);
    recepyForm.categories = this.categories;
    recepyForm.ingredients = this.ingrdients;
    recepyForm.steps = this.steps;

    // Try upload image to firebase / wait for it to finish
    if (this.image) {
      const blob = this.image.blob;
      const imageUid = await this.fireService.uploadImage(blob);
      const url = await this.fireService.getImageURL(imageUid);
      recepyForm.imageURL = url;
    }
    
    // Try upload form data to firestore
    let returnToRecepyBookPage: boolean = false;
    const loading = this.util.createLoading();
    loading.present(UPLOAD_RECEPY_LOADING_MSG);
    await this.fireService.createRecepy(recepyForm)
      .then(res => {
        this.util.openToast(UPLOAD_RECEPY_SUCCESS_MSG);
        returnToRecepyBookPage = true;
      })
      .catch(err => {
        this.util.openToast(UPLOAD_RECEPY_FAIL_MSG);
      })
      .finally(() => {
        loading.dismiss();
      });

      // redirect on success
      if (returnToRecepyBookPage) {
        RecepyBookPage.firstLoad = true;
        this.util.redirectTo(RECEPY_BOOK_PAGE_ROUTE);
      }
    }

  public addCategory() {
    const newCategory: string = this.util.sanitizeString(this.categoryToAdd.nativeElement.value);
    
    if (newCategory === '') {
      this.util.openToast(NO_INPUT_CATEGORY_ERROR_MSG, { duration: ADD_CATEGORY_ERROR_TOAST_DURATION });
      return;
    }

    if (this.categories.includes(newCategory)){
      this.util.openToast(ADD_CATEGORY_ERROR_MSG, { duration: ADD_CATEGORY_ERROR_TOAST_DURATION });
      return;
    }

    this.categories.push(newCategory);
  }

  public clearCategories() {
    this.categories = [];
  }

  public addRecepyImage() {
    this.util.takePicture()
      .then(res => {
        if (!res) {
          this.image = undefined;
          return;
        }
        this.image = res as RecepyImage;
      })
      .catch(err => this.util.openToast(err.toString()));
  }

}
