import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { DashboardPage } from '../pages/DashboardPage';
import { PessoasPage } from '../pages/PessoasPage';
import { TransacoesPage } from '../pages/TransacoesPage';
import { TotaisPage } from '../pages/TotaisPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><DashboardPage /></Layout>
  },
  {
    path: '/pessoas',
    element: <Layout><PessoasPage /></Layout>
  },
  {
    path: '/transacoes',
    element: <Layout><TransacoesPage /></Layout>
  },
  {
    path: '/totais',
    element: <Layout><TotaisPage /></Layout>
  }
]);
