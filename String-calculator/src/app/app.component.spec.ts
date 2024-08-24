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

  it('should handle new lines as delimiters', () => {
    expect(component.add('1\n2,3')).toEqual(6);
  });

  it('should throw an error for negative numbers', () => {
    expect(() => component.add('1,-2,3')).toThrowError('Negative numbers not allowed: -2');
  });

  it('should list all negative numbers in the error message', () => {
    expect(() => component.add('1,-2,3,-4')).toThrowError('Negative numbers not allowed: -2, -4');
  });

  it('should support custom delimiters', () => {
    expect(component.add('//;\n1;2')).toEqual(3);
  });
});
