export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: number;
  pessoaId: number;
  nomePessoa?: string;
}

export interface TotaisResponse {
  pessoas: Array<{
    pessoaId: number;
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  }>;
  totalGeral: {
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
  };
}
