import { useEffect, useState } from 'react';
import { totalService } from '../services/totalService';
import type { TotaisResponse } from '../types/Totais';

export function DashboardPage() {
  const [totais, setTotais] = useState<TotaisResponse | null>(null);

  useEffect(() => {
    totalService.listar().then(setTotais).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Painel</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div style={cardStyle}><strong>Receitas</strong><div>R$ {totais?.totalGeral.totalReceitas.toFixed(2) ?? '0.00'}</div></div>
        <div style={cardStyle}><strong>Despesas</strong><div>R$ {totais?.totalGeral.totalDespesas.toFixed(2) ?? '0.00'}</div></div>
        <div style={cardStyle}><strong>Saldo líquido</strong><div>R$ {totais?.totalGeral.saldoLiquido.toFixed(2) ?? '0.00'}</div></div>
      </div>
    </div>
  );
}

const cardStyle = { border: '1px solid #ddd', borderRadius: 8, padding: 16, background: '#fafafa' };
