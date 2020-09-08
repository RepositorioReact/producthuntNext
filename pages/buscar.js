import React, {useEffect, useState} from 'react';
import Layout from '../components/layout/Layout';
import {useRouter} from 'next/router';
import DetallesProducto from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';


const Buscar = () => {

  //así se obtiene Buscar.js (ui)
  const router = useRouter();
  const {query: {q}} = router;

  //Todos los productos
  const {productos} = useProductos('creado');
  const [resultado, guardarResultado] = useState([]);
  
  useEffect(() => {
    const busqueda = q.toLowerCase(); //para que lo que se busque sea siempre en minúsculas, ya que en js no es lo mismo HOLA que hola
    const filtro = productos.filter(producto => {
      return(
        producto.nombre.toLowerCase().includes(busqueda) || 
        producto.descripcion.toLowerCase().includes(busqueda)//pasamos a minúsculas el nombre del producto
      )
    });
    guardarResultado(filtro);
  }, [q, productos]);

  return(
      <div>
        <Layout>
          <div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white">
                {resultado.map(producto => (
                  <DetallesProducto 
                    key={producto.id}
                    producto={producto}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Layout>
      </div>
  )
}

export default Buscar
