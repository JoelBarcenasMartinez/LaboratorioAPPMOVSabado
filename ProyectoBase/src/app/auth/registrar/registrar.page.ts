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
  registrarForm: FormGroup;
  submitted = false;
  usuario: Usuario;
  constructor(private formBuilder: FormBuilder, private registrarService: RegistrarService) {

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
  }
}
