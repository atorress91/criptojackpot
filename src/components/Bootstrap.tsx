'use client';
import React, { useEffect } from 'react';

const Bootstrap = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Cargar Bootstrap dinámicamente solo en cliente
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then(() => {
        // Bootstrap cargado
      })
      .catch(err => {
        console.error('Error loading Bootstrap:', err);
      });
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Bootstrap;
