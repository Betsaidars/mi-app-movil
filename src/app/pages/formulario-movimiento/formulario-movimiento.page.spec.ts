import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioMovimientoPage } from './formulario-movimiento.page';

describe('FormularioMovimientoPage', () => {
  let component: FormularioMovimientoPage;
  let fixture: ComponentFixture<FormularioMovimientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioMovimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
