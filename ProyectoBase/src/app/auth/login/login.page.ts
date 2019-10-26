import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrarService } from '../registrar/registrar.service';
import { Usuario } from 'src/app/model/usuario';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from './loginService';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  usuario: Usuario;
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private alertController: AlertController,
              private router: Router) {

              this.loginForm = this.formBuilder.group({
                correo: ['', [Validators.required, Validators.email]],
                contrasena: ['', [Validators.required, Validators.minLength(6)]]
                });
  }

  ngOnInit() {
  }

  login(){
      console.log(this.loginForm.valid);
      this.usuario = new Usuario();
      this.usuario.correo = this.loginForm.controls.correo.value;
      this.usuario.contrasena = this.loginForm.controls.contrasena.value;
      this.loginService.Login(this.usuario).subscribe(
        value => {
          this.loginCorrecto();
        },
        error => {
          this.error(error.error.mensaje)
        }
      );
  }

  async loginCorrecto() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Finixer',
      message: 'Bienvenido a Finixer',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.router.navigateByUrl('/home');
        }
      }]
    });

    await alert.present();
  }

  async error(error: string){
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Error',
      message: error,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.loginForm.controls.correo.setErrors(Validators.email);
        }
      }]
    });

    await alert.present();
  }
}
