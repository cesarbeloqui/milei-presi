import { useEffect, useState } from "react";
import "./App.css";
import imageg from "./assets/milei web g-01.png";
import Navbar from "./components/Navbar/Navbar";
import ContadorDeVotos from "./components/ContadorDeVotos/ContadorDeVotos";

function App() {
  const [dias, setDias] = useState(0);
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  // Fecha y hora de destino para la cuenta regresiva (en milisegundos)
  const fechaDestino = new Date("2023-10-22T18:00:00").getTime();
  // Actualizar la cuenta regresiva con animación cada segundo
  useEffect(() => {
    setInterval(function () {
      const fechaActual = new Date().getTime();
      const diferencia = fechaDestino - fechaActual;

      if (diferencia <= 0) {
        // La cuenta regresiva ha terminado
        setDias(0);
        setHoras(0);
        setMinutos(0);
        setSegundos(0);
      } else {
        setDias(Math.floor(diferencia / (1000 * 60 * 60 * 24)));
        setHoras(
          Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );
        setMinutos(Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)));
        setSegundos(Math.floor((diferencia % (1000 * 60)) / 1000));
      }
    }, 1000);
  }, [dias, fechaDestino, horas, minutos, segundos]);

  return (
    <div className="container" id="inicio">
      <Navbar />
      <div className="main-content">
        <section id="cuentaRegresiva">
          <div className="countdown-container">
            <h1>Cuenta Regresiva</h1>
            <img src={imageg} width="200" height="200" alt="" />
            <div className="countdown">
              <div className="countdown-item">
                <span className="countdown-number animated-bounce" id="dias">
                  {dias.toString().padStart(2, "0")}
                </span>
                <br />
                <span className="countdown-label">Días</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number animated-bounce" id="horas">
                  {horas.toString().padStart(2, "0")}
                </span>
                <br />
                <span className="countdown-label">Horas</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number animated-bounce" id="minutos">
                  {minutos.toString().padStart(2, "0")}
                </span>
                <br />
                <span className="countdown-label">Minutos</span>
              </div>
              <div className="countdown-item">
                <span
                  className="countdown-number animated-bounce"
                  id="segundos"
                >
                  {segundos.toString().padStart(2, "0")}
                </span>
                <br />
                <span className="countdown-label">Segundos</span>
              </div>
            </div>
          </div>
        </section>
        <section id="votar">
          <ContadorDeVotos />
        </section>
      </div>
      <div className="footer">
        <p>Derechos de autor © 2023</p>
      </div>
    </div>
  );
}

export default App;
