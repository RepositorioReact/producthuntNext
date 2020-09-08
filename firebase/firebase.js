import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length){//si no hay ninguna aplicación aun creada, entonces creala, pero si ya está creada, no la crees
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    //Registra un usuario //esta funcion viene de crear-cuenta.js crearCuenta()
    async resgistrar(nombre, email, password){ 
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);

        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
    }

    //Inicia sesión del usuario
    async login(email, password){
        await this.auth.signInWithEmailAndPassword(email, password);
    }

    //Cierra la sesión
    async cerrarSesion(){
        await this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;