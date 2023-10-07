import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRenderComponent } from './crud-render.component';

describe('CrudRenderComponent', () => {
  let component: CrudRenderComponent;
  let fixture: ComponentFixture<CrudRenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudRenderComponent]
    });
    fixture = TestBed.createComponent(CrudRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
