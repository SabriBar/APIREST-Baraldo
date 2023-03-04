import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { AbmService } from 'src/app/curso/services/abm.service';
import { Curso } from 'src/app/shared/models/curso';
import { Profesor } from 'src/app/shared/models/profesor';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.css']
})
export class AgregarCursoComponent implements OnInit {
  form!: FormGroup;
  inscripcion: any[] = ['Abierta', 'Cerrada'];
  profesor$!: Observable<Profesor[]>;

  constructor(
    private fb: FormBuilder,
    private abmService: AbmService,
    private router: Router,
    private snackBar: MatSnackBar,
    private profesor: ProfesorService
  ) {

    this.profesor$ = this.profesor.obtenerProfesores();
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      comision: new FormControl('', Validators.required),
      profesor: new FormControl('{}', Validators.required),
      inscripcionAbierta: new FormControl('', Validators.required),
    });

   }

  ngOnInit(): void {

  }

  createCurso() {
    if(this.form.valid){
      this.abmService.createCurso(this.form.value).subscribe({
        next:(res) =>{
          this.router.navigate(['/cursos/lista']);
          this.snackBar.open('  Curso creado correctamente', '', {
            duration: 1500,
            horizontalPosition: 'left',
            verticalPosition: 'bottom'
          });
        }
      })
    }
    
  }
}

