import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesGuiasComponent } from './detalles-guias.component';

describe('DetallesGuiasComponent', () => {
  let component: DetallesGuiasComponent;
  let fixture: ComponentFixture<DetallesGuiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesGuiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesGuiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
