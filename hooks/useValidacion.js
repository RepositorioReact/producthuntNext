import React, {useState, useEffect} from 'react';

const useValidacion = (stateInicial, validar, fn) => {

    //Valores que el usuario coloque en los diferentes inputs
    const [valores, guardarValores] = useState(stateInicial);
    //Para los errores. Recorremos cada uno de los campos, y en caso de error lo guardamos en el objeto de errores con su funcion guardarErrores
    const [errores, guardarErrores] = useState({});
    //cuando el usuario le da a enviar al form cambia a true y cambia el useEffect que ejecuta el código
    const [submitForm, guardarSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm){
            //Errores es un objeto y hay que comprobar si hay errores, si la longitud es 0, los errores entán vacíos.
            const noErrores = Object.keys(errores).length === 0;

            if(noErrores){
                fn(); // fn=funcion que se ejecuta en el componente al que se le añade este useValidacion.Esta funcion Puede ser crear producto, iniciar sesion o crear una cuenta
            }
            guardarSubmitForm(true);//Regresa true para que no se siga ejecutando todo el tiempo
        }
    },[errores]);

    //Funcion que se ejecuta conforme el usuario escribe algo (maneja el cambio)
    const handleChange = e => {
        guardarValores({
            ...valores, //va haciendo copia de los valores
            [e.target.name]:e.target.value//asigna al name de los inputs el valor que viene de valores
        })
    }

    //Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    }

    //cuando se realiza el evento de blur, es decir cuando el usuario está escribiendo y se sale del input
    const handlerBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleChange,
        handleSubmit,
        handlerBlur
    };
}
 
export default useValidacion;