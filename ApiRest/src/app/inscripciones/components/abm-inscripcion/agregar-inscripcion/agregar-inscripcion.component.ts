import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { AbmService } from 'src/app/inscripciones/service/abm.service';
import { Inscripcion } from 'src/app/shared/models/inscripcion';
import { Profesor } from 'src/app/shared/models/profesor';

@Component({
  selector: 'app-agregar-inscripcion',
  templateUrl: './agregar-inscripcion.component.html',
  styleUrls: ['./agregar-inscripcion.component.css']
})
export class AgregarInscripcionComponent implements OnInit {

  form: FormGroup;
  curso: any[] = ['Angular', 'Javascript', 'Python', 'Diseño UX', 'SQL'];
  profesor$!: Observable<Profesor[]>;


  constructor(
    private fb: FormBuilder,
    private abmService: AbmService,
    private router: Router,
    private profesor: ProfesorService,
    private snackBar: MatSnackBar) {

    this.profesor$ = this.profesor.obtenerProfesores();
    this.form = this.fb.group({
      curso: new FormControl('', Validators.required),
      comision: new FormControl('', Validators.required),
      alumnoNombre: new FormControl('', Validators.required),
      alumnoApellido: new FormControl('', Validators.required),
      profesor: new FormControl('{}', Validators.required,)
    })


  }

  ngOnInit(): void {
  }

  createInscripcion() {
    if (this.form.valid) {
      this.abmService.createInscripcion(this.form.value).subscribe({
        next: (res) => {
          this.router.navigate(['/inscripciones/lista']);
          this.snackBar.open('  Inscripcion creada correctamente', '', {
            duration: 1500,
            horizontalPosition: 'left',
            verticalPosition: 'bottom'
          });
        }
      })
    }

  }
}
