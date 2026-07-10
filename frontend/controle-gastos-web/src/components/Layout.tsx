import { Link } from 'react-router-dom';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
      <header style={{ marginBottom: 24 }}>
        <h1>Controle de Gastos</h1>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/">Início</Link>
          <Link to="/pessoas">Pessoas</Link>
          <Link to="/transacoes">Transações</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
