import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import BalanceCard from '../components/dashboard/BalanceCard';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService, transactionService } from '../services/api';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener perfil de usuario
        const profileResponse = await userService.getProfile();
        setUserProfile(profileResponse.data);
        
        // Obtener transacciones
        const transactionsResponse = await transactionService.getTransactions();
        setTransactions(transactionsResponse.data);
      } catch (err) {
        console.error('Error al obtener datos del dashboard:', err);
        setError('No se pudieron cargar los datos. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
        <Button onClick={() => window.location.reload()}>
          Intentar de nuevo
        </Button>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Bienvenido, {userProfile?.name || currentUser?.name}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <BalanceCard 
            balance={userProfile?.balance || 0} 
            accountNumber={userProfile?.account_number || ''}
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Acciones Rápidas</h2>
          <div className="space-y-3">
            <Link to="/transfer" className="block">
              <Button className="w-full">
                Nueva Transferencia
              </Button>
            </Link>
            <Link to="/transactions" className="block">
              <Button variant="secondary" className="w-full">
                Ver Historial
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <RecentTransactions transactions={transactions} />
    </Layout>
  );
};

export default Dashboard;