import { Component, OnInit, Inject } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cuenta } from 'src/app/model/cuenta';
import { CuentaService } from '../cuenta.service';
import { Router } from '@angular/router';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-agregar-cuenta',
  templateUrl: './agregar-cuenta.page.html',
  styleUrls: ['./agregar-cuenta.page.scss'],
})
export class AgregarCuentaPage implements OnInit {

  titulo: string;
  registrarForm: FormGroup;
  cuenta: Cuenta;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private cuentaService: CuentaService,
    private router: Router,
    private alertController: AlertController,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.registrarForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      cantidad: ['', [Validators.required]]
      });
  }



  ngOnInit() {
    console.log(this.titulo);
  }

  get f() { return this.registrarForm.controls; }

  async cerrarModal() {
    await this.modalController.dismiss();
  }


  registrar() {
    this.cuenta = new Cuenta();
    this.cuenta.nombre = this.registrarForm.controls.nombre.value;
    this.cuenta.cantidad = this.registrarForm.controls.cantidad.value;
    this.cuenta.usuario = new Usuario();
    this.cuenta.usuario.correo= this.storage.get('correo');
    this.cuentaService.save(this.cuenta).subscribe(
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
      header: 'Finixer',
      subHeader: '',
      message: 'Cuenta registrada con exito',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.cerrarModal();
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
          this.registrarForm.controls.nombre.setErrors(Validators.required);
          this.registrarForm.controls.cantidad.setErrors(Validators.required);
        }
      }]
    });

    await alert.present();
  }

}
