import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecepyFormPage } from './recepy-form.page';

describe('RecepyFormPage', () => {
  let component: RecepyFormPage;
  let fixture: ComponentFixture<RecepyFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepyFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
