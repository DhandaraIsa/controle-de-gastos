import request from './api';
import type { Pessoa } from '../types/Pessoa';

export const pessoaService = {
  listar: () => request<Pessoa[]>('/pessoas'),
  criar: (payload: { nome: string; idade: number }) => request<Pessoa>('/pessoas', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  remover: (id: number) => request<void>(`/pessoas/${id}`, { method: 'DELETE' })
};
