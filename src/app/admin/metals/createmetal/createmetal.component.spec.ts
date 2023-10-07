import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemetalComponent } from './createmetal.component';

describe('CreatemetalComponent', () => {
  let component: CreatemetalComponent;
  let fixture: ComponentFixture<CreatemetalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatemetalComponent]
    });
    fixture = TestBed.createComponent(CreatemetalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
