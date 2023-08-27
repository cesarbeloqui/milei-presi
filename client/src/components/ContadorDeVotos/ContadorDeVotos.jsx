import { useState, useRef, useEffect } from "react";
import "./ContadorDeVotos.css"; // Asegúrate de importar tus estilos
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import ReCAPTCHA from "react-google-recaptcha";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

function ContadorDeVotos() {
  const captcha = useRef(null);
  const [votos, setVotos] = useState(0);
  const [boton, setBoton] = useState(true);
  const [uuid, setUuid] = useState("");
  const [publicIP, setPublicIP] = useState("");
  const [users, setUsers] = useState([]);
  const [aux, setAux] = useState(true);
  const getPublicIP = async () => {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      const ipAddress = data.ip;
      setPublicIP(ipAddress);
    } catch (error) {
      console.error("Error al obtener la dirección IP:", error);
    }
  };
  const total = 20;

  useEffect(() => {
    getPublicIP();
    const anonymousToken = Cookies.get("anonymousToken");
    console.log(anonymousToken);
    if (anonymousToken) {
      setAux(false);
    } else {
      setAux(true);
      const newAnonymousToken = uuidv4();
      setUuid(newAnonymousToken);
    }
  }, [publicIP]);

  const data = {
    labels: ["Votos", "Restantes"],
    datasets: [
      {
        labels: ["Votos", "Restantes"],
        data: [votos, total - votos],
        backgroundColor: ["#a72cf8", "#666"],
        borderColor: ["#ffffff", "#ffffff"],
      },
    ],
  };
  const options = {
    animation: {
      animateRotate: true, // Habilitar animación de rotación
      animateScale: true, // Habilitar animación de escala
    },
  };
  const onChange = () => {
    if (captcha.current.getValue()) {
      setBoton(false);
    } else {
      setBoton(true);
    }
  };
  /*   const model = {ip: "holis", fingerprint: "holis"
} */
  const onClick = () => {
    if (aux) {
      setVotos(votos + 1);
      setUsers([...users, { ip: publicIP, uuid: uuid }]);
      Cookies.set("anonymousToken", uuid, { expires: 60 });
      console.log(publicIP, uuid);
    } else {
      alert("Ya has votado.");
    }
  };
  return (
    <>
      <div className="containerContador">
        <ReCAPTCHA
          ref={captcha}
          sitekey="6LffmNknAAAAAPyiU_hoFhNlsic_MPyXArj81gBM"
          onChange={onChange}
        />
        <button type="button" onClick={onClick} disabled={boton}>
          +Votar
        </button>

        <div className="graficoContador">
          <Doughnut data={data} options={options}></Doughnut>
        </div>
      </div>
    </>
  );
}

export default ContadorDeVotos;
