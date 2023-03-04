import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let controles: any = {
      usuario: new FormControl('',Validators.required),
      contraseña: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      esAdmin: new FormControl()
    };

    this.formularioLogin = new FormGroup(controles);
  }

  login(){
    let usuario: Usuario = {
      usuario: this.formularioLogin.value.usuario,
      contraseña: this.formularioLogin.value.contraseña,
      esAdmin: this.formularioLogin.value.esAdmin
    }
    this.loginService.login(usuario);
    this.router.navigate(['/alumnos/lista']);
   }

}
