import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import TransactionList from '../components/transactions/TransactionList';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { transactionService } from '../services/api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await transactionService.getTransactions();
        setTransactions(response.data);
      } catch (err) {
        console.error('Error al obtener transacciones:', err);
        setError('No se pudieron cargar las transacciones. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Historial de Transacciones</h1>
        
        <Link to="/transfer">
          <Button>
            Nueva Transferencia
          </Button>
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <TransactionList transactions={transactions} loading={loading} />
    </Layout>
  );
};

export default Transactions;