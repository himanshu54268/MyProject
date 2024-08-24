import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should return 0 for an empty string', () => {
    expect(component.add('')).toEqual(0);
  });

  it('should return the sum of comma-separated numbers', () => {
    expect(component.add('1,2,3')).toEqual(6);
  });
});
