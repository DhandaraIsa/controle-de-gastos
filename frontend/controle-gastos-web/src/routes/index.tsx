import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { HomePage } from '../pages/HomePage';
import { PessoasPage } from '../pages/PessoasPage';
import { TransacoesPage } from '../pages/TransacoesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage /></Layout>
  },
  {
    path: '/pessoas',
    element: <Layout><PessoasPage /></Layout>
  },
  {
    path: '/transacoes',
    element: <Layout><TransacoesPage /></Layout>
  }
]);
