import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
      <Link to="/">Dashboard</Link>
      <Link to="/pessoas">Pessoas</Link>
      <Link to="/transacoes">Transações</Link>
      <Link to="/totais">Totais</Link>
    </nav>
  );
}
