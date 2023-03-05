import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbmService } from 'src/app/alumno/services/abm.service';
import { CursosService } from 'src/app/curso/services/cursos.service';
import { Curso } from 'src/app/shared/models/curso';

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.css']
})
export class AgregarAlumnoComponent implements OnInit {
  form: FormGroup;
  curso$!: Observable<Curso[]>;

  constructor(
    private fb: FormBuilder,
    private abmService: AbmService,
    private curso: CursosService,
    private router: Router,
    private snackBar: MatSnackBar) {
      
    let regexCorreo: string = '^[^@]+@[^@]+\.[a-zA-Z]{2,}$';
    this.curso$ = this.curso.obtenerCursosObservable();
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      curso: new FormControl('{}', Validators.required),
      comision: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(regexCorreo)])
    })

    
  }

  ngOnInit(): void {
  }

  createAlumno() {
    if(this.form.valid){
      this.abmService.createAlumno(this.form.value).subscribe({
        next:(res) =>{
          this.router.navigate(['/alumnos/lista']);
          this.snackBar.open('  Alumno creado correctamente', '', {
            duration: 1500,
            horizontalPosition: 'left',
            verticalPosition: 'bottom'
          });
        }
      })
    }
  
  }

}
