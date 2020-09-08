import React, {useState, useContext} from 'react';
import Router, {useRouter} from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import {Formulario, Campo, InputSubmit, Errores} from '../components/ui/Formulario';
import {css} from '@emotion/core';
import Error404 from '../components/layout/404';
import {FirebaseContext} from '../firebase';

//Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INICIAL={
  nombre:'',
  empresa:'',
  //imagen:'',
  url:'',
  descripcion:''
}

const NuevoProducto = () =>{

  //state de las imagenes
  const [nombreimagen, guardarNombre] = useState('');
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState('');

  const [error, guardarError] = useState(false);

  const {valores, errores, handleChange, handleSubmit, handlerBlur} = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);
  //extraer valores
  const {nombre, empresa, imagen, url, descripcion} = valores;

  //Hook de routing para redireccionar
  const router = useRouter();

  //Context con las operaciones crud de firebase
  const {usuario, firebase} = useContext(FirebaseContext);

  async function crearProducto(){//va en el useValidacion que sería el fn

     //Si el usuario no está autenticado, llevar al login
    if(!usuario){
      return router.push("/login");
    }

    //Crear el objeto de nuevo producto (incluido los votos, comentarios...)
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios:[],
      creado:Date.now(),
      creador:{
        id:usuario.uid,
        nombre:usuario.displayName
      },
      haVotado:[]
    }

    //Insertar el producto en la base de datos de firebase. db viene de la clase firebase.js
    firebase.db.collection('productos').add(producto);
    
    return router.push('/');
  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
}

const handleProgress = progreso => guardarProgreso({ progreso });

const handleUploadError = error => {
    guardarSubiendo(error);
    console.error(error);
};

const handleUploadSuccess = nombre => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre);
    firebase
        .storage
        .ref("productos")
        .child(nombre)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          guardarUrlImagen(url);
        } );
};

  return(
          <div>
            <Layout>
              {!usuario ? <Error404 /> : (
                <>
                  <h1
                    css={css`
                      text-align:center;
                      margin-top:5rem;
                    `}
                  >Nuevo Producto</h1>
                  <Formulario
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <fieldset>
                      <legend>Información General</legend>
                    
                        <Campo>
                          <label htmlFor="nombre">Nombre</label>
                          <input
                            type="text"
                            id="nombre"
                            placeholder="Nombre del producto"
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handlerBlur}
                          />
                        </Campo>
                        {errores.nombre && <Errores>{errores.nombre}</Errores>}

                        <Campo>
                          <label htmlFor="empresa">Empresa</label>
                          <input
                            type="text"
                            id="empresa"
                            placeholder="Nombre Empresa o Compoñía"
                            name="empresa"
                            value={empresa}
                            onChange={handleChange}
                            onBlur={handlerBlur}
                          />
                        </Campo>
                        {errores.empresa && <Errores>{errores.empresa}</Errores>}

                        <Campo>
                          <label htmlFor="imagen">Imagen</label>
                          <FileUploader
                            accep="image/*"
                            id="imagen"
                            name="imagen"
                            randomizeFilename
                            storageRef={firebase.storage.ref("productos")}
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}
                          />
                        </Campo>

                        <Campo>
                          <label htmlFor="url">URL</label>
                          <input
                            type="url"
                            id="url"
                            name="url"
                            placeholder="URL de tu producto"
                            value={url}
                            onChange={handleChange}
                            onBlur={handlerBlur}
                          />
                        </Campo>
                        {errores.url && <Errores>{errores.url}</Errores>}
                    </fieldset>

                    <fieldset>
                      <legend>Sobre tu producto</legend>

                        <Campo>
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea
                              id="descripcion"
                              name="descripcion"
                              value={descripcion}
                              onChange={handleChange}
                              onBlur={handlerBlur}
                            />
                          </Campo>
                          {errores.descripcion && <Errores>{errores.descripcion}</Errores>}
                    </fieldset>

                    {error && <Errores>{error}</Errores>}

                    <InputSubmit 
                      type="submit" 
                      value="Crear Producto"
                    />
                  </Formulario>
              </>
              )}
            </Layout>
          </div>
  )
}

export default NuevoProducto
