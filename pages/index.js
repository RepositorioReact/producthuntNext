import React from 'react';
import Layout from '../components/layout/Layout';
import DetallesProducto from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';


const Home = () => {

  const {productos} = useProductos('creado');//toma el orden que se va a tener a la hora de mostrar producos, en creado viene la fecha que tiene un producto en la bd

  return(
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {productos.map(producto => (
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
  );
}

export default Home;