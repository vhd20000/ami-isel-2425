import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecepyBookPage } from './recepy-book.page';

describe('RecepyBookPage', () => {
  let component: RecepyBookPage;
  let fixture: ComponentFixture<RecepyBookPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepyBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
