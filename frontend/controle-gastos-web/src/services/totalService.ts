import request from './api';
import type { TotaisResponse } from '../types/Totais';

export const totalService = {
  listar: () => request<TotaisResponse>('/totais')
};
