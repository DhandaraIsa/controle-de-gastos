const API_URL = 'http://localhost:5000/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    },
    ...init
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Erro ao comunicar com a API');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  getPessoas: () => request<any[]>('/pessoas'),
  createPessoa: (payload: { nome: string; idade: number }) => request<any>('/pessoas', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  deletePessoa: (id: number) => request<void>(`/pessoas/${id}`, { method: 'DELETE' }),
  getTransacoes: () => request<any[]>('/transacoes'),
  createTransacao: (payload: { descricao: string; valor: number; tipo: number; pessoaId: number }) => request<any>('/transacoes', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  getTotais: () => request<any>('/totais')
};
