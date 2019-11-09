import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrarService } from '../registrar/registrar.service';
import { Usuario } from 'src/app/model/usuario';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from './loginService';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

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
              private router: Router,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {

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
        data => {
          this.storage.set('correo', this.usuario.correo);
          console.log(this.storage.get('correo'));
          this.loginCorrecto();
        },
        error => {
          this.error(error.error.mensaje)
        }
      );
  }

  async loginCorrecto() {
    const alert = await this.alertController.create({
      header: 'Finixer',
      subHeader: '',
      message: 'Bienvenido a Finixer',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.router.navigateByUrl('/tabs/cuenta');
        }
      }]
    });

    await alert.present();
  }

  async error(error: string){
    const alert = await this.alertController.create({
      header: 'Finixer',
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
