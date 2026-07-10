import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">💰</div>

            <div>
              <h1>Controle de Gastos</h1>
              <p>Gestão financeira residencial</p>
            </div>
          </div>

          <nav className="nav">
            <NavLink to="/" end>
              Início
            </NavLink>

            <NavLink to="/pessoas">
              Pessoas
            </NavLink>

            <NavLink to="/transacoes">
              Transações
            </NavLink>

            <NavLink to="/totais">
              Totais
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;