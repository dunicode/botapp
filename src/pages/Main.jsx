import React from 'react'

export default function Main() {
  return (
    <div className="page-container">
      <h2>Bienvenido a la página de inicio</h2>
      <p>Esta es una SPA construida con React y Vite.</p>
      <div className="feature-list">
          <div className="feature">
              <h3>Rápido</h3>
              <p>Gracias a Vite, el desarrollo es extremadamente rápido.</p>
          </div>
          <div className="feature">
              <h3>Moderno</h3>
              <p>Utiliza las últimas tecnologías del ecosistema React.</p>
          </div>
      </div>
    </div>
  )
}
