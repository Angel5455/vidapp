import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGuiasComponent } from './list-guias.component';

describe('ListGuiasComponent', () => {
  let component: ListGuiasComponent;
  let fixture: ComponentFixture<ListGuiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGuiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGuiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
