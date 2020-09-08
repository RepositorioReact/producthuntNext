import React, {useState, useEffect} from 'react';
import firebase from '../firebase';

function useAutenticacion(){
    const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);//Cuando cargue no va a ver ningún usuario autenticado y por eso es null

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(user => {
            if(user){
                guardarUsuarioAutenticado(user);
            } else{
                guardarUsuarioAutenticado(null);
            }
        });

        return () => unsuscribe();
        
    }, [])//No hay denpendencias en el [] porque solo se ejecuta una vez

    return usuarioAutenticado;
}

export default useAutenticacion;