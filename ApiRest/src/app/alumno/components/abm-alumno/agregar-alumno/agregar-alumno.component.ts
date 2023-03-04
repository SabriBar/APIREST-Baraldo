import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AbmService } from 'src/app/alumno/services/abm.service';
import { Alumno } from 'src/app/shared/models/alumno';

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.css']
})
export class AgregarAlumnoComponent implements OnInit {
  form: FormGroup;
  curso: any[] = ['Angular','Javascript','Python','Diseño UX','SQL'];


  constructor(
    private fb: FormBuilder,
    private abmService: AbmService,
    private router: Router,
    private snackBar: MatSnackBar) {
      
    let regexCorreo: string = '^[^@]+@[^@]+\.[a-zA-Z]{2,}$';

    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      curso: new FormControl('', Validators.required),
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
