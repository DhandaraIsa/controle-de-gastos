import { useEffect, useMemo, useState } from 'react';
import { pessoaService } from '../services/pessoaService';
import { transacaoService } from '../services/transacaoService';
import type { Pessoa } from '../types/Pessoa';
import type { Transacao } from '../types/Transacao';

export function TransacoesPage() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('1');
  const [pessoaId, setPessoaId] = useState('');
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [erro, setErro] = useState('');

  const pessoaSelecionada = useMemo(() => pessoas.find((p) => p.id === Number(pessoaId)), [pessoas, pessoaId]);

  const carregar = async () => {
    try {
      const [pessoasDados, transacoesDados] = await Promise.all([pessoaService.listar(), transacaoService.listar()]);
      setPessoas(pessoasDados);
      setTransacoes(transacoesDados);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const cadastrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      await transacaoService.criar({
        descricao,
        valor: Number(valor),
        tipo: Number(tipo),
        pessoaId: Number(pessoaId)
      });
      setDescricao('');
      setValor('');
      setTipo('1');
      setPessoaId('');
      await carregar();
    } catch (error: any) {
      setErro(error.message || 'Erro ao cadastrar transação');
    }
  };

  return (
    <div>
      <h2>Transações</h2>
      <form onSubmit={cadastrar} style={{ display: 'grid', gap: 12, marginBottom: 24, maxWidth: 420 }}>
        <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" required />
        <input type="number" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Valor" required />

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="1">Despesa</option>
          <option value="2">Receita</option>
        </select>

        <select value={pessoaId} onChange={(e) => setPessoaId(e.target.value)} required>
          <option value="">Selecione a pessoa</option>
          {pessoas.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        {pessoaSelecionada && pessoaSelecionada.idade < 18 && (
          <p style={{ color: '#8a6d3b' }}>Para pessoas menores de idade, somente receitas ficam disponíveis.</p>
        )}

        <button type="submit" disabled={Boolean(pessoaSelecionada && pessoaSelecionada.idade < 18 && tipo === '1')}>
          Cadastrar
        </button>
      </form>

      {erro && <p style={{ color: 'crimson' }}>{erro}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Descrição</th>
            <th style={thStyle}>Valor</th>
            <th style={thStyle}>Tipo</th>
            <th style={thStyle}>Pessoa</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((item) => (
            <tr key={item.id}>
              <td style={tdStyle}>{item.descricao}</td>
              <td style={tdStyle}>R$ {item.valor.toFixed(2)}</td>
              <td style={tdStyle}>{item.tipo === 1 ? 'Despesa' : 'Receita'}</td>
              <td style={tdStyle}>{item.nomePessoa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = { borderBottom: '1px solid #ccc', padding: 8, textAlign: 'left' as const };
const tdStyle = { borderBottom: '1px solid #eee', padding: 8 };
