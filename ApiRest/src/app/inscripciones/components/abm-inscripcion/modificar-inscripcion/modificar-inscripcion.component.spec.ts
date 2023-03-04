import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInscripcionComponent } from './modificar-inscripcion.component';

describe('ModificarInscripcionComponent', () => {
  let component: ModificarInscripcionComponent;
  let fixture: ComponentFixture<ModificarInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarInscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
