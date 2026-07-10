import request from './api';
import type { Transacao } from '../types/Transacao';

export const transacaoService = {
  listar: () => request<Transacao[]>('/transacoes'),
  criar: (payload: { descricao: string; valor: number; tipo: number; pessoaId: number }) => request<Transacao>('/transacoes', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
};
