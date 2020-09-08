import React, {useState} from 'react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import {Formulario, Campo, InputSubmit, Errores} from '../components/ui/Formulario';
import {css} from '@emotion/core';

import firebase from '../firebase';

//Validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INICIAL={
  email:'',
  password:''
}

const Login = () =>  {

  const [error, guardarError] = useState(false);

  const {valores, errores, handleChange, handleSubmit, handlerBlur} = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);
  //extraer valores
  const {email, password} = valores;

  async function iniciarSesion(){
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      console.error('Hubo un error al iniciar sesión', error.message);
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
                >Iniciar Sesión</h1>
                <Formulario
                  onSubmit={handleSubmit}
                  noValidate
                >
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
                    value="Iniciar Sesión"
                  />
                </Formulario>
              </>
            </Layout>
          </div>
  )
}

export default Login;
