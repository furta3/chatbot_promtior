import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [historial, setHistorial] = useState([])
  const [cargando, setCargando] = useState(false)
  // Función que maneja el evento de enviar el formulario
  const handleSubmit = async (event) => {
    if (cargando)
      return
    event.preventDefault();
    console.log("hola mundo");
    console.log("Input value:", inputValue);

    const nuevoMensaje = {
      origen: "usuario", // Aquí lo puedes cambiar según el origen, por ejemplo, a "chatbot"
      mensaje: inputValue,
      tiempo: new Date()
    };
    setHistorial((prevHistorial) => [...prevHistorial, nuevoMensaje]);
    try {
      setCargando(true)
      await fetch(`api/responder?mensaje=${inputValue}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const nuevoMensaje = {
            origen: "bot", // Aquí lo puedes cambiar según el origen, por ejemplo, a "chatbot"
            mensaje: data.respuesta,
            tiempo: new Date()
          };
          setHistorial((prevHistorial) => [...prevHistorial, nuevoMensaje]);
        });
    } catch (error) {
      console.log(error);
    }
    finally {
      setCargando(false)
    }

    setInputValue(""); // Limpiar el input después de enviar
  };

  return (
    <>
      <div className="container py-4 px-3 mx-auto">
        <h1>Chat Bot Promtior - Juan Furtado</h1>
        <div className="mt-4">
          {historial.map((msg, index) => (
            <div key={index} className={`alert ${msg.origen === "bot" ? "alert-primary" : "alert-secondary"}`}>
              <strong>{msg.origen}:</strong> {msg.mensaje} <span className="text-muted">({msg.tiempo.toLocaleTimeString()})</span>
            </div>
          ))}
        </div>
        <footer className="footer-fijo bg text-white text-center p-4">
          <form onSubmit={handleSubmit} className="formulario-alto">
            <div className="input-group ">
              <input
                id='mensaje'
                type="text"
                className="form-control"
                placeholder="Escribe algo..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button className="btn btn-primary boton-ancho" type="submit">
                {!cargando ? "Enviar" :
                  <div class="spinner-grow spinner-pequeno" role="status">
                    <span class="sr-only"></span>
                  </div>}
              </button>
            </div>
          </form>
        </footer>
      </div>
    </>
  )
}

export default App
