import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMovimientoPage } from './detalle-movimiento.page';

describe('DetalleMovimientoPage', () => {
  let component: DetalleMovimientoPage;
  let fixture: ComponentFixture<DetalleMovimientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMovimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
