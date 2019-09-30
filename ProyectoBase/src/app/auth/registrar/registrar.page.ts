import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrarService } from './registrar.service';
import { Usuario } from 'src/app/model/usuario';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss']
})
export class RegistrarPage implements OnInit {
  registrarForm: FormGroup;
  submitted = false;
  usuario: Usuario;
  constructor(private formBuilder: FormBuilder,
              private registrarService: RegistrarService,
              private alertController: AlertController,
              private router: Router) {

              this.registrarForm = this.formBuilder.group({
                nombre: ['', Validators.required],
                correo: ['', [Validators.required, Validators.email]],
                contrasena: ['', [Validators.required, Validators.minLength(6)]],
                confirmacionContrasena: ['', Validators.required]
                });
 }

  ngOnInit() {}

  get f() { return this.registrarForm.controls; }

  registrar() {
    console.log(this.registrarForm.valid);
    this.usuario = new Usuario();
    this.usuario.nombre = this.registrarForm.controls.nombre.value;
    this.usuario.correo = this.registrarForm.controls.correo.value;
    this.usuario.contrasena = this.registrarForm.controls.contrasena.value;
    this.usuario.confirmacionContrasena = this.registrarForm.controls.confirmacionContrasena.value;
    this.registrarService.save(this.usuario).subscribe(
      value => {
        this.cuentaCreada();
      },
      error => {
        this.error(error.error.mensaje)
      }
    );
  }

  async cuentaCreada() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Bienveid@',
      message: 'Cuenta registrada con exito',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.router.navigateByUrl('/login');
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
          this.registrarForm.controls.correo.setErrors(Validators.email);
        }
      }]
    });

    await alert.present();
  }
}
