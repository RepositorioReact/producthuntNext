export default function validarCrearProducto(valores){
    let errores = {};

    //Validar el nombre del producto
    if(!valores.nombre){
        errores.nombre = "El Nombre del Producto es obligatorio";
    }

    //Validar el nombre de la empresa
    if(!valores.empresa){
        errores.empresa = "El Nombre de la Empresa es obligatorio";
    }

    //Validar url
    if(!valores.url){
        errores.url = "La URL del producto es obligatoria";
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "URL no válida o mal formateada";
    }

    //Validar la descripción
     if(!valores.descripcion){
        errores.descripcion = "La Descripción es obligatoria";
    }

    return errores;
}