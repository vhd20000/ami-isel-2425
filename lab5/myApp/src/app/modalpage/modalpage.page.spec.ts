import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalpagePage } from './modalpage.page';

describe('ModalpagePage', () => {
  let component: ModalpagePage;
  let fixture: ComponentFixture<ModalpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
