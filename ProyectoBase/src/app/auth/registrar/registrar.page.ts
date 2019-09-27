import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrarService } from './registrar.service';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss']
})
export class RegistrarPage implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  usuario: Usuario;
  constructor(private formBuilder: FormBuilder, private registrarService: RegistrarService) {
              const scope = this;
              this.registerForm = this.formBuilder.group({
                nombre: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmarPassword: ['', Validators.required],
                validator: scope.MustMatch('password', 'confirmarPassword' )
                });
 }

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  registrar() {
    this.usuario = new Usuario();
    this.usuario.nombre = this.registerForm.controls.nombre.value;
    this.usuario.correo = this.registerForm.controls.email.value;
    this.usuario.contrasena = this.registerForm.controls.password.value;
    this.usuario.confirmacionContrasena = this.registerForm.controls.confirmarPassword.value;
    this.registrarService.save(this.usuario).subscribe(
      value => {
        console.log(value);
      },
      error => {
        console.log(error);
      }
    );
  }
      MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // return if another validator has already found an error on the matchingControl
              return;
          }
          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
      };
    }
}
