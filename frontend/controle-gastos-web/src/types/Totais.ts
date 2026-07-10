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
