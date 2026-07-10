import { useEffect, useState } from 'react';
import { totalService } from '../services/totalService';
import type { TotaisResponse } from '../types/Totais';

export function TotaisPage() {
  const [totais, setTotais] = useState<TotaisResponse | null>(null);

  useEffect(() => {
    totalService.listar().then(setTotais).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Totais</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr>
            <th style={thStyle}>Pessoa</th>
            <th style={thStyle}>Receitas</th>
            <th style={thStyle}>Despesas</th>
            <th style={thStyle}>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {totais?.pessoas.map((item) => (
            <tr key={item.pessoaId}>
              <td style={tdStyle}>{item.nome}</td>
              <td style={tdStyle}>R$ {item.totalReceitas.toFixed(2)}</td>
              <td style={tdStyle}>R$ {item.totalDespesas.toFixed(2)}</td>
              <td style={tdStyle}>R$ {item.saldo.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = { borderBottom: '1px solid #ccc', padding: 8, textAlign: 'left' as const };
const tdStyle = { borderBottom: '1px solid #eee', padding: 8 };
