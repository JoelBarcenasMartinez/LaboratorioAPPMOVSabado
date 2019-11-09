import { Usuario } from './usuario';

export class Cuenta {
    public static endPoint = '/cuenta';
    public cantidad: number;
    public nombre: string;
    public usuario: Usuario;
}
