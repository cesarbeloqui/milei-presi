import "./Navbar.css";

const Navbar = () => {
  function scrollToCountdown(id) {
    const countdownSection = document.getElementById(`${id}`);
    countdownSection.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className="navbar">
      <h1 className="header">Votación Milei Presidente</h1>
      <ul>
        <li>
          <a href="#inicio">Inicio</a>
        </li>
        <li>
          <a
            id="cuentaRegresiva"
            onClick={(event) => {
              scrollToCountdown(event.target.id);
            }}
          >
            Cuenta Regresiva
          </a>
        </li>
        <li>
          <a href="#votar">Votar</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
