import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {AgregarCuentaPage} from './agregar-cuenta/agregar-cuenta.page';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  public cuentas;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.cuentas = [
      {Cantidad: 1555.00, Nombre: 'Crédito Banorte'},
      {Cantidad: 1.50, Nombre: 'Débito Banregio'},
      {Cantidad: -1555.00, Nombre: 'Crédito BBVA'},
      {Cantidad: 500.00, Nombre: 'Débito Banamex'},
    ];
  }

  async onAgregarCuenta(){
    const modal = await this.modalController.create({
      component: AgregarCuentaPage,
      componentProps: {
        titulo: 'Agregar Cuenta'
      }
    });
    return await modal.present();
  }

}
