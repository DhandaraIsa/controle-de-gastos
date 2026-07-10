import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Pessoa } from '../types';

export function PessoasPage() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [erro, setErro] = useState('');

  const carregar = async () => {
    try {
      const dados = await api.getPessoas();
      setPessoas(dados);
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
      await api.createPessoa({ nome, idade: Number(idade) });
      setNome('');
      setIdade('');
      await carregar();
    } catch (error: any) {
      setErro(error.message || 'Erro ao cadastrar pessoa');
    }
  };

  const excluir = async (id: number) => {
    const confirmar = window.confirm('Deseja excluir esta pessoa? As transações também serão apagadas.');
    if (!confirmar) return;

    try {
      await api.deletePessoa(id);
      await carregar();
    } catch (error: any) {
      alert(error.message || 'Erro ao excluir pessoa');
    }
  };

  return (
    <div>
      <h2>Pessoas</h2>
      <form onSubmit={cadastrar} style={{ display: 'grid', gap: 12, marginBottom: 24, maxWidth: 400 }}>
        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
        <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="Idade" required />
        <button type="submit">Cadastrar</button>
      </form>

      {erro && <p style={{ color: 'crimson' }}>{erro}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Nome</th>
            <th style={thStyle}>Idade</th>
            <th style={thStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td style={tdStyle}>{pessoa.nome}</td>
              <td style={tdStyle}>{pessoa.idade}</td>
              <td style={tdStyle}>
                <button onClick={() => excluir(pessoa.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = { borderBottom: '1px solid #ccc', padding: 8, textAlign: 'left' as const };
const tdStyle = { borderBottom: '1px solid #eee', padding: 8 };
