import React, {useState} from 'react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import {Formulario, Campo, InputSubmit, Errores} from '../components/ui/Formulario';
import {css} from '@emotion/core';

import firebase from '../firebase';

//Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL={
  nombre:'',
  email:'',
  password:''
}

const CrearCuenta = () => {

  const [error, guardarError] = useState(false);

  const {valores, errores, handleChange, handleSubmit, handlerBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);
  //extraer valores
  const {nombre, email, password} = valores;

  async function crearCuenta(){//va en el useValidacion que sería el fn
    try {
      await firebase.resgistrar(nombre, email, password);//a estas alturas el formulario debe estar validado por lo que deben venir correctos los valores
      Router.push("/");
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message);
      guardarError(error.message);
    }  
  }

  return(
          <div>
            <Layout>
              <>
                <h1
                  css={css`
                    text-align:center;
                    margin-top:5rem;
                  `}
                >Crear Cuenta</h1>
                <Formulario
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      type="text"
                      id="nombre"
                      placeholder="Tu Nombre"
                      name="nombre"
                      value={nombre}
                      onChange={handleChange}
                      onBlur={handlerBlur}
                    />
                  </Campo>
                  {errores.nombre && <Errores>{errores.nombre}</Errores>}
                  <Campo>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Tu Email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      onBlur={handlerBlur}
                    />
                  </Campo>
                  {errores.email && <Errores>{errores.email}</Errores>}
                  <Campo>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Contraseña"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      onBlur={handlerBlur}
                    />
                  </Campo>
                  {errores.password && <Errores>{errores.password}</Errores>}

                  {error && <Errores>{error}</Errores>}

                  <InputSubmit 
                    type="submit" 
                    value="Crear Cuenta"
                  />
                </Formulario>
              </>
            </Layout>
          </div>
  )
}

export default CrearCuenta
